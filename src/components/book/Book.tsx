import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowLeft, Feather } from "lucide-react";
import { chapters } from "@/data/portfolio";
import { BookCover } from "@/components/book/BookCover";
import { BookNavigation } from "@/components/book/BookNavigation";
import { Achievements, Contact, Education, Engineer, Experience, Introduction, Projects, TechnicalLibrary } from "@/components/sections/ChapterContent";

const chapterContent = [Introduction, Engineer, Experience, Projects, TechnicalLibrary, Education, Achievements, Contact];

export function Book() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [navigationOpen, setNavigationOpen] = useState(false);

  const navigate = useCallback((page: number) => {
    if (page === currentPage) return;
    setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
    setNavigationOpen(false);
  }, [currentPage]);

  const next = useCallback(() => { if (currentPage < chapters.length - 1) navigate(currentPage + 1); }, [currentPage, navigate]);
  const previous = useCallback(() => { if (currentPage > 0) navigate(currentPage - 1); }, [currentPage, navigate]);

  const openJournal = () => {
    setOpening(true);
    window.setTimeout(() => {
      setOpened(true);
      setOpening(false);
    }, 520);
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

  const Chapter = chapterContent[currentPage];
  return <MotionConfig reducedMotion="user">
    <motion.main id="journal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative mx-auto w-full max-w-[1180px] pb-10" style={{ perspective: 1800 }}>
      <header className="mb-6 flex items-center justify-between px-2 sm:px-4">
        <button type="button" onClick={() => { setOpened(false); setCurrentPage(0); }} className="book-header-link"><ArrowLeft size={14} /> Cover</button>
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-espresso/45"><Feather size={13} className="text-olive" /> Arpit's Fieldnotes</div>
        <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-espresso/40 sm:block">Use ← → to turn</span>
      </header>
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={currentPage}
          custom={direction}
          variants={{
            initial: (value: number) => ({ opacity: 0, rotateY: value > 0 ? 12 : -12, x: value > 0 ? 28 : -28 }),
            animate: { opacity: 1, rotateY: 0, x: 0 },
            exit: (value: number) => ({ opacity: 0, rotateY: value > 0 ? -12 : 12, x: value > 0 ? -28 : 28 }),
          }}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          className="book-spread"
        >
          <Chapter />
        </motion.div>
      </AnimatePresence>
      <BookNavigation chapters={chapters} currentPage={currentPage} isOpen={navigationOpen} onToggle={() => setNavigationOpen((value) => !value)} onNavigate={navigate} onPrevious={previous} onNext={next} />
    </motion.main>
  </MotionConfig>;
}
