import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { portfolio } from '../data/portfolio'
type P = (typeof portfolio.projects)[number]
export default function ProjectCard({ p, onOpen }: { p: P; onOpen: () => void }) {
  const [t, setT] = useState({ x: 0, y: 0 })
  return (
    <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
      onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setT({ x: ((e.clientY - r.top) / r.height - 0.5) * -8, y: ((e.clientX - r.left) / r.width - 0.5) * 8 }) }}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      className="spot glass p-6 flex flex-col hover:border-[var(--acc)] hover:shadow-[0_0_40px_-10px_#7cc4ff88]">
      <div className="flex flex-col flex-1" style={{ transform: `perspective(900px) rotateX(${t.x}deg) rotateY(${t.y}deg)`, transition: 'transform .15s' }}>
        <button onClick={onOpen} className="text-left flex-1" aria-label={`Open ${p.title} details`}>
          <h3 className="text-2xl font-bold">{p.title}</h3>
          <p className="text-[var(--acc)] text-sm mt-1">{p.subtitle}</p>
          <p className="text-[var(--mute)] mt-3 text-sm">{p.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">{p.tech.map(x => <span key={x} className="chip">{x}</span>)}</div>
        </button>
        <div className="mt-5 flex gap-4 text-sm">
          <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex gap-1 items-center hover:text-[var(--acc)]"><Github size={15} />GitHub</a>
          <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex gap-1 items-center hover:text-[var(--acc)]"><ExternalLink size={15} />Live Demo</a>
        </div>
      </div>
    </motion.article>)
}
