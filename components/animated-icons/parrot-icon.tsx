"use client"

import { useEffect, useRef } from "react"

interface ParrotIconProps {
  size?: number
  isAnimated?: boolean
  className?: string
}

export function ParrotIcon({ size = 80, isAnimated = true, className = "" }: ParrotIconProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (isAnimated && svgRef.current) {
      const wing = svgRef.current.querySelector(".parrot-wing") as SVGElement
      const head = svgRef.current.querySelector(".parrot-head") as SVGElement

      const wingAnimation = () => {
        if (wing) {
          wing.animate(
            [
              { transform: "rotate(0deg)", transformOrigin: "20px 50px" },
              { transform: "rotate(-15deg)", transformOrigin: "20px 50px" },
              { transform: "rotate(0deg)", transformOrigin: "20px 50px" },
            ],
            {
              duration: 1500,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )
        }
      }

      const headAnimation = () => {
        if (head) {
          head.animate(
            [
              { transform: "rotate(0deg)", transformOrigin: "50px 40px" },
              { transform: "rotate(5deg)", transformOrigin: "50px 40px" },
              { transform: "rotate(0deg)", transformOrigin: "50px 40px" },
              { transform: "rotate(-5deg)", transformOrigin: "50px 40px" },
              { transform: "rotate(0deg)", transformOrigin: "50px 40px" },
            ],
            {
              duration: 2500,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )
        }
      }

      wingAnimation()
      headAnimation()
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
      <g className="parrot-body">
        <ellipse cx="50" cy="60" rx="25" ry="20" fill="#2E8B57" />
        <path className="parrot-wing" d="M20 50 Q 10 70, 30 80 Q 40 70, 20 50Z" fill="#1E5631" />
      </g>
      <g className="parrot-head">
        <circle cx="65" cy="40" r="15" fill="#FF5252" />
        <circle cx="70" cy="35" r="5" fill="white" />
        <circle cx="70" cy="35" r="2" fill="black" />
        <path d="M75 40 L 85 45 L 75 50" fill="#FFD700" stroke="#FFD700" strokeWidth="2" />
        <path d="M50 30 Q 60 20, 70 30" stroke="#FF5252" strokeWidth="4" fill="none" />
      </g>
      <path d="M40 80 L 35 90 M 50 80 L 50 90 M 60 80 L 65 90" stroke="#2E8B57" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
