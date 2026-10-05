import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, Line } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { portfolio } from '../../data/portfolio'

function Core({ mobile }: { mobile: boolean }) {
  const g = useRef<THREE.Group>(null!)
  const names = mobile ? portfolio.heroNodes.slice(0, 8) : portfolio.heroNodes
  const pts = useMemo(() => names.map((_, i) => {
    const p = Math.acos(1 - (2 * (i + 0.5)) / names.length), t = Math.PI * (1 + Math.sqrt(5)) * i
    return new THREE.Vector3(2.7 * Math.sin(p) * Math.cos(t), 2.7 * Math.cos(p), 2.7 * Math.sin(p) * Math.sin(t))
  }), [names])
  const dust = useMemo(() => { const a = new Float32Array((mobile ? 120 : 400) * 3); for (let i = 0; i < a.length; i++) a[i] = (Math.random() - 0.5) * 14; return a }, [mobile])
  useFrame((s, d) => {
    g.current.rotation.y += d * 0.1
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -s.pointer.y * 0.35, 0.05)
    const w = s.viewport.width, h = s.viewport.height, wide = w / h > 1.25
    const tx = (wide ? w * 0.22 : 0) + s.pointer.x * 0.4, ty = wide ? 0 : -h * 0.27
    const sc = wide ? Math.min(0.9, w / 13) : Math.min(0.75, w / 9)
    g.current.position.x = THREE.MathUtils.lerp(g.current.position.x, tx, 0.05)
    g.current.position.y = THREE.MathUtils.lerp(g.current.position.y, ty, 0.05)
    g.current.scale.setScalar(THREE.MathUtils.lerp(g.current.scale.x, sc, 0.08))
  })
  return (
    <group ref={g}>
      <mesh><icosahedronGeometry args={[1.1, 3]} /><meshStandardMaterial color="#12203a" emissive="#3b8bff" emissiveIntensity={0.55} roughness={0.35} metalness={0.6} /></mesh>
      <mesh><icosahedronGeometry args={[1.6, 1]} /><meshBasicMaterial color="#7cc4ff" wireframe transparent opacity={0.14} /></mesh>
      {pts.map((p, i) => (
        <group key={names[i]}>
          <Line points={[[0, 0, 0], p.toArray()]} color="#7cc4ff" transparent opacity={0.12} lineWidth={1} />
          {i % 2 === 0 && <Line points={[p.toArray(), pts[(i + 3) % pts.length].toArray()]} color="#7cc4ff" transparent opacity={0.25} lineWidth={1} />}
          <Float speed={1.4} floatIntensity={0.6} position={p.toArray()}>
            <mesh><sphereGeometry args={[0.06, 12, 12]} /><meshBasicMaterial color="#9fd4ff" /></mesh>
            <Html center distanceFactor={9} position={[0, 0.22, 0]} style={{ pointerEvents: 'none' }}><span className="chip" style={{ whiteSpace: 'nowrap' }}>{names[i]}</span></Html>
          </Float>
        </group>
      ))}
      <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[dust, 3]} /></bufferGeometry><pointsMaterial size={0.02} color="#8fb8ff" transparent opacity={0.6} /></points>
    </group>
  )
}

export default function HeroScene() {
  const mobile = window.innerWidth < 768
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 50 }} gl={{ powerPreference: 'high-performance', antialias: !mobile }}
      eventSource={document.getElementById('root')!} eventPrefix="client" aria-hidden="true">
      <ambientLight intensity={0.5} /><pointLight position={[5, 5, 5]} intensity={40} color="#7cc4ff" />
      <Core mobile={mobile} />
    </Canvas>
  )
}
