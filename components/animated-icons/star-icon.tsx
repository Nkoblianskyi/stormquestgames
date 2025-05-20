"use client"

import { useEffect, useRef } from "react"

interface StarIconProps {
  size?: number
  isAnimated?: boolean
  className?: string
}

export function StarIcon({ size = 80, isAnimated = true, className = "" }: StarIconProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (isAnimated && svgRef.current) {
      const star = svgRef.current.querySelector(".star") as SVGElement
      const sparkle = svgRef.current.querySelector(".sparkle") as SVGElement

      const starAnimation = () => {
        if (star) {
          star.animate([{ transform: "scale(1)" }, { transform: "scale(1.1)" }, { transform: "scale(1)" }], {
            duration: 2000,
            iterations: Number.POSITIVE_INFINITY,
            easing: "ease-in-out",
          })
        }
      }

      const sparkleAnimation = () => {
        if (sparkle) {
          sparkle.animate([{ opacity: 0.3 }, { opacity: 1 }, { opacity: 0.3 }], {
            duration: 1500,
            iterations: Number.POSITIVE_INFINITY,
            easing: "ease-in-out",
          })
        }
      }

      starAnimation()
      sparkleAnimation()
    }
  }, [isAnimated])

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g className="star">
        <path
          d="M50 10 L 61 38 L 90 40 L 67 60 L 74 90 L 50 75 L 26 90 L 33 60 L 10 40 L 39 38 Z"
          fill="#FFD700"
          stroke="#E6C619"
          strokeWidth="2"
        />
        <path
          className="sparkle"
          d="M50 20 L 55 30 L 65 32 L 57 42 L 60 55 L 50 48 L 40 55 L 43 42 L 35 32 L 45 30 Z"
          fill="#FFFFFF"
          opacity="0.5"
        />
      </g>
    </svg>
  )
}
