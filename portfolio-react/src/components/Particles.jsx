import { useEffect, useRef } from 'react'
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl'

export default function Particles() {
  const containerRef = useRef(null)

  useEffect(() => {
    const renderer = new Renderer({ alpha: true })
    const gl = renderer.gl
    containerRef.current.appendChild(gl.canvas)

    const camera = new Camera(gl, { fov: 15 })
    camera.position.z = 20

    const resize = () => {
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      )
      camera.perspective({
        aspect: gl.canvas.width / gl.canvas.height
      })
    }

    window.addEventListener('resize', resize)
    resize()

    const geometry = new Geometry(gl, {
      position: {
        size: 3,
        data: new Float32Array([
          -1, 0, 0,
           1, 0, 0,
           0, 1, 0
        ])
      }
    })

    const program = new Program(gl, {
      vertex: `
        attribute vec3 position;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 8.0;
        }
      `,
      fragment: `
        precision highp float;
        void main() {
          gl_FragColor = vec4(1.0);
        }
      `
    })

    const mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program })

    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render({ scene: mesh, camera })
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      containerRef.current.removeChild(gl.canvas)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1
      }}
    />
  )
}
