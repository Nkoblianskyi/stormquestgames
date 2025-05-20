"use client"

import { useEffect, useRef } from "react"

interface FishIconProps {
  size?: number
  isAnimated?: boolean
  className?: string
}

export function FishIcon({ size = 80, isAnimated = true, className = "" }: FishIconProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (isAnimated && svgRef.current) {
      const fish = svgRef.current.querySelector(".fish-body") as SVGElement
      const tail = svgRef.current.querySelector(".fish-tail") as SVGElement
      const fin = svgRef.current.querySelector(".fish-fin") as SVGElement

      const fishAnimation = () => {
        if (fish) {
          fish.animate(
            [
              { transform: "translateX(0)" },
              { transform: "translateX(3px)" },
              { transform: "translateX(0)" },
              { transform: "translateX(-3px)" },
              { transform: "translateX(0)" },
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
              { transform: "rotate(-15deg)", transformOrigin: "40px 50px" },
              { transform: "rotate(0deg)", transformOrigin: "40px 50px" },
              { transform: "rotate(15deg)", transformOrigin: "40px 50px" },
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

      const finAnimation = () => {
        if (fin) {
          fin.animate(
            [
              { transform: "rotate(0deg)", transformOrigin: "60px 30px" },
              { transform: "rotate(10deg)", transformOrigin: "60px 30px" },
              { transform: "rotate(0deg)", transformOrigin: "60px 30px" },
              { transform: "rotate(-5deg)", transformOrigin: "60px 30px" },
              { transform: "rotate(0deg)", transformOrigin: "60px 30px" },
            ],
            {
              duration: 2000,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )
        }
      }

      fishAnimation()
      tailAnimation()
      finAnimation()
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
      <g className="fish-body">
        <ellipse cx="60" cy="50" rx="25" ry="15" fill="#FF9800" />
        <circle cx="75" cy="45" r="3" fill="#263238" />
        <path d="M70 55 Q 75 60, 80 55" stroke="#263238" strokeWidth="1" />
      </g>
      <path
        className="fish-tail"
        d="M35 50 L 25 40 L 15 50 L 25 60 Z"
        fill="#FF9800"
        stroke="#FF7D00"
        strokeWidth="1"
      />
      <path className="fish-fin" d="M60 35 Q 65 25, 70 35" fill="#FF9800" stroke="#FF7D00" strokeWidth="1" />
      <path d="M60 65 Q 65 75, 70 65" fill="#FF9800" stroke="#FF7D00" strokeWidth="1" />
    </svg>
  )
}
