"use client"

import { useEffect, useRef, useState } from 'react'

interface Spline3DModelProps {
  className?: string
}

export default function Spline3DModel({ className = "" }: Spline3DModelProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const parallaxTransform = `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0002})`

  return (
    <div 
      ref={containerRef}
      className={`spline-container ${className}`}
      style={{
        transform: parallaxTransform,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <iframe 
        src='https://my.spline.design/genkubgreetingrobot-IKWY7JfOd1I5cHVDwG0vRMer/' 
        frameBorder='0' 
        width='100%' 
        height='100%'
        style={{ border: 'none' }}
        title="3D Robot Model"
      />
    </div>
  )
}
