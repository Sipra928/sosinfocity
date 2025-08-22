import { Canvas } from '@react-three/fiber'
import { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import HologramEarth from './HologramEarth'
import BlurText from '../blocks/TextAnimations/BlurText/BlurText'
import ShinyText from '../blocks/TextAnimations/ShinyText/ShinyText'

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />

      {/* Replace your existing directional light with this one */}
      <directionalLight
        position={[3, 4, 2]}
        intensity={1.15}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
      />

      <directionalLight position={[-4, -3, -5]} intensity={0.6} color={'#ffffff'} />

      <HologramEarth />

      <EffectComposer multisampling={0} disableNormalPass>
        <Bloom
          intensity={0.2}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.7}
          mipmapBlur
          radius={0.}
        />
      </EffectComposer>
    </>
  )
}


export default function GlobePage() {
  const containerRef = useRef(null)
  return (
    <div className="flex w-full h-screen bg-[#151922]">
      {/* Left side: Text */}
      <div className="flex flex-col justify-center pl-[5%] w-1/2 space-y-8">
        <BlurText
          text="SOS INFOTECH AND"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-[4vw] tracking-wider  font-semibold font-[anzo3] leading-10"
        />
        <BlurText
          text="TELECOM PVT. LTD."
          delay={300}
          animateBy="words"
          direction="top"
          className="text-[4vw] tracking-wider font-semibold font-[anzo3]"
        />
        <div className="font-[anzo2] text-[1.3vw] w-7/8">
          <ShinyText
            text="SOS offers fast and reliable security and network solutions for residents and businesses in India. We are specialized in CCTV cameras & surveillance systems, Wifi services and Biometrics. We strive to provide timely, efficient services to our customers. From new installations to large scale repair after any natural calamity, we have completed various projects."
            disabled={false}
            speed={3}
            className="custom-class"
          />
        </div>
      </div>

      {/* Right side: Video background with optional Canvas overlay */}
      <div className="w-1/2 h-full relative overflow-hidden">
        {/* Video background */}
        <video
          src="src/assets/images/front.mp4" // Replace with your video path
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Optional 3D Canvas overlay */}
        {/* <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
          className="absolute top-0 left-0 w-full h-full"
          onCreated={({ gl }) => {
            // Transparent canvas so video shows through
            gl.setClearColor(new THREE.Color(0x000000), 0)
          }}
        >
          <Scene />
          <OrbitControls
            enableZoom={false}
            enableDamping
            dampingFactor={0.08}
            autoRotate
            autoRotateSpeed={0.25}
            minDistance={2.2}
            maxDistance={8}
          />
        </Canvas> */}
      </div>
    </div>
  )
}
