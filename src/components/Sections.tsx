import { ReactNode, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Award, Code2, Download, Github, Linkedin, Mail, MapPin, Trophy } from 'lucide-react'
import { portfolio as p } from '../data/portfolio'
const Sec = ({ id, title, children }: { id: string; title: string; children: ReactNode }) => (
  <section id={id} className="max-w-6xl mx-auto px-5 py-16 md:py-24">
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-10">{title}</h2>{children}</motion.div></section>)
const Chain = ({ items }: { items: string[] }) => (
  <ol className="flex flex-col items-center">{items.map((a, i) => (
    <li key={a} className="flex flex-col items-center"><span className="glass px-5 py-2 mono text-sm">{a}</span>{i < items.length - 1 && <span className="flow w-[2px] h-7" aria-hidden />}</li>))}</ol>)

export function About() {
  const stats = [['9.18', 'CGPA / 10'], ['300+', 'DSA problems solved'], ['2027', 'Expected graduation'], ['3', 'Featured projects']]
  return <Sec id="about" title="About Me"><div className="grid lg:grid-cols-5 gap-10 items-start">
    <div className="lg:col-span-3 space-y-5">
      <p className="text-lg text-[var(--mute)] leading-relaxed">{p.about}</p>
      <p className="text-[var(--mute)] leading-relaxed">{p.about2}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">{stats.map(([b, l]) => <div key={l} className="glass p-4"><p className="text-2xl font-bold text-[var(--acc)]">{b}</p><p className="text-xs text-[var(--mute)] mt-1">{l}</p></div>)}</div>
      <div className="flex flex-wrap gap-2">{['C++', 'Python', 'DSA', 'Backend', 'Full-Stack', 'AI-Powered Apps'].map(x => <span key={x} className="chip">{x}</span>)}</div></div>
    <div className="hidden lg:flex lg:col-span-2 justify-end pr-6"><Chain items={p.journey} /></div></div></Sec>
}
export function Skills() {
  const [i, setI] = useState(0); const d = p.skillDomains[i]
  return <Sec id="skills" title="Skills">
    <div role="tablist" aria-label="Skill domains" className="flex flex-wrap gap-2 mb-8">{p.skillDomains.map((x, k) => (
      <button key={x.name} role="tab" aria-selected={k === i} onClick={() => setI(k)}
        className={`px-4 py-2 rounded-full text-sm border transition ${k === i ? 'bg-[var(--acc)] text-[#06101f] border-transparent' : 'border-[var(--line)] text-[var(--mute)] hover:text-white hover:border-[var(--acc)]'}`}>{x.name}</button>))}</div>
    <AnimatePresence mode="wait"><motion.div key={d.name} role="tabpanel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="spot glass p-6 md:p-8">
      <p className="text-[var(--mute)] mb-6 max-w-xl">{d.blurb}</p>
      <div className="grid gap-6 sm:grid-cols-2">{d.groups.map(g => (
        <div key={g.label}><h3 className="mono text-xs tracking-widest text-[var(--acc)] mb-3">{g.label.toUpperCase()}</h3>
          <div className="flex flex-wrap gap-2">{g.items.map(x => <span key={x} className="chip">{x}</span>)}</div></div>))}</div>
    </motion.div></AnimatePresence></Sec>
}
export function Experience() {
  return <Sec id="experience" title="Experience">{p.experience.map(e => (
    <div key={e.role} className="relative pl-8 border-l border-[var(--acc)]/40">
      <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-[var(--acc)] shadow-[0_0_12px_#7cc4ff]" />
      <h3 className="text-xl font-bold">{e.role}</h3><p className="text-[var(--acc)]">{e.company}</p>
      <p className="text-sm text-[var(--mute)]">{e.period} · {e.mode}</p>
      <ul className="mt-3 list-disc pl-5 text-[var(--mute)] space-y-1 max-w-2xl">{e.points.map(x => <li key={x}>{x}</li>)}</ul></div>))}</Sec>
}
export function Education() {
  return <Sec id="education" title="Education"><div className="space-y-8 border-l border-[var(--line)] pl-8">{p.education.map(e => (
    <div key={e.degree} className="relative"><span className="absolute -left-[38px] top-2 w-3 h-3 rounded-full bg-[var(--acc)]" />
      <h3 className="text-xl font-bold">{e.degree}</h3><p>{e.school}</p>{e.extra && <p className="text-[var(--mute)]">{e.extra}</p>}
      <p className="text-[var(--acc)] mono text-sm mt-1">{e.score} · {e.period}</p>
      {e.courses.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{e.courses.map(c => <span key={c} className="chip">{c}</span>)}</div>}</div>))}</div></Sec>
}
export function Achievements() {
  const icons = [Code2, Award, Trophy]
  return <Sec id="achievements" title="Achievements"><div className="grid gap-6 md:grid-cols-3">{p.achievements.map((a, i) => { const I = icons[i]; return (
    <div key={a.label} className="group spot glass p-6"><I className="mb-3 text-[var(--acc)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-12" />
      <p className="text-2xl font-bold text-[var(--acc)] leading-tight">{a.big}</p><p className="mt-2 font-medium">{a.label}</p><p className="text-sm text-[var(--mute)]">{a.sub}</p></div>) })}</div></Sec>
}
export function Resume() {
  return <Sec id="resume" title="Want to know more?"><p className="text-[var(--mute)] max-w-lg">View my resume and explore my experience, projects and technical background.</p>
    <div className="mt-6 flex flex-wrap gap-3"><a href={p.resume} target="_blank" rel="noreferrer" className="glass px-5 py-3 hover:border-[var(--acc)]">View Resume</a>
      <a href={p.resume} download className="bg-[var(--acc)] text-[#06101f] rounded-[14px] px-5 py-3 inline-flex gap-2 items-center"><Download size={16} />Download Resume</a></div></Sec>
}
export function Contact() {
  const row = 'inline-flex items-center gap-2 hover:text-[var(--acc)] break-all'
  return <Sec id="contact" title="Let's Build Something"><div className="space-y-3">
    <a className={row} href={`mailto:${p.email}`}><Mail size={18} />{p.email}</a><br />
    <a className={row} href={p.social.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} />{p.social.linkedin}</a><br />
    <a className={row} href={p.social.github} target="_blank" rel="noreferrer"><Github size={18} />{p.social.github}</a><br />
    <a className={row} href={p.social.leetcode} target="_blank" rel="noreferrer"><Code2 size={18} />{p.social.leetcode}</a><br />
    <span className="inline-flex items-center gap-2 text-[var(--mute)]"><MapPin size={18} />{p.location}</span></div></Sec>
}
export function Footer() {
  return <footer className="border-t border-[var(--line)] py-8 px-5 max-w-6xl mx-auto flex flex-wrap justify-between gap-4 text-sm text-[var(--mute)]">
    <div><p className="text-white">Samir Azam</p><p>Software Engineer | Full-Stack Developer</p><p className="mt-2">© 2026 Samir Azam</p></div>
    <div className="flex gap-4"><a aria-label="GitHub" href={p.social.github} target="_blank" rel="noreferrer"><Github /></a><a aria-label="LinkedIn" href={p.social.linkedin} target="_blank" rel="noreferrer"><Linkedin /></a><a aria-label="LeetCode" href={p.social.leetcode} target="_blank" rel="noreferrer"><Code2 /></a></div></footer>
}
