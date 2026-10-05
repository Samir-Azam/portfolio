const chips = ['C++', 'Python', 'React', 'Node.js', 'MongoDB', 'DSA']
// Lightweight CSS-only hero ambience for phones/tablets (no WebGL).
export default function Ambient() {
  return (
    <div aria-hidden className="lg:hidden absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#3b8bff]/25 blur-3xl animate-[drift_14s_ease-in-out_infinite]" />
      <div className="absolute bottom-10 -left-24 w-64 h-64 rounded-full bg-[#7cc4ff]/15 blur-3xl animate-[drift_18s_ease-in-out_infinite_reverse]" />
      <div className="absolute right-[-70px] top-[58%] w-56 h-56 -translate-y-1/2 rounded-full border border-dashed border-[var(--acc)]/25 animate-[drift_12s_ease-in-out_infinite]">
        <div className="absolute inset-6 rounded-full border border-[var(--acc)]/15" />
        {chips.map((c, i) => (
          <span key={c} className="chip absolute opacity-60" style={{ left: `${50 + 50 * Math.cos((i * Math.PI) / 3)}%`, top: `${50 + 50 * Math.sin((i * Math.PI) / 3)}%`, transform: 'translate(-50%,-50%)' }}>{c}</span>
        ))}
      </div>
    </div>)
}
