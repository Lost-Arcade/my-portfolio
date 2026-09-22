import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, ChevronLeft, ChevronRight, List, X } from "lucide-react";
import type { Chapter } from "@/types/portfolio";

interface BookNavigationProps {
  chapters: Chapter[];
  currentPage: number;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
}

export function BookNavigation({ chapters, currentPage, isOpen, onToggle, onNavigate, onPrevious, onNext, previousDisabled, nextDisabled }: BookNavigationProps) {
  return (
    <>
      <aside className="fixed right-0 top-1/2 z-40 -translate-y-1/2">
        <button
          type="button"
          onClick={onToggle}
          aria-label={isOpen ? "Close chapter navigation" : "Open chapter navigation"}
          aria-expanded={isOpen}
          className="bookmark-tab flex h-32 w-10 flex-col items-center justify-center gap-3 border border-r-0 border-espresso/20 bg-olive text-cream shadow-paper transition hover:w-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive-light"
        >
          {isOpen ? <X size={16} /> : <Bookmark size={16} />}
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] [writing-mode:vertical-rl]">Chapters</span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-11 top-1/2 w-[230px] -translate-y-1/2 border border-espresso/20 bg-paper/95 p-4 shadow-book backdrop-blur-sm"
              aria-label="Journal chapters"
            >
              <div className="mb-3 flex items-center gap-2 border-b border-espresso/15 pb-3">
                <List size={14} className="text-olive" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-espresso/60">Contents</span>
              </div>
              <div className="space-y-1">
                {chapters.map((chapter, index) => (
                  <button
                    type="button"
                    key={chapter.number}
                    onClick={() => onNavigate(index)}
                    className={`flex w-full items-center gap-3 px-2 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive ${currentPage === index ? "bg-olive/10 text-olive" : "text-espresso/65 hover:bg-espresso/5 hover:text-espresso"}`}
                  >
                    <span className="font-mono text-[10px]">{chapter.number}</span>
                    <span className="font-display text-lg leading-none">{chapter.label}</span>
                    {currentPage === index && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-olive" />}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </aside>
      <div className="mt-8 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/70">
        <button type="button" onClick={onPrevious} disabled={previousDisabled ?? currentPage === 0} className="page-control" aria-label="Previous chapter">
          <ChevronLeft size={14} /> Previous
        </button>
        <span className="whitespace-nowrap">{String(currentPage + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}</span>
        <button type="button" onClick={onNext} disabled={nextDisabled ?? currentPage === chapters.length - 1} className="page-control" aria-label="Next chapter">
          Next <ChevronRight size={14} />
        </button>
      </div>
    </>
  );
}
