import { useState } from 'react'
import { motion } from 'framer-motion'
import { portfolio as p } from '../data/portfolio'
const topics = ['DSA', 'OOP', 'DBMS', 'Backend', 'APIs', 'Full Stack']
const sx = (i: number) => 70 + 132 * i, tx = (j: number) => 100 + 120 * j
export default function Mindset() {
  const [h, setH] = useState<number | null>(null)
  return (
    <section id="mindset" className="max-w-6xl mx-auto px-5 py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-10">Engineering Mindset</h2>
      <motion.svg viewBox="0 0 800 270" className="w-full hidden md:block" role="img" aria-label="Problem, Understand, Design, Implement, Test, Improve loop, supported by DSA, OOP, DBMS, Backend, APIs and Full Stack"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <defs><linearGradient id="lg" x1="0" x2="1"><stop offset="0" stopColor="#7cc4ff" stopOpacity=".2" /><stop offset="1" stopColor="#7cc4ff" /></linearGradient></defs>
        {topics.map((_, j) => <line key={j} x1={tx(j)} y1={225} x2={sx(3)} y2={92} stroke="#7cc4ff" strokeOpacity={h === 3 ? 0.5 : 0.15} />)}
        <path id="main" d="M70 70 H730" stroke="url(#lg)" strokeWidth="2" fill="none" />
        <path id="loop" d="M730 92 C730 190 70 190 70 92" stroke="#7cc4ff" strokeOpacity=".3" strokeDasharray="5 6" fill="none" />
        <circle r="4" fill="#9fd4ff"><animateMotion dur="5s" repeatCount="indefinite" path="M70 70 H730 C730 190 70 190 70 92" /></circle>
        {p.mindset.map((m, i) => (
          <g key={m} tabIndex={0} onMouseEnter={() => setH(i)} onMouseLeave={() => setH(null)} onFocus={() => setH(i)} onBlur={() => setH(null)} style={{ cursor: 'pointer' }}>
            <circle cx={sx(i)} cy={70} r={h === i ? 22 : 16} fill="#0b1222" stroke="#7cc4ff" strokeWidth="2" style={{ transition: 'r .25s', filter: h === i ? 'drop-shadow(0 0 10px #7cc4ff)' : 'none' }} />
            <text x={sx(i)} y={74} textAnchor="middle" fontSize="12" fill="#7cc4ff" fontFamily="JetBrains Mono, monospace">{i + 1}</text>
            <text x={sx(i)} y={28} textAnchor="middle" fontSize="19" fill={h === i ? '#fff' : '#8a96ad'}>{m}</text>
          </g>))}
        {topics.map((t, j) => (
          <g key={t}><rect x={tx(j) - 48} y={225} width="96" height="30" rx="15" fill="#0b1222" stroke="#7cc4ff" strokeOpacity=".4" />
            <text x={tx(j)} y={245} textAnchor="middle" fontSize="15" fill="#e6ecf7" fontFamily="JetBrains Mono, monospace">{t}</text></g>))}
      </motion.svg>
      <div className="md:hidden">
        <ol className="space-y-2">{p.mindset.map((x, i) => <li key={x} className="glass px-4 py-2 flex items-center gap-3"><span className="mono text-xs text-[var(--acc)]">{i + 1}</span>{x}</li>)}</ol>
        <p className="mono text-xs text-[var(--mute)] mt-3">↺ Improve feeds back into the next problem</p>
        <div className="mt-4 flex flex-wrap gap-2">{topics.map(t => <span key={t} className="chip">{t}</span>)}</div>
      </div>
    </section>)
}
