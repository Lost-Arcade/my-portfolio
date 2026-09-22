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
  const [closing, setClosing] = useState(false);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [displayedSpread, setDisplayedSpread] = useState(0);
  const [writeOnReveal, setWriteOnReveal] = useState(true);
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [turningPage, setTurningPage] = useState<TurnState | null>(null);

  const navigate = useCallback((page: number) => {
    if (page === currentSpread || turningPage || closing) return;
    const direction: 1 | -1 = page > currentSpread ? 1 : -1;
    const duration = prefersReducedMotion ? 180 : TURN_DURATION;
    setNavigationOpen(false);
    setWriteOnReveal(direction === 1);
    setTurningPage({ from: displayedSpread, to: page, direction });
    window.setTimeout(() => {
      setCurrentSpread(page);
      setDisplayedSpread(page);
      setTurningPage(null);
    }, duration);
  }, [closing, currentSpread, displayedSpread, prefersReducedMotion, turningPage]);

  const next = useCallback(() => {
    if (currentSpread < chapters.length - 1) navigate(currentSpread + 1);
  }, [currentSpread, navigate]);

  const previous = useCallback(() => {
    if (currentSpread > 0) navigate(currentSpread - 1);
  }, [currentSpread, navigate]);

  const openJournal = () => {
    setOpening(true);
    window.setTimeout(() => {
      setOpened(true);
      setOpening(false);
    }, prefersReducedMotion ? 80 : 520);
  };

  const closeJournal = useCallback(() => {
    if (turningPage || closing) return;
    setClosing(true);
    window.setTimeout(() => {
      setOpened(false);
      setClosing(false);
      setCurrentSpread(0);
      setDisplayedSpread(0);
      setWriteOnReveal(true);
    }, prefersReducedMotion ? 100 : 760);
  }, [closing, prefersReducedMotion, turningPage]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (!opened || closing) return;
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "Escape") setNavigationOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closing, next, opened, previous]);

  if (!opened) return <MotionConfig reducedMotion="user"><BookCover opening={opening} onOpen={openJournal} /></MotionConfig>;

  return <MotionConfig reducedMotion="user">
    <motion.main id="journal" className="relative mx-auto w-full max-w-[1180px] pb-10">
      <header className="mb-6 flex items-center justify-between px-2 sm:px-4">
        <button type="button" onClick={closeJournal} disabled={Boolean(turningPage || closing)} className="book-header-link"><ArrowLeft size={14} /> Close journal</button>
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-cream/75"><Feather size={13} className="text-olive" /> Arpit's Fieldnotes</div>
        <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-cream/65 sm:block">Use ← → to turn</span>
      </header>
      <PhysicalBook currentSpread={currentSpread} displayedSpread={displayedSpread} turningPage={turningPage} closing={closing} writeOnReveal={writeOnReveal} prefersReducedMotion={Boolean(prefersReducedMotion)} />
      <BookNavigation chapters={chapters} currentPage={currentSpread} isOpen={navigationOpen} onToggle={() => setNavigationOpen((value) => !value)} onNavigate={navigate} onPrevious={previous} onNext={next} />
    </motion.main>
  </MotionConfig>;
}

function PhysicalBook({ currentSpread, displayedSpread, turningPage, closing, writeOnReveal, prefersReducedMotion }: { currentSpread: number; displayedSpread: number; turningPage: TurnState | null; closing: boolean; writeOnReveal: boolean; prefersReducedMotion: boolean }) {
  const forwardRemaining = chapters.length - currentSpread - 1;
  const backwardRemaining = currentSpread;

  return <div className="book-object" aria-live="polite">
    <PageStack side="left" remaining={backwardRemaining} />
    <PageStack side="right" remaining={forwardRemaining} />
    <div className="book-underlay book-layer">
      <ChapterSpread index={turningPage?.to ?? displayedSpread} hidden={!turningPage} />
    </div>
    {turningPage ? <>
      <div className={`book-half-window book-current-half ${turningPage.direction === 1 ? "book-current-half-left" : "book-current-half-right"}`}>
        <ChapterSpread index={turningPage.from} side={turningPage.direction === 1 ? "left" : "right"} />
      </div>
      <motion.div
        className={`book-half-window turning-page ${turningPage.direction === 1 ? "turning-page-forward" : "turning-page-backward"}`}
        initial={{ rotateY: 0, boxShadow: turningPage.direction === 1 ? "-10px 0 18px rgba(23, 20, 17, 0.12)" : "10px 0 18px rgba(23, 20, 17, 0.12)" }}
        animate={{
          rotateY: turningPage.direction === 1 ? -180 : 180,
          boxShadow: turningPage.direction === 1
            ? ["-10px 0 18px rgba(23, 20, 17, 0.12)", "-30px 2px 35px rgba(23, 20, 17, 0.34)", "8px 0 16px rgba(23, 20, 17, 0.14)"]
            : ["10px 0 18px rgba(23, 20, 17, 0.12)", "30px 2px 35px rgba(23, 20, 17, 0.34)", "-8px 0 16px rgba(23, 20, 17, 0.14)"],
        }}
        transition={{ duration: prefersReducedMotion ? 0.18 : TURN_DURATION / 1000, ease: [0.22, 1, 0.36, 1], boxShadow: { duration: prefersReducedMotion ? 0.18 : TURN_DURATION / 1000 } }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="turning-page-face turning-page-front"><ChapterSpread index={turningPage.from} side={turningPage.direction === 1 ? "right" : "left"} /></div>
        <div className="turning-page-face turning-page-back"><ChapterSpread index={turningPage.to} side={turningPage.direction === 1 ? "right" : "left"} hidden /></div>
      </motion.div>
    </> : <div className={`book-layer book-active-spread ${writeOnReveal ? "journal-writing" : ""}`}><ChapterSpread index={displayedSpread} /></div>}
    <div className="book-spine" aria-hidden="true"><span /></div>
    {closing && <motion.div className="closing-cover" initial={{ rotateY: 88 }} animate={{ rotateY: 0 }} transition={{ duration: prefersReducedMotion ? 0.1 : 0.72, ease: [0.22, 1, 0.36, 1] }}><BookCover closing onOpen={() => undefined} /></motion.div>}
  </div>;
}

function PageStack({ side, remaining }: { side: "left" | "right"; remaining: number }) {
  const layers = Math.min(4, Math.ceil(Math.max(0, remaining) / 2));
  if (layers === 0) return null;
  return <div className={`book-page-stack book-page-stack-${side}`} data-layers={layers} data-remaining={remaining} aria-hidden="true">
    {Array.from({ length: layers }, (_, index) => <span className="book-page-stack-layer" key={`${side}-${index}`} />)}
  </div>;
}

function ChapterSpread({ index, side, hidden = false }: { index: number; side?: "left" | "right"; hidden?: boolean }) {
  const Chapter = chapterContent[index];
  return <div className={`book-chapter-surface ${side ? `book-chapter-${side}` : ""} ${hidden ? "book-content-hidden" : ""}`}><Chapter /></div>;
}
