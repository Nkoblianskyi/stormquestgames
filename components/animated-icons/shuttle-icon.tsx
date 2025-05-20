"use client"

import { useEffect, useRef } from "react"

interface ShuttleIconProps {
  size?: number
  isAnimated?: boolean
  className?: string
}

export function ShuttleIcon({ size = 80, isAnimated = true, className = "" }: ShuttleIconProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (isAnimated && svgRef.current) {
      const shuttle = svgRef.current.querySelector(".shuttle-body") as SVGElement
      const flames = svgRef.current.querySelector(".shuttle-flames") as SVGElement
      const windows = svgRef.current.querySelector(".shuttle-windows") as SVGElement

      const shuttleAnimation = () => {
        if (shuttle) {
          shuttle.animate(
            [
              { transform: "translateY(0) rotate(0deg)" },
              { transform: "translateY(-2px) rotate(-1deg)" },
              { transform: "translateY(0) rotate(0deg)" },
              { transform: "translateY(2px) rotate(1deg)" },
              { transform: "translateY(0) rotate(0deg)" },
            ],
            {
              duration: 3000,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )
        }
      }

      const flamesAnimation = () => {
        if (flames) {
          flames.animate(
            [
              { opacity: 0.7, transform: "scaleY(0.8)" },
              { opacity: 1, transform: "scaleY(1.2)" },
              { opacity: 0.7, transform: "scaleY(0.8)" },
            ],
            {
              duration: 600,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )
        }
      }

      const windowsAnimation = () => {
        if (windows) {
          windows.animate([{ opacity: 0.7 }, { opacity: 1 }, { opacity: 0.7 }], {
            duration: 2000,
            iterations: Number.POSITIVE_INFINITY,
            easing: "ease-in-out",
          })
        }
      }

      shuttleAnimation()
      flamesAnimation()
      windowsAnimation()
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
      <g className="shuttle-body">
        {/* Main Body */}
        <path d="M30 40 L50 20 L70 40 L70 60 L30 60 Z" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="2" />
        {/* Wings */}
        <path d="M20 60 L30 50 L30 60 L20 70 Z" fill="#CFD8DC" stroke="#B0BEC5" strokeWidth="1" />
        <path d="M80 60 L70 50 L70 60 L80 70 Z" fill="#CFD8DC" stroke="#B0BEC5" strokeWidth="1" />
        {/* Tail */}
        <path d="M45 40 L55 40 L55 30 L45 30 Z" fill="#CFD8DC" stroke="#B0BEC5" strokeWidth="1" />
      </g>
      {/* Windows */}
      <g className="shuttle-windows">
        <circle cx="40" cy="45" r="3" fill="#29B6F6" stroke="#0288D1" strokeWidth="0.5" />
        <circle cx="50" cy="45" r="3" fill="#29B6F6" stroke="#0288D1" strokeWidth="0.5" />
        <circle cx="60" cy="45" r="3" fill="#29B6F6" stroke="#0288D1" strokeWidth="0.5" />
      </g>
      {/* Flames */}
      <g className="shuttle-flames">
        <path d="M40 60 L45 70 L50 60" fill="#FF9800" stroke="#F57C00" strokeWidth="1" />
        <path d="M50 60 L55 70 L60 60" fill="#FF9800" stroke="#F57C00" strokeWidth="1" />
      </g>
    </svg>
  )
}
