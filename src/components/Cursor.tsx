import { useEffect, useRef } from 'react'
const enabled = () => matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null), ring = useRef<HTMLDivElement>(null)
  const on = useRef(enabled()).current
  useEffect(() => {
    if (!on) return
    let x = -50, y = -50, rx = -50, ry = -50, raf = 0, big = false
    const mv = (e: MouseEvent) => { x = e.clientX; y = e.clientY; big = !!(e.target as HTMLElement).closest('a,button,[role=button]'); if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px)` }
    const loop = () => { rx += (x - rx) * 0.16; ry += (y - ry) * 0.16; if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px) scale(${big ? 1.8 : 1})`; raf = requestAnimationFrame(loop) }
    addEventListener('mousemove', mv); loop()
    return () => { removeEventListener('mousemove', mv); cancelAnimationFrame(raf) }
  }, [on])
  if (!on) return null
  return (<>
    <div ref={ring} aria-hidden className="fixed top-0 left-0 z-[100] pointer-events-none -ml-4 -mt-4 w-8 h-8 rounded-full border border-[var(--acc)]/60 transition-[scale] duration-200" />
    <div ref={dot} aria-hidden className="fixed top-0 left-0 z-[100] pointer-events-none -ml-[3px] -mt-[3px] w-1.5 h-1.5 rounded-full bg-[var(--acc)]" />
  </>)
}
