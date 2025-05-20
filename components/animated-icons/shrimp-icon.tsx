"use client"

import { useEffect, useRef } from "react"

interface ShrimpIconProps {
  size?: number
  isAnimated?: boolean
  className?: string
}

export function ShrimpIcon({ size = 80, isAnimated = true, className = "" }: ShrimpIconProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (isAnimated && svgRef.current) {
      const body = svgRef.current.querySelector(".shrimp-body") as SVGElement
      const tail = svgRef.current.querySelector(".shrimp-tail") as SVGElement
      const legs = svgRef.current.querySelector(".shrimp-legs") as SVGElement

      const bodyAnimation = () => {
        if (body) {
          body.animate(
            [
              { transform: "translateY(0)" },
              { transform: "translateY(-2px)" },
              { transform: "translateY(0)" },
              { transform: "translateY(2px)" },
              { transform: "translateY(0)" },
            ],
            {
              duration: 3000,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )
        }
      }

      const tailAnimation = () => {
        if (tail) {
          tail.animate(
            [
              { transform: "rotate(0deg)", transformOrigin: "40px 50px" },
              { transform: "rotate(-10deg)", transformOrigin: "40px 50px" },
              { transform: "rotate(0deg)", transformOrigin: "40px 50px" },
              { transform: "rotate(10deg)", transformOrigin: "40px 50px" },
              { transform: "rotate(0deg)", transformOrigin: "40px 50px" },
            ],
            {
              duration: 1500,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )
        }
      }

      const legsAnimation = () => {
        if (legs) {
          legs.animate(
            [
              { transform: "translateY(0)" },
              { transform: "translateY(1px)" },
              { transform: "translateY(0)" },
              { transform: "translateY(-1px)" },
              { transform: "translateY(0)" },
            ],
            {
              duration: 1000,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )
        }
      }

      bodyAnimation()
      tailAnimation()
      legsAnimation()
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
      <g className="shrimp-body">
        <path d="M60 40 C 70 40, 80 50, 70 60 C 60 70, 40 70, 30 60" fill="#FF5252" stroke="#D32F2F" strokeWidth="2" />
        <circle cx="75" cy="45" r="3" fill="#263238" />
      </g>
      <path
        className="shrimp-tail"
        d="M30 60 C 20 60, 10 50, 20 40 C 30 30, 40 40, 30 60 Z"
        fill="#FF5252"
        stroke="#D32F2F"
        strokeWidth="2"
      />
      <g className="shrimp-legs">
        <path d="M50 65 L 50 75" stroke="#D32F2F" strokeWidth="2" />
        <path d="M55 65 L 55 75" stroke="#D32F2F" strokeWidth="2" />
        <path d="M60 65 L 60 75" stroke="#D32F2F" strokeWidth="2" />
        <path d="M65 60 L 65 70" stroke="#D32F2F" strokeWidth="2" />
        <path d="M45 65 L 45 75" stroke="#D32F2F" strokeWidth="2" />
      </g>
    </svg>
  )
}
