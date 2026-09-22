import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Minus, Plus } from "lucide-react";

interface BookCoverProps {
  onOpen: () => void;
  opening?: boolean;
  closing?: boolean;
}

const reveal = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const sequence = {
  hidden: {},
  visible: { transition: { delayChildren: 0.22, staggerChildren: 0.13 } },
};

export function BookCover({ onOpen, opening = false, closing = false }: BookCoverProps) {
  return (
    <motion.section
      className="cover-shell relative mx-auto flex min-h-[min(760px,calc(100vh-56px))] w-full max-w-[1100px] items-center justify-center overflow-hidden rounded-[3px] px-6 py-12 shadow-book"
      initial={closing ? false : { opacity: 0, scale: 0.96, y: 18 }}
      animate={closing ? { opacity: 1, scale: 1, y: 0, rotateY: 0 } : { opacity: opening ? 0 : 1, scale: opening ? 0.98 : 1, y: 0, rotateY: opening ? -88 : 0 }}
      transition={{ duration: closing ? 0 : opening ? 0.52 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: "left center", perspective: 1200 }}
    >
      <div className="absolute inset-5 border border-olive-light/45" />
      <div className="absolute inset-8 border border-olive-light/20" />
      <div className="cover-corner cover-corner-tl" />
      <div className="cover-corner cover-corner-br" />
      <motion.div className="relative z-10 mx-auto w-full max-w-[760px] px-6 text-center text-cream" variants={sequence} initial={closing ? false : "hidden"} animate={closing ? "visible" : opening ? "hidden" : "visible"}>
        <motion.p variants={reveal} className="eyebrow tracking-[0.34em] text-cream/65">FIELD NOTES / VOL. 01</motion.p>
        <motion.div variants={reveal} className="mx-auto mt-10 flex w-fit items-center gap-3 text-cream/50">
          <Minus size={12} strokeWidth={1} />
          <span className="font-mono text-[10px] tracking-[0.4em]">ENGINEERING JOURNAL</span>
          <Plus size={12} strokeWidth={1} />
        </motion.div>
        <h1 className="mt-8 text-center font-display leading-[0.82] tracking-[-0.05em]">
          <motion.span variants={reveal} className="block text-[clamp(3.4rem,9vw,8rem)]">THE</motion.span>
          <motion.span variants={reveal} className="block whitespace-nowrap text-[clamp(2.45rem,7.4vw,6.6rem)]">ENGINEERING</motion.span>
          <motion.span variants={reveal} className="block text-[clamp(3.4rem,9vw,8rem)]">JOURNAL</motion.span>
        </h1>
        <motion.div variants={reveal} className="mx-auto my-12 h-px w-24 bg-olive-light/70" />
        <motion.p variants={reveal} className="font-mono text-xs uppercase tracking-[0.32em] text-cream/70">Arpit Singh</motion.p>
        <motion.p variants={reveal} className="mt-3 font-display text-2xl italic text-cream/90">Python · AI · Full Stack</motion.p>
        <motion.p variants={reveal} className="mt-8 font-mono text-[10px] tracking-[0.38em] text-cream/45">KOLKATA / 2026</motion.p>
        <motion.button variants={reveal} className="journal-button journal-button-light mx-auto mt-12" onClick={onOpen} type="button" disabled={opening}>
          <BookOpen size={15} />
          Open journal
          <ArrowUpRight size={15} />
        </motion.button>
      </motion.div>
      <div className="absolute bottom-8 left-10 font-mono text-[9px] tracking-[0.2em] text-cream/35">AS / 001</div>
      <div className="absolute bottom-8 right-10 font-mono text-[9px] tracking-[0.2em] text-cream/35">PRIVATE NOTES</div>
    </motion.section>
  );
}
