"use client"

import { useEffect, useRef } from "react"

interface SpinningAnimationProps {
  size?: number
}

export function SpinningAnimation({ size = 80 }: SpinningAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const symbols = ["🐟", "🦐", "🐚", "🌊"]
    let animationFrame: number
    let position = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw spinning symbols
      for (let i = 0; i < 10; i++) {
        const y = ((i * size) / 3 + position) % (size * 3)
        const symbolIndex = Math.floor((i + Math.floor(position / 20)) % symbols.length)

        ctx.font = `${size / 2}px Arial`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(symbols[symbolIndex], canvas.width / 2, y)
      }

      position += 10
      if (position > 1000) position = 0

      animationFrame = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [size])

  return <canvas ref={canvasRef} width={size} height={size} style={{ width: size, height: size }} />
}
