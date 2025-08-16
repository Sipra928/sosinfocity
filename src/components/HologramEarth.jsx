import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { feature as topojsonFeature, mesh as topojsonMesh } from 'topojson-client'

function generateLatitudeCirclePoints(radius, latitudeDeg, segments = 256) {
  const latitudeRad = THREE.MathUtils.degToRad(latitudeDeg)
  const circleRadius = radius * Math.cos(latitudeRad)
  const y = radius * Math.sin(latitudeRad)
  const points = []
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2
    const x = circleRadius * Math.cos(t)
    const z = circleRadius * Math.sin(t)
    points.push(new THREE.Vector3(x, y, z))
  }
  return points
}

function generateLongitudeLinePoints(radius, longitudeDeg, segments = 256) {
  const theta = THREE.MathUtils.degToRad(longitudeDeg)
  const points = []
  for (let i = 0; i <= segments; i++) {
    const phi = (i / segments) * Math.PI
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.cos(phi)
    const z = radius * Math.sin(phi) * Math.sin(theta)
    points.push(new THREE.Vector3(x, y, z))
  }
  return points
}

function LatitudeLongitudeGrid({ radius = 1, color = '#7fd3ff', latEvery = 10, lonEvery = 10, opacity = 0.6 }) {
  const latitudes = useMemo(() => {
    const arr = []
    for (let lat = -90 + latEvery; lat < 90; lat += latEvery) {
      arr.push(generateLatitudeCirclePoints(radius, lat))
    }
    return arr
  }, [radius, latEvery])

  const longitudes = useMemo(() => {
    const arr = []
    for (let lon = -180; lon < 180; lon += lonEvery) {
      arr.push(generateLongitudeLinePoints(radius, lon))
    }
    return arr
  }, [radius, lonEvery])

  return (
    <group>
      {latitudes.map((pts, i) => (
        <line key={`lat-${i}`}> 
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attachObject={["attributes", "position"]}
              count={pts.length}
              array={new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial attach="material" color={color} transparent opacity={opacity} blending={THREE.AdditiveBlending} />
        </line>
      ))}
      {longitudes.map((pts, i) => (
        <line key={`lon-${i}`}>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attachObject={["attributes", "position"]}
              count={pts.length}
              array={new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial attach="material" color={color} transparent opacity={opacity} blending={THREE.AdditiveBlending} />
        </line>
      ))}
    </group>
  )
}

function RotatingGlobe({ radius = 1.2 }) {
  const groupRef = useRef()
  const wireRef = useRef()
  const { size } = useThree()
  const [coastlines, setCoastlines] = useState(null)
  const [countryBorders, setCountryBorders] = useState(null)

  useEffect(() => {
    // Load land and country borders (TopoJSON -> GeoJSON/mesh)
    Promise.all([
      fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json').then((r) => r.json()),
      fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then((r) => r.json()),
    ])
      .then(([landTopo, countriesTopo]) => {
        setCoastlines(topojsonFeature(landTopo, landTopo.objects.land))
        setCountryBorders(topojsonMesh(countriesTopo, countriesTopo.objects.countries, (a, b) => a !== b))
      })
      .catch(() => {
        setCoastlines(null)
        setCountryBorders(null)
      })
  }, [])

  const scale = 1;

  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.12
    if (wireRef.current) {
      const t = state.clock.elapsedTime
      const intensity = 0.55 + Math.sin(t * 1.6) * 0.15
      wireRef.current.material.opacity = intensity
    }
  })

  const sphere = useMemo(() => new THREE.SphereGeometry(1, 64, 64), [])

  return (
    
    <group ref={groupRef} scale={[scale, scale, scale] }>
      
      <OrbitingRings radius={radius * 1.18} />
      <NetworkArcs radius={radius} />
      <DataPoints radius={radius} count={60} />
      <NetworkBursts radius={radius} />
      {/* Coastline outlines (bright) and country borders (darker) */}
      {coastlines && (
        <group>
          {coastlines.features.map((feat, idx) => {
            const coords = feat.geometry.coordinates
            const lines = []
            // GeoJSON can be MultiPolygon/Polygon
            const polys = feat.geometry.type === 'Polygon' ? [coords] : coords
            polys.forEach((poly) => {
              poly.forEach((ring) => {
                const pts = ring.map(([lon, lat]) => {
                  const phi = THREE.MathUtils.degToRad(90 - lat)
                  const theta = THREE.MathUtils.degToRad(lon + 180)
                  const x = -radius * Math.sin(phi) * Math.cos(theta)
                  const z = radius * Math.sin(phi) * Math.sin(theta)
                  const y = radius * Math.cos(phi)
                  return new THREE.Vector3(x, y, z)
                })
                lines.push(pts)
              })
            })
            return lines.map((pts, i) => (
              <Line key={`coast-${idx}-${i}`} points={pts} color={'#49c3ff'} lineWidth={2.0} transparent opacity={1.0} toneMapped={false} />
            ))
          })}
        </group>
      )}
      {countryBorders && countryBorders.coordinates && (
        <group>
          {countryBorders.coordinates.map((line, i) => {
            const pts = line.map(([lon, lat]) => {
              const phi = THREE.MathUtils.degToRad(90 - lat)
              const theta = THREE.MathUtils.degToRad(lon + 180)
              const x = -radius * Math.sin(phi) * Math.cos(theta)
              const z = radius * Math.sin(phi) * Math.sin(theta)
              const y = radius * Math.cos(phi)
              return new THREE.Vector3(x, y, z)
            })
            return <Line key={`border-${i}`} points={pts} color={'#2a82bf'} lineWidth={1.2} transparent opacity={0.6} toneMapped={false} />
          })}
        </group>
      )}
      <mesh geometry={sphere} scale={radius} ref={wireRef}>
        <meshBasicMaterial color={'#3fb4ff'} wireframe transparent opacity={0.55} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Denser global grid to emphasize continental detail */}
      <LatitudeLongitudeGrid radius={radius * 1.001} color="#2f98d6" latEvery={5} lonEvery={5} opacity={0.5} />

      <group scale={0.62}>
        <LatitudeLongitudeGrid radius={radius} color="#7fdcff" latEvery={4} lonEvery={4} opacity={0.4} />
      </group>

      {/* Deep inner wireframe sphere for extra layering */}
      <mesh geometry={sphere} scale={radius * 0.5}>
        <meshBasicMaterial color={'#88d6ff'} wireframe transparent opacity={0.18} blending={THREE.AdditiveBlending} />
      </mesh>

      <pointLight color={'#8ddcff'} intensity={2.8} distance={12} decay={2} />
    </group>
  )
}

function latLonToVec3(r, lat, lon) {
  const phi = THREE.MathUtils.degToRad(90 - lat)
  const theta = THREE.MathUtils.degToRad(lon + 180)
  const x = -r * Math.sin(phi) * Math.cos(theta)
  const z = r * Math.sin(phi) * Math.sin(theta)
  const y = r * Math.cos(phi)
  return new THREE.Vector3(x, y, z)
}

function OrbitingRings({ radius }) {
  const group = useRef()
  const circles = useMemo(() => {
    const pts = []
    const segments = 256
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(t) * radius, 0, Math.sin(t) * radius))
    }
    return pts
  }, [radius])
  useFrame((_, d) => {
    if (!group.current) return
    group.current.rotation.y += d * 0.05
  })
  return (
    <group ref={group}>
      {[0.35, -0.6, 1.0].map((tilt, i) => (
        <group key={i} rotation={[tilt, tilt * 0.5, tilt * -0.2]}>
          <Line points={circles} color={'#7fe0ff'} lineWidth={0.8} transparent opacity={0.35} toneMapped={false} />
        </group>
      ))}
    </group>
  )
}

function createGreatCirclePoints(startLat, startLon, endLat, endLon, radius, segments = 150, height = 0.18) {
  const start = latLonToVec3(1, startLat, startLon).normalize()
  const end = latLonToVec3(1, endLat, endLon).normalize()
  const points = []
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const v = new THREE.Vector3().copy(start).lerp(end, t).normalize()
    const elevated = radius * (1 + Math.sin(Math.PI * t) * height)
    points.push(v.multiplyScalar(elevated))
  }
  return points
}

function NetworkArcs({ radius }) {
  const routes = useMemo(() => [
    // [lat, lon] pairs: NYC ↔ London, London ↔ Singapore, Singapore ↔ Sydney, Tokyo ↔ LA, Dubai ↔ Johannesburg
    [[40.7128, -74.006], [51.5074, -0.1278]],
    [[51.5074, -0.1278], [1.3521, 103.8198]],
    [[1.3521, 103.8198], [-33.8688, 151.2093]],
    [[35.6762, 139.6503], [34.0522, -118.2437]],
    [[25.2048, 55.2708], [-26.2041, 28.0473]],
  ], [])

  const curves = useMemo(() => routes.map(([a, b]) => {
    const pts = createGreatCirclePoints(a[0], a[1], b[0], b[1], radius, 160, 0.22)
    return new THREE.CatmullRomCurve3(pts)
  }), [routes, radius])

  const movers = useRef([])
  movers.current = []
  useFrame((state) => {
    const t = state.clock.elapsedTime
    curves.forEach((curve, idx) => {
      const mRef = movers.current[idx]
      if (!mRef) return
      const speed = 0.06 + (idx % 3) * 0.02
      const u = (t * speed) % 1
      const pos = curve.getPointAt(u)
      mRef.position.copy(pos)
    })
  })

  return (
    <group>
      {curves.map((curve, i) => (
        <group key={`arc-${i}`}>
          <Line points={curve.getPoints(200)} color={'#9fe6ff'} lineWidth={1.2} transparent opacity={0.5} toneMapped={false} />
          <mesh ref={(r) => (movers.current[i] = r)}>
            <sphereGeometry args={[0.02, 12, 12]} />
            <meshBasicMaterial color={'#c8ffff'} transparent opacity={0.95} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function DataPoints({ radius, count = 60 }) {
  const meshRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const positions = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      const lat = THREE.MathUtils.randFloatSpread(160)
      const lon = THREE.MathUtils.randFloatSpread(360)
      arr.push(latLonToVec3(radius * 1.002, lat, lon))
    }
    return arr
  }, [count, radius])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    positions.forEach((p, i) => {
      const s = 0.6 + 0.4 * Math.sin(t * 2 + i)
      dummy.position.copy(p)
      dummy.scale.setScalar(0.04 + 0.02 * s)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, positions.length]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={'#aef0ff'} transparent opacity={0.9} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  )
}

function NetworkBursts({ radius }) {
  const [bursts, setBursts] = useState([])
  useEffect(() => {
    const id = setInterval(() => {
      const lat = THREE.MathUtils.randFloatSpread(160)
      const lon = THREE.MathUtils.randFloatSpread(360)
      const pos = latLonToVec3(radius * 1.001, lat, lon)
      setBursts((b) => [...b, { pos, start: performance.now() }].slice(-12))
    }, 2500)
    return () => clearInterval(id)
  }, [radius])

  return bursts.map((b, i) => <Burst key={i} origin={b.pos} start={b.start} />)
}

function Burst({ origin, start }) {
  const ref = useRef()
  const matRef = useRef()
  useFrame(() => {
    const elapsed = (performance.now() - start) / 1000
    const s = 1 + elapsed * 1.8
    if (ref.current) ref.current.scale.setScalar(s)
    if (matRef.current) matRef.current.opacity = Math.max(0, 0.6 - elapsed * 0.6)
  })
  return (
    <mesh position={origin} ref={ref}>
      <sphereGeometry args={[0.03, 10, 10]} />
      <meshBasicMaterial ref={matRef} color={'#d6fbff'} transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  )
}

export default function HologramEarth() {
  return <RotatingGlobe radius={1.2} />
}





  // <meshStandardMaterial
  //   color="#3fb4ff"
  //   wireframe
  //   transparent
  //   opacity={0.55}
  //   blending={THREE.AdditiveBlending}
  // />   