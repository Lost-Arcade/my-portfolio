import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Minus, Plus } from "lucide-react";

interface BookCoverProps {
  onOpen: () => void;
  opening?: boolean;
}

export function BookCover({ onOpen, opening = false }: BookCoverProps) {
  return (
    <motion.section
      className="cover-shell relative mx-auto flex min-h-[min(760px,calc(100vh-56px))] w-full max-w-[1100px] items-center justify-center overflow-hidden rounded-[3px] px-6 py-12 shadow-book"
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: opening ? 0 : 1, scale: opening ? 0.98 : 1, y: opening ? 0 : 0, rotateY: opening ? -88 : 0 }}
      transition={{ duration: opening ? 0.52 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: "left center", perspective: 1200 }}
    >
      <div className="absolute inset-5 border border-cream/20" />
      <div className="absolute inset-8 border border-cream/10" />
      <div className="cover-corner cover-corner-tl" />
      <div className="cover-corner cover-corner-br" />
      <div className="relative z-10 mx-auto w-full max-w-2xl text-center text-cream">
        <p className="eyebrow tracking-[0.34em] text-cream/65">FIELD NOTES / VOL. 01</p>
        <div className="mx-auto mt-10 flex w-fit items-center gap-3 text-cream/50">
          <Minus size={12} strokeWidth={1} />
          <span className="font-mono text-[10px] tracking-[0.4em]">ENGINEERING JOURNAL</span>
          <Plus size={12} strokeWidth={1} />
        </div>
        <h1 className="mt-8 font-display text-[clamp(4.5rem,12vw,9.5rem)] leading-[0.76] tracking-[-0.07em]">
          THE
          <br />
          ENGINEERING
          <br />
          JOURNAL
        </h1>
        <div className="mx-auto my-12 h-px w-24 bg-olive-light/70" />
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-cream/70">Arpit Singh</p>
        <p className="mt-3 font-display text-2xl italic text-cream/90">Python · AI · Full Stack</p>
        <p className="mt-8 font-mono text-[10px] tracking-[0.38em] text-cream/45">KOLKATA / 2026</p>
        <button className="journal-button journal-button-light mx-auto mt-12" onClick={onOpen} type="button" disabled={opening}>
          <BookOpen size={15} />
          Open journal
          <ArrowUpRight size={15} />
        </button>
      </div>
      <div className="absolute bottom-8 left-10 font-mono text-[9px] tracking-[0.2em] text-cream/35">AS / 001</div>
      <div className="absolute bottom-8 right-10 font-mono text-[9px] tracking-[0.2em] text-cream/35">PRIVATE NOTES</div>
    </motion.section>
  );
}
