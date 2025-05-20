"use client"

import { useEffect, useRef } from "react"

interface SatelliteIconProps {
  size?: number
  isAnimated?: boolean
  className?: string
}

export function SatelliteIcon({ size = 80, isAnimated = true, className = "" }: SatelliteIconProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (isAnimated && svgRef.current) {
      const satellite = svgRef.current.querySelector(".satellite-body") as SVGElement
      const panels = svgRef.current.querySelector(".satellite-panels") as SVGElement
      const dish = svgRef.current.querySelector(".satellite-dish") as SVGElement

      const satelliteAnimation = () => {
        if (satellite) {
          satellite.animate(
            [
              { transform: "translateY(0)" },
              { transform: "translateY(-2px)" },
              { transform: "translateY(0)" },
              { transform: "translateY(2px)" },
              { transform: "translateY(0)" },
            ],
            {
              duration: 4000,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )
        }
      }

      const panelsAnimation = () => {
        if (panels) {
          panels.animate(
            [
              { transform: "rotate(0deg)" },
              { transform: "rotate(5deg)" },
              { transform: "rotate(0deg)" },
              { transform: "rotate(-5deg)" },
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

      const dishAnimation = () => {
        if (dish) {
          dish.animate(
            [
              { transform: "rotate(0deg)" },
              { transform: "rotate(10deg)" },
              { transform: "rotate(0deg)" },
              { transform: "rotate(-10deg)" },
              { transform: "rotate(0deg)" },
            ],
            {
              duration: 3000,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )
        }
      }

      satelliteAnimation()
      panelsAnimation()
      dishAnimation()
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
      <g className="satellite-body">
        {/* Main Body */}
        <rect x="40" y="40" width="20" height="30" fill="#9E9E9E" stroke="#616161" strokeWidth="2" />
        {/* Antenna */}
        <line x1="50" y1="30" x2="50" y2="40" stroke="#616161" strokeWidth="2" />
        <circle cx="50" cy="28" r="3" fill="#E0E0E0" stroke="#616161" strokeWidth="1" />
      </g>
      {/* Solar Panels */}
      <g className="satellite-panels">
        <rect x="10" y="45" width="30" height="15" fill="#2196F3" stroke="#1976D2" strokeWidth="1" />
        <rect x="60" y="45" width="30" height="15" fill="#2196F3" stroke="#1976D2" strokeWidth="1" />
      </g>
      {/* Satellite Dish */}
      <g className="satellite-dish">
        <path d="M55 50 C 65 40, 70 45, 65 55" fill="#E0E0E0" stroke="#9E9E9E" strokeWidth="1" />
      </g>
    </svg>
  )
}
