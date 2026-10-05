import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
export const sections = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Achievements', 'Contact']
export default function Navbar() {
  const [active, setActive] = useState('home'); const [open, setOpen] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(e => e.forEach(x => x.isIntersecting && setActive(x.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    sections.forEach(s => { const el = document.getElementById(s.toLowerCase()); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  const link = (s: string) => (
    <a key={s} href={`#${s.toLowerCase()}`} onClick={() => setOpen(false)} aria-current={active === s.toLowerCase() ? 'true' : undefined}
      className={`px-2 py-1 text-sm transition-colors ${active === s.toLowerCase() ? 'text-[var(--acc)]' : 'text-[var(--mute)] hover:text-white'}`}>{s}</a>)
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass !rounded-none border-x-0 border-t-0">
      <nav aria-label="Primary" className="max-w-6xl mx-auto flex items-center justify-between px-5 h-14">
        <a href="#home" className="mono text-[var(--acc)] font-bold" aria-label="Samir Azam home">SA</a>
        <div className="hidden lg:flex gap-3">{sections.map(link)}</div>
        <button className="lg:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </nav>
      {open && <div className="lg:hidden flex flex-col px-5 pb-4 max-h-[70dvh] overflow-y-auto">{sections.map(link)}</div>}
    </header>)
}
