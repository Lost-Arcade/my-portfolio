import { useCallback, useEffect, useState } from "react";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Feather, RotateCcw } from "lucide-react";
import { chapters } from "@/data/portfolio";
import { BookCover } from "@/components/book/BookCover";
import { BookNavigation } from "@/components/book/BookNavigation";
import { Achievements, Contact, Education, Engineer, Experience, Introduction, Projects, TechnicalLibrary } from "@/components/sections/ChapterContent";

const chapterContent = [Introduction, Engineer, Experience, Projects, TechnicalLibrary, Education, Achievements, Contact];
const TURN_DURATION = 780;
const BLANK_DURATION = 850;
const WRITE_DURATION = 1100;
const CLOSE_DURATION = 760;

type BookMode = "cover" | "reading" | "closing";
type PagePhase = "idle" | "turning" | "blank" | "writing" | "complete";

type TurnState = {
  from: number;
  to: number;
  direction: 1 | -1;
};

export function Book() {
  const prefersReducedMotion = useReducedMotion();
  const [mode, setMode] = useState<BookMode>("cover");
  const [opening, setOpening] = useState(false);
  const [closingCover, setClosingCover] = useState(false);
  const [closingTurn, setClosingTurn] = useState(false);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [displayedSpread, setDisplayedSpread] = useState(0);
  const [pagePhase, setPagePhase] = useState<PagePhase>("idle");
  const [writeOnReveal, setWriteOnReveal] = useState(true);
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [turningPage, setTurningPage] = useState<TurnState | null>(null);

  const resetBook = useCallback(() => {
    setMode("cover");
    setOpening(false);
    setClosingCover(false);
    setClosingTurn(false);
    setCurrentSpread(0);
    setDisplayedSpread(0);
    setPagePhase("idle");
    setWriteOnReveal(true);
    setNavigationOpen(false);
    setTurningPage(null);
  }, []);

  const returnToCover = useCallback(() => {
    if (closingCover || turningPage || pagePhase === "turning") return;
    setClosingCover(true);
    window.setTimeout(resetBook, prefersReducedMotion ? 100 : CLOSE_DURATION);
  }, [closingCover, pagePhase, prefersReducedMotion, resetBook, turningPage]);

  const beginWriting = useCallback((shouldWrite: boolean) => {
    const blankDuration = prefersReducedMotion ? 60 : BLANK_DURATION;
    window.setTimeout(() => {
      if (!shouldWrite) {
        setPagePhase("complete");
        return;
      }
      setPagePhase("writing");
      window.setTimeout(() => setPagePhase("complete"), prefersReducedMotion ? 80 : WRITE_DURATION);
    }, blankDuration);
  }, [prefersReducedMotion]);

  const finishTurn = useCallback(() => {
    if (!turningPage) return;
    const { to, direction } = turningPage;
    setCurrentSpread(to);
    setDisplayedSpread(to);
    setTurningPage(null);
    setPagePhase("blank");
    beginWriting(direction === 1);
  }, [beginWriting, turningPage]);

  const navigate = useCallback((page: number) => {
    const locked = pagePhase === "turning" || pagePhase === "blank" || pagePhase === "writing";
    if (mode !== "reading" || page === currentSpread || turningPage || closingCover || locked) return;
    const direction: 1 | -1 = page > currentSpread ? 1 : -1;
    setNavigationOpen(false);
    setWriteOnReveal(direction === 1);
    setPagePhase("turning");
    setTurningPage({ from: displayedSpread, to: page, direction });
  }, [closingCover, currentSpread, displayedSpread, mode, pagePhase, turningPage]);

  const next = useCallback(() => {
    if (currentSpread < chapters.length - 1) navigate(currentSpread + 1);
  }, [currentSpread, navigate]);

  const previous = useCallback(() => {
    if (currentSpread > 0) navigate(currentSpread - 1);
  }, [currentSpread, navigate]);

  const openJournal = () => {
    setOpening(true);
    window.setTimeout(() => {
      setMode("reading");
      setOpening(false);
      setPagePhase("writing");
      window.setTimeout(() => setPagePhase("complete"), prefersReducedMotion ? 80 : WRITE_DURATION);
    }, prefersReducedMotion ? 80 : 520);
  };

  const finishClosingTurn = useCallback(() => {
    if (!closingTurn || !turningPage) return;
    setTurningPage(null);
    setClosingTurn(false);
    setMode("closing");
    setPagePhase("complete");
  }, [closingTurn, turningPage]);

  const openClosingPage = useCallback(() => {
    const locked = pagePhase === "turning" || pagePhase === "blank" || pagePhase === "writing";
    if (mode !== "reading" || currentSpread !== chapters.length - 1 || locked || turningPage) return;
    setNavigationOpen(false);
    setClosingTurn(true);
    setPagePhase("turning");
    setTurningPage({ from: displayedSpread, to: displayedSpread, direction: 1 });
  }, [currentSpread, displayedSpread, mode, pagePhase, turningPage]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (mode !== "reading" || closingCover) return;
      if (event.key === "ArrowRight") currentSpread === chapters.length - 1 ? openClosingPage() : next();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "Escape") setNavigationOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closingCover, currentSpread, mode, next, openClosingPage, previous]);

  if (mode === "cover") return <MotionConfig reducedMotion="user"><BookCover opening={opening} onOpen={openJournal} /></MotionConfig>;

  if (mode === "closing") return <MotionConfig reducedMotion="user"><ClosingBook onRestart={returnToCover} closing={closingCover} prefersReducedMotion={Boolean(prefersReducedMotion)} /></MotionConfig>;

  return <MotionConfig reducedMotion="user">
    <motion.main id="journal" className="relative mx-auto w-full max-w-[1180px] pb-10">
      <header className="mb-6 flex items-center justify-between px-2 sm:px-4">
        <button type="button" onClick={returnToCover} disabled={Boolean(turningPage || closingCover)} className="book-header-link"><ArrowLeft size={14} /> Close journal</button>
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-cream/75"><Feather size={13} className="text-olive" /> Arpit's Fieldnotes</div>
        <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-cream/65 sm:block">Use ← → to turn</span>
      </header>
      <PhysicalBook currentSpread={currentSpread} displayedSpread={displayedSpread} turningPage={turningPage} closingTurn={closingTurn} pagePhase={pagePhase} writeOnReveal={writeOnReveal} onTurnComplete={closingTurn ? finishClosingTurn : finishTurn} prefersReducedMotion={Boolean(prefersReducedMotion)} />
      <BookNavigation chapters={chapters} currentPage={currentSpread} isOpen={navigationOpen} onToggle={() => setNavigationOpen((value) => !value)} onNavigate={navigate} onPrevious={previous} onNext={currentSpread === chapters.length - 1 ? openClosingPage : next} nextDisabled={false} />
    </motion.main>
  </MotionConfig>;
}

function PhysicalBook({ currentSpread, displayedSpread, turningPage, closingTurn, pagePhase, writeOnReveal, onTurnComplete, prefersReducedMotion }: { currentSpread: number; displayedSpread: number; turningPage: TurnState | null; closingTurn: boolean; pagePhase: PagePhase; writeOnReveal: boolean; onTurnComplete: () => void; prefersReducedMotion: boolean }) {
  const forwardRemaining = chapters.length - currentSpread - 1;
  const backwardRemaining = currentSpread + 1;
  const destinationHidden = pagePhase === "blank";

  return <div className="book-object" aria-live="polite">
    <PageStack side="left" remaining={backwardRemaining} />
    <PageStack side="right" remaining={forwardRemaining} />
    <div className="book-underlay book-layer">
      {closingTurn ? <ClosingPage hidden /> : <ChapterSpread index={turningPage?.to ?? displayedSpread} hidden={destinationHidden} />}
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
        onAnimationComplete={onTurnComplete}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="turning-page-face turning-page-front"><ChapterSpread index={turningPage.from} side={turningPage.direction === 1 ? "right" : "left"} /></div>
        <div className="turning-page-face turning-page-back">{closingTurn ? <ClosingPage hidden /> : <ChapterSpread index={turningPage.to} side={turningPage.direction === 1 ? "right" : "left"} hidden />}</div>
      </motion.div>
    </> : <div className={`book-layer book-active-spread ${pagePhase === "blank" ? "book-content-hidden" : ""} ${pagePhase === "writing" && writeOnReveal ? "journal-writing" : ""}`}><ChapterSpread index={displayedSpread} /></div>}
    <div className="book-spine" aria-hidden="true"><span /></div>
  </div>;
}

function ClosingBook({ onRestart, closing, prefersReducedMotion }: { onRestart: () => void; closing: boolean; prefersReducedMotion: boolean }) {
  return <div className="book-object closing-book" aria-live="polite">
    <PageStack side="left" remaining={chapters.length} />
    <div className="book-layer book-active-spread journal-writing"><ClosingPage onRestart={onRestart} /></div>
    <div className="book-spine" aria-hidden="true"><span /></div>
    {closing && <motion.div className="closing-cover" initial={{ rotateY: 88 }} animate={{ rotateY: 0 }} transition={{ duration: prefersReducedMotion ? 0.1 : 0.72, ease: [0.22, 1, 0.36, 1] }}><BookCover closing onOpen={() => undefined} /></motion.div>}
  </div>;
}

function ClosingPage({ onRestart = () => undefined, hidden = false }: { onRestart?: () => void; hidden?: boolean }) {
  return <div className={`journal-grid closing-journal-grid ${hidden ? "book-content-hidden" : ""}`}>
    <div className="journal-page page-left">
      <p className="eyebrow"><span className="text-olive">09</span> / Closing</p>
      <div className="closing-mark mt-16">∴</div>
      <h2 className="mt-8 font-display text-7xl leading-[0.8] tracking-[-0.07em]">The<br /><em>end.</em></h2>
      <p className="margin-note mt-12 max-w-[190px] rotate-[-3deg]">Every good notebook leaves a few pages for what comes next.</p>
    </div>
    <div className="journal-page page-right flex flex-col justify-between">
      <div><p className="eyebrow">Of this edition</p><h3 className="mt-10 max-w-sm font-display text-5xl leading-[0.9]">Thanks for<br /><em>reading.</em></h3><p className="mt-8 max-w-sm text-base leading-relaxed">Arpit Singh<br /><span className="font-mono text-xs uppercase tracking-[0.14em] text-olive">Python · AI · Full Stack</span></p></div>
      <div className="mt-10 border-t border-espresso/15 pt-5"><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-espresso/65">The journal is closed for now.</p><button type="button" onClick={onRestart} className="journal-button mt-5"><RotateCcw size={14} /> Restart journal <ArrowUpRight size={14} /></button></div>
    </div>
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
