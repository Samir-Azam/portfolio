import { useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Mindset from './components/Mindset'
import Cursor from './components/Cursor'
import { About, Skills, Experience, Education, Achievements, Resume, Contact, Footer } from './components/Sections'
export default function App() {
  const { scrollYProgress } = useScroll()
  useEffect(() => {
    const mv = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('.spot') as HTMLElement | null
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`); el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    addEventListener('mousemove', mv); return () => removeEventListener('mousemove', mv)
  }, [])
  return (<>
    <motion.div style={{ scaleX: scrollYProgress }} className="fixed top-0 inset-x-0 h-0.5 origin-left bg-[var(--acc)] z-[70]" aria-hidden />
    <Cursor /><Navbar />
    <main><Hero /><About /><Skills /><Projects /><Experience /><Education /><Achievements /><Mindset /><Resume /><Contact /></main><Footer />
  </>)
}
