import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, GitBranch, X } from "lucide-react";
import type { Project } from "@/types/portfolio";

export function ProjectCaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.slug}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        className="border-t border-espresso/20 pt-5"
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="eyebrow text-olive">Case study / {project.number}</p>
            <h3 className="mt-2 font-display text-4xl leading-none">{project.name}</h3>
          </div>
          <button type="button" onClick={onClose} className="icon-button" aria-label="Close case study"><X size={16} /></button>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <CaseStudyBlock title="The problem" text={project.problem} />
          <CaseStudyBlock title="The idea" text={project.idea} />
          <CaseStudyBlock title="The architecture" text={project.architecture} />
          <CaseStudyBlock title="Result / impact" text={project.result} />
        </div>
        <div className="mt-6 grid gap-5 border-t border-espresso/15 pt-5 sm:grid-cols-2">
          <div>
            <p className="eyebrow">What I built</p>
            <ul className="mt-3 space-y-2 text-sm text-espresso/75">{project.built.map((item) => <li key={item} className="flex gap-2"><span className="text-olive">↳</span>{item}</li>)}</ul>
          </div>
          <div>
            <p className="eyebrow">Key features</p>
            <ul className="mt-3 space-y-2 text-sm text-espresso/75">{project.features.map((item) => <li key={item} className="flex gap-2"><span className="text-olive">↳</span>{item}</li>)}</ul>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {project.stack.map((item) => <span key={item} className="tech-chip">{item}</span>)}
          {project.github && <a href={`https://${project.github}`} target="_blank" rel="noreferrer" className="journal-link ml-auto"><GitBranch size={14} /> GitHub <ExternalLink size={12} /></a>}
          {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noreferrer" className="journal-link"><ArrowUpRight size={14} /> Live demo</a>}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function CaseStudyBlock({ title, text }: { title: string; text: string }) {
  return <div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-olive">{title}</p><p className="mt-2 text-sm leading-relaxed text-espresso/75">{text}</p></div>;
}

export function MedFedArchitecture() {
  const hospitals = ["Hospital A", "Hospital B", "Hospital C", "Hospital D", "Hospital E"];
  return (
    <div className="medfed-diagram mt-6 border border-espresso/15 bg-cream/50 p-4 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <span className="eyebrow text-olive">Architecture / distributed learning</span>
        <span className="font-mono text-[9px] text-espresso/40">FLOW_02</span>
      </div>
      <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2">
          {hospitals.map((hospital, index) => <motion.div key={hospital} initial={{ opacity: 0.4 }} animate={{ opacity: [0.55, 1, 0.55] }} transition={{ duration: 3, delay: index * 0.35, repeat: Infinity }} className="node-card"><span className="h-1.5 w-1.5 rounded-full bg-olive" />{hospital}</motion.div>)}
        </div>
        <div className="hidden text-olive md:block">→</div>
        <div className="diagram-core"><span className="font-mono text-[10px] leading-tight">FEDERATED<br />AGGREGATION</span></div>
        <div className="hidden text-olive md:block">→</div>
        <div className="space-y-3"><div className="diagram-core w-full"><span className="font-mono text-[10px]">GLOBAL MODEL</span></div><div className="flex items-center justify-center gap-2 font-mono text-[9px] uppercase tracking-widest text-olive"><span className="h-px flex-1 bg-olive/40" />audit log<span className="h-px flex-1 bg-olive/40" /></div><div className="diagram-core w-full border-espresso/30"><span className="font-mono text-[10px]">BLOCKCHAIN LOG</span></div></div>
      </div>
      <div className="mt-5 border-t border-dashed border-espresso/15 pt-3 font-mono text-[9px] leading-relaxed text-espresso/50">local data stays local / model updates travel / every update leaves a trace</div>
    </div>
  );
}
