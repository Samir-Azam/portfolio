import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Code2, Download, Github, Linkedin, Mail } from 'lucide-react'
import { portfolio as p } from '../data/portfolio'
import Ambient from './Ambient'
const HeroScene = lazy(() => import('./three/HeroScene'))
const roles = ['C++ / Python', 'Data Structures & Algorithms', 'Backend Development', 'MERN Stack', 'AI-Powered Applications']
const rise = (i: number) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.15 + i * 0.12 } })
function canWebGL() { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')) } catch { return false } }
export default function Hero() {
  const [show3d, setShow] = useState(false); const [r, setR] = useState(0)
  const { scrollY } = useScroll(); const y = useTransform(scrollY, [0, 500], [0, 80]); const o = useTransform(scrollY, [0, 450], [1, 0.15])
  useEffect(() => {
    const desk = matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)'), calm = matchMedia('(prefers-reduced-motion: reduce)')
    const upd = () => setShow(desk.matches && !calm.matches && canWebGL())
    upd(); desk.addEventListener('change', upd); calm.addEventListener('change', upd)
    return () => { desk.removeEventListener('change', upd); calm.removeEventListener('change', upd) }
  }, [])
  useEffect(() => { const t = setInterval(() => setR(x => (x + 1) % roles.length), 2600); return () => clearInterval(t) }, [])
  const btn = 'inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition'
  return (
    <section id="home" className="relative min-h-[100svh] flex items-center overflow-hidden">
      <div className="absolute inset-0 opacity-90">{show3d && <Suspense fallback={null}><HeroScene /></Suspense>}</div>
      <Ambient />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_30%_50%,#070b14ee,transparent_65%)]" />
      <motion.div style={{ y, opacity: o }} className="relative max-w-6xl mx-auto px-5 pt-20 pb-16 pointer-events-none w-full">
        <motion.p {...rise(0)} className="mono text-xs tracking-[0.3em] text-[var(--mute)] mb-4">PUNE · COMPUTER ENGINEERING</motion.p>
        <motion.h1 {...rise(1)} className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] bg-gradient-to-b from-white to-[#8fa6cc] bg-clip-text text-transparent">SAMIR<br />AZAM</motion.h1>
        <motion.p {...rise(2)} className="mt-6 text-xl sm:text-2xl text-[var(--acc)]">Software Engineer<br />Full-Stack Developer</motion.p>
        <motion.div {...rise(3)} className="mt-3 h-6 mono text-sm text-[var(--mute)]" aria-hidden>
          <AnimatePresence mode="wait"><motion.span key={r} className="inline-block" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>{'> '}{roles[r]}</motion.span></AnimatePresence>
        </motion.div>
        <motion.p {...rise(4)} className="mt-5 max-w-md text-[var(--mute)]">{p.intro}</motion.p>
        <motion.div {...rise(5)} className="mt-8 flex flex-wrap gap-3 pointer-events-auto">
          <a href="#projects" className={`${btn} bg-[var(--acc)] text-[#06101f] hover:brightness-110`}>View Projects</a>
          <a href={p.resume} download className={`${btn} glass hover:border-[var(--acc)]`}><Download size={16} />Download Resume</a>
        </motion.div>
        <motion.div {...rise(6)} className="mt-6 flex gap-5 text-[var(--mute)] pointer-events-auto w-fit">
          <a aria-label="GitHub" href={p.social.github} target="_blank" rel="noreferrer" className="hover:text-white"><Github /></a>
          <a aria-label="LinkedIn" href={p.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-white"><Linkedin /></a>
          <a aria-label="LeetCode" href={p.social.leetcode} target="_blank" rel="noreferrer" className="hover:text-white"><Code2 /></a>
          <a aria-label="Email" href={`mailto:${p.email}`} className="hover:text-white"><Mail /></a>
        </motion.div>
      </motion.div>
      <a href="#about" aria-label="Scroll to About" className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 w-5 h-8 rounded-full border border-[var(--mute)] flex justify-center pt-1.5"><span className="w-1 h-1.5 rounded-full bg-[var(--acc)] animate-bounce" /></a>
    </section>)
}
