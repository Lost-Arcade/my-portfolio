import { useCallback, useEffect, useState } from "react";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Feather } from "lucide-react";
import { chapters } from "@/data/portfolio";
import { BookCover } from "@/components/book/BookCover";
import { BookNavigation } from "@/components/book/BookNavigation";
import { Achievements, Contact, Education, Engineer, Experience, Introduction, Projects, TechnicalLibrary } from "@/components/sections/ChapterContent";

const chapterContent = [Introduction, Engineer, Experience, Projects, TechnicalLibrary, Education, Achievements, Contact];
const TURN_DURATION = 780;

type TurnState = {
  from: number;
  to: number;
  direction: 1 | -1;
};

export function Book() {
  const prefersReducedMotion = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [turn, setTurn] = useState<TurnState | null>(null);

  const navigate = useCallback((page: number) => {
    if (page === currentPage || turn) return;
    const direction: 1 | -1 = page > currentPage ? 1 : -1;
    const duration = prefersReducedMotion ? 180 : TURN_DURATION;
    setNavigationOpen(false);
    setTurn({ from: currentPage, to: page, direction });
    window.setTimeout(() => {
      setCurrentPage(page);
      setTurn(null);
    }, duration);
  }, [currentPage, prefersReducedMotion, turn]);

  const next = useCallback(() => {
    if (currentPage < chapters.length - 1) navigate(currentPage + 1);
  }, [currentPage, navigate]);

  const previous = useCallback(() => {
    if (currentPage > 0) navigate(currentPage - 1);
  }, [currentPage, navigate]);

  const openJournal = () => {
    setOpening(true);
    window.setTimeout(() => {
      setOpened(true);
      setOpening(false);
    }, prefersReducedMotion ? 80 : 520);
  };

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (!opened) return;
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "Escape") setNavigationOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, opened, previous]);

  if (!opened) return <MotionConfig reducedMotion="user"><BookCover opening={opening} onOpen={openJournal} /></MotionConfig>;

  return <MotionConfig reducedMotion="user">
    <motion.main id="journal" className="relative mx-auto w-full max-w-[1180px] pb-10">
      <header className="mb-6 flex items-center justify-between px-2 sm:px-4">
        <button type="button" onClick={() => { setOpened(false); setCurrentPage(0); setTurn(null); }} className="book-header-link"><ArrowLeft size={14} /> Cover</button>
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-cream/75"><Feather size={13} className="text-olive" /> Arpit's Fieldnotes</div>
        <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-cream/65 sm:block">Use ← → to turn</span>
      </header>
      <PhysicalBook currentPage={currentPage} turn={turn} prefersReducedMotion={Boolean(prefersReducedMotion)} />
      <BookNavigation chapters={chapters} currentPage={currentPage} isOpen={navigationOpen} onToggle={() => setNavigationOpen((value) => !value)} onNavigate={navigate} onPrevious={previous} onNext={next} />
    </motion.main>
  </MotionConfig>;
}

function PhysicalBook({ currentPage, turn, prefersReducedMotion }: { currentPage: number; turn: TurnState | null; prefersReducedMotion: boolean }) {
  return <div className="book-object" aria-live="polite">
    <div className="book-page-stack book-page-stack-left" />
    <div className="book-page-stack book-page-stack-right" />
    <div className="book-underlay book-layer">
      <ChapterSpread index={turn?.to ?? currentPage} hidden={!turn} />
    </div>
    {turn ? <>
      <div className={`book-half-window book-current-half ${turn.direction === 1 ? "book-current-half-left" : "book-current-half-right"}`}>
        <ChapterSpread index={turn.from} side={turn.direction === 1 ? "left" : "right"} />
      </div>
      <motion.div
        className={`book-half-window turning-page ${turn.direction === 1 ? "turning-page-forward" : "turning-page-backward"}`}
        initial={{ rotateY: 0, boxShadow: turn.direction === 1 ? "-10px 0 18px rgba(48, 38, 30, 0.12)" : "10px 0 18px rgba(48, 38, 30, 0.12)" }}
        animate={{
          rotateY: turn.direction === 1 ? -180 : 180,
          boxShadow: turn.direction === 1
            ? ["-10px 0 18px rgba(48, 38, 30, 0.12)", "-30px 2px 35px rgba(48, 38, 30, 0.34)", "8px 0 16px rgba(48, 38, 30, 0.14)"]
            : ["10px 0 18px rgba(48, 38, 30, 0.12)", "30px 2px 35px rgba(48, 38, 30, 0.34)", "-8px 0 16px rgba(48, 38, 30, 0.14)"],
        }}
        transition={{ duration: prefersReducedMotion ? 0.18 : TURN_DURATION / 1000, ease: [0.22, 1, 0.36, 1], boxShadow: { duration: prefersReducedMotion ? 0.18 : TURN_DURATION / 1000 } }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="turning-page-face turning-page-front"><ChapterSpread index={turn.from} side={turn.direction === 1 ? "right" : "left"} /></div>
        <div className="turning-page-face turning-page-back"><ChapterSpread index={turn.to} side={turn.direction === 1 ? "right" : "left"} hidden /></div>
      </motion.div>
    </> : <motion.div key={currentPage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: prefersReducedMotion ? 0.12 : 0.34, delay: prefersReducedMotion ? 0 : 0.12 }} className="book-layer book-active-spread ink-reveal-spread"><ChapterSpread index={currentPage} /></motion.div>}
    <div className="book-spine" aria-hidden="true"><span /></div>
  </div>;
}

function ChapterSpread({ index, side, hidden = false }: { index: number; side?: "left" | "right"; hidden?: boolean }) {
  const Chapter = chapterContent[index];
  return <div className={`book-chapter-surface ${side ? `book-chapter-${side}` : ""} ${hidden ? "book-content-hidden" : ""}`}><Chapter /></div>;
}
