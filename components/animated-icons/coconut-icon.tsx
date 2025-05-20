"use client"

import { useEffect, useRef } from "react"

interface CoconutIconProps {
  size?: number
  isAnimated?: boolean
  className?: string
}

export function CoconutIcon({ size = 80, isAnimated = true, className = "" }: CoconutIconProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (isAnimated && svgRef.current) {
      const coconut = svgRef.current.querySelector(".coconut") as SVGElement
      const leaf1 = svgRef.current.querySelector(".leaf-1") as SVGElement
      const leaf2 = svgRef.current.querySelector(".leaf-2") as SVGElement

      const coconutAnimation = () => {
        if (coconut) {
          coconut.animate(
            [{ transform: "translateY(0)" }, { transform: "translateY(-3px)" }, { transform: "translateY(0)" }],
            {
              duration: 2000,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )
        }
      }

      const leafAnimation = () => {
        if (leaf1 && leaf2) {
          leaf1.animate(
            [
              { transform: "rotate(0deg)", transformOrigin: "50px 30px" },
              { transform: "rotate(-5deg)", transformOrigin: "50px 30px" },
              { transform: "rotate(0deg)", transformOrigin: "50px 30px" },
            ],
            {
              duration: 2500,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )

          leaf2.animate(
            [
              { transform: "rotate(0deg)", transformOrigin: "50px 30px" },
              { transform: "rotate(5deg)", transformOrigin: "50px 30px" },
              { transform: "rotate(0deg)", transformOrigin: "50px 30px" },
            ],
            {
              duration: 3000,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )
        }
      }

      coconutAnimation()
      leafAnimation()
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
      <g className="coconut">
        <circle cx="50" cy="60" r="25" fill="#6D4534" />
        <circle cx="50" cy="60" r="20" fill="#8E5B3F" />
        <circle cx="40" cy="50" r="3" fill="#6D4534" />
        <circle cx="50" cy="45" r="3" fill="#6D4534" />
        <circle cx="60" cy="50" r="3" fill="#6D4534" />
      </g>
      <path className="leaf-1" d="M40 30 Q 30 10, 50 5 Q 70 10, 60 30" fill="#2E8B57" />
      <path className="leaf-2" d="M60 30 Q 80 15, 75 5 Q 65 0, 50 30" fill="#2E8B57" />
    </svg>
  )
}
