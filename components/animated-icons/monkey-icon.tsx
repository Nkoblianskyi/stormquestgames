"use client"

import { useEffect, useRef } from "react"

interface MonkeyIconProps {
  size?: number
  isAnimated?: boolean
  className?: string
}

export function MonkeyIcon({ size = 80, isAnimated = true, className = "" }: MonkeyIconProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (isAnimated && svgRef.current) {
      const head = svgRef.current.querySelector(".monkey-head") as SVGElement
      const arm = svgRef.current.querySelector(".monkey-arm") as SVGElement

      const headAnimation = () => {
        if (head) {
          head.animate(
            [
              { transform: "rotate(0deg)" },
              { transform: "rotate(-5deg)" },
              { transform: "rotate(5deg)" },
              { transform: "rotate(0deg)" },
            ],
            {
              duration: 2000,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )
        }
      }

      const armAnimation = () => {
        if (arm) {
          arm.animate(
            [{ transform: "translateY(0)" }, { transform: "translateY(-3px)" }, { transform: "translateY(0)" }],
            {
              duration: 1500,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )
        }
      }

      headAnimation()
      armAnimation()
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
      <circle cx="50" cy="50" r="45" fill="#8E5B3F" />
      <circle cx="50" cy="50" r="35" fill="#A67C52" />
      <circle cx="35" cy="40" r="8" fill="white" className="monkey-eye" />
      <circle cx="65" cy="40" r="8" fill="white" className="monkey-eye" />
      <circle cx="35" cy="40" r="4" fill="black" />
      <circle cx="65" cy="40" r="4" fill="black" />
      <ellipse cx="50" cy="60" rx="10" ry="5" fill="#6D4534" />
      <g className="monkey-head">
        <path d="M30 30 Q 50 15 70 30" stroke="#8E5B3F" strokeWidth="4" fill="none" />
        <circle cx="25" cy="28" r="8" fill="#8E5B3F" />
        <circle cx="75" cy="28" r="8" fill="#8E5B3F" />
      </g>
      <g className="monkey-arm">
        <path d="M20 55 Q 15 65 20 75" stroke="#8E5B3F" strokeWidth="6" fill="none" />
        <path d="M80 55 Q 85 65 80 75" stroke="#8E5B3F" strokeWidth="6" fill="none" />
      </g>
    </svg>
  )
}
