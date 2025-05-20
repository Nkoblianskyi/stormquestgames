"use client"

import { useEffect, useRef } from "react"

interface ShellIconProps {
  size?: number
  isAnimated?: boolean
  className?: string
}

export function ShellIcon({ size = 80, isAnimated = true, className = "" }: ShellIconProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (isAnimated && svgRef.current) {
      const shell = svgRef.current.querySelector(".shell") as SVGElement
      const shine = svgRef.current.querySelector(".shell-shine") as SVGElement

      const shellAnimation = () => {
        if (shell) {
          shell.animate(
            [
              { transform: "rotate(0deg)" },
              { transform: "rotate(3deg)" },
              { transform: "rotate(0deg)" },
              { transform: "rotate(-3deg)" },
              { transform: "rotate(0deg)" },
            ],
            {
              duration: 5000,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )
        }
      }

      const shineAnimation = () => {
        if (shine) {
          shine.animate([{ opacity: 0.2 }, { opacity: 0.8 }, { opacity: 0.2 }], {
            duration: 3000,
            iterations: Number.POSITIVE_INFINITY,
            easing: "ease-in-out",
          })
        }
      }

      shellAnimation()
      shineAnimation()
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
      <g className="shell">
        <path
          d="M20 70 C 20 50, 40 30, 80 50 C 80 70, 60 80, 20 70 Z"
          fill="#FFCCBC"
          stroke="#FFAB91"
          strokeWidth="2"
        />
        <path d="M30 68 C 30 55, 45 40, 70 55" stroke="#FFAB91" strokeWidth="2" fill="none" />
        <path d="M40 65 C 40 55, 50 45, 65 58" stroke="#FFAB91" strokeWidth="2" fill="none" />
        <path
          className="shell-shine"
          d="M60 55 C 65 50, 70 55, 65 60 C 60 65, 55 60, 60 55 Z"
          fill="#FFFFFF"
          opacity="0.5"
        />
      </g>
    </svg>
  )
}
