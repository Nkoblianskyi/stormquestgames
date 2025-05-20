"use client"

import { useEffect, useRef } from "react"

interface SeaweedIconProps {
  size?: number
  isAnimated?: boolean
  className?: string
}

export function SeaweedIcon({ size = 80, isAnimated = true, className = "" }: SeaweedIconProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (isAnimated && svgRef.current) {
      const seaweed1 = svgRef.current.querySelector(".seaweed-1") as SVGElement
      const seaweed2 = svgRef.current.querySelector(".seaweed-2") as SVGElement
      const seaweed3 = svgRef.current.querySelector(".seaweed-3") as SVGElement

      const seaweed1Animation = () => {
        if (seaweed1) {
          seaweed1.animate(
            [
              { transform: "rotate(0deg)", transformOrigin: "30px 90px" },
              { transform: "rotate(-5deg)", transformOrigin: "30px 90px" },
              { transform: "rotate(0deg)", transformOrigin: "30px 90px" },
              { transform: "rotate(5deg)", transformOrigin: "30px 90px" },
              { transform: "rotate(0deg)", transformOrigin: "30px 90px" },
            ],
            {
              duration: 4000,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )
        }
      }

      const seaweed2Animation = () => {
        if (seaweed2) {
          seaweed2.animate(
            [
              { transform: "rotate(0deg)", transformOrigin: "50px 90px" },
              { transform: "rotate(5deg)", transformOrigin: "50px 90px" },
              { transform: "rotate(0deg)", transformOrigin: "50px 90px" },
              { transform: "rotate(-5deg)", transformOrigin: "50px 90px" },
              { transform: "rotate(0deg)", transformOrigin: "50px 90px" },
            ],
            {
              duration: 5000,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )
        }
      }

      const seaweed3Animation = () => {
        if (seaweed3) {
          seaweed3.animate(
            [
              { transform: "rotate(0deg)", transformOrigin: "70px 90px" },
              { transform: "rotate(-3deg)", transformOrigin: "70px 90px" },
              { transform: "rotate(0deg)", transformOrigin: "70px 90px" },
              { transform: "rotate(3deg)", transformOrigin: "70px 90px" },
              { transform: "rotate(0deg)", transformOrigin: "70px 90px" },
            ],
            {
              duration: 4500,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )
        }
      }

      seaweed1Animation()
      seaweed2Animation()
      seaweed3Animation()
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
      <path
        className="seaweed-1"
        d="M30 90 C 25 80, 35 70, 30 60 C 25 50, 35 40, 30 30 C 25 20, 35 10, 30 0"
        stroke="#00796B"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="seaweed-2"
        d="M50 90 C 45 75, 55 60, 50 45 C 45 30, 55 15, 50 0"
        stroke="#00796B"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="seaweed-3"
        d="M70 90 C 65 80, 75 70, 70 60 C 65 50, 75 40, 70 30 C 65 20, 75 10, 70 0"
        stroke="#00796B"
        strokeWidth="4"
        fill="none"
      />
    </svg>
  )
}
