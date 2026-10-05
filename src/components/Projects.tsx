import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Github, X } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import ProjectCard from './ProjectCard'
export default function Projects() {
  const [sel, setSel] = useState<number | null>(null)
  const p = sel !== null ? portfolio.projects[sel] : null
  return (
    <section id="projects" className="max-w-6xl mx-auto px-5 py-16 md:py-28">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-10">Projects</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{portfolio.projects.map((x, i) => <ProjectCard key={x.id} p={x} onOpen={() => setSel(i)} />)}</div>
      <AnimatePresence>{p && (
        <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setSel(null)} onKeyDown={e => e.key === 'Escape' && setSel(null)}>
          <motion.div role="dialog" aria-modal="true" aria-label={p.title} className="glass !bg-[#0b1222] max-w-2xl w-full max-h-[88dvh] overflow-y-auto p-7 relative"
            initial={{ y: 30, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.35 }} onClick={e => e.stopPropagation()}>
            <button autoFocus aria-label="Close" onClick={() => setSel(null)} className="absolute top-4 right-4"><X /></button>
            <h3 className="text-2xl sm:text-3xl font-bold pr-10">{p.title}</h3><p className="text-[var(--acc)]">{p.subtitle}</p>
            <h4 className="mt-6 font-medium">Overview</h4><p className="text-[var(--mute)]">{p.description}</p>
            <h4 className="mt-5 font-medium">Technology</h4><div className="mt-2 flex flex-wrap gap-2">{p.tech.map(x => <span key={x} className="chip">{x}</span>)}</div>
            <h4 className="mt-5 font-medium">Key Features</h4>
            <ul className="mt-2 grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-[var(--mute)] list-disc pl-5">{p.features.map(f => <li key={f}>{f}</li>)}</ul>
            <h4 className="mt-5 font-medium">Architecture</h4>
            <ol className="mt-3 flex flex-col items-center">{p.architecture.map((a, i) => (
              <li key={a} className="flex flex-col items-center">
                <span className="chip !text-sm !px-4 !py-1">{a}</span>
                {i < p.architecture.length - 1 && <span className="flow w-[2px] h-6 my-1" aria-hidden />}
              </li>))}</ol>
            <div className="mt-6 flex gap-4">
              <a href={p.github} target="_blank" rel="noreferrer" className="glass px-4 py-2 inline-flex gap-2 items-center hover:border-[var(--acc)]"><Github size={16} />GitHub</a>
              <a href={p.live} target="_blank" rel="noreferrer" className="glass px-4 py-2 inline-flex gap-2 items-center hover:border-[var(--acc)]"><ExternalLink size={16} />Live Demo</a>
            </div>
          </motion.div></motion.div>)}</AnimatePresence>
    </section>)
}
