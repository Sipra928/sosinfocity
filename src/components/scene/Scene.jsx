// Scene.jsx
import { Suspense, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import HologramEarth from '../HologramEarth'
// import HologramEarth from '../components/scene/HologramEarth'

function FallbackGlobe() {
  const ref = useRef()
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.12
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshBasicMaterial color={'#8fd4ff'} wireframe transparent opacity={0.6} />
    </mesh>
  )
}

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 2]} intensity={1.15} color={'#ffffff'} />
      <directionalLight position={[-4, -3, -5]} intensity={0.6} color={'#ffffff'} />

      <Suspense fallback={<FallbackGlobe />}>
        <HologramEarth />
      </Suspense>

      <Stars radius={80} depth={60} count={8000} factor={2} saturation={0} fade speed={0.6} />

      <EffectComposer multisampling={0} disableNormalPass>
        <Bloom intensity={1.6} luminanceThreshold={0.08} luminanceSmoothing={0.7} mipmapBlur radius={1.0} />
        <Noise opacity={0.02} premultiply />
        <Vignette eskil={false} offset={0.2} darkness={0.8} />
      </EffectComposer>
      <AdaptiveDpr pixelated={false} />
      <AdaptiveEvents />
    </>
  )
}
