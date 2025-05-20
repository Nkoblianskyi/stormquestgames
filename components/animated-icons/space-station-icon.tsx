"use client"

import { useEffect, useRef } from "react"

interface SpaceStationIconProps {
  size?: number
  isAnimated?: boolean
  className?: string
}

export function SpaceStationIcon({ size = 80, isAnimated = true, className = "" }: SpaceStationIconProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (isAnimated && svgRef.current) {
      const station = svgRef.current.querySelector(".station-body") as SVGElement
      const panels = svgRef.current.querySelector(".station-panels") as SVGElement
      const lights = svgRef.current.querySelector(".station-lights") as SVGElement

      const stationAnimation = () => {
        if (station) {
          station.animate(
            [
              { transform: "translateY(0)" },
              { transform: "translateY(-2px)" },
              { transform: "translateY(0)" },
              { transform: "translateY(2px)" },
              { transform: "translateY(0)" },
            ],
            {
              duration: 6000,
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
              { transform: "rotate(3deg)" },
              { transform: "rotate(0deg)" },
              { transform: "rotate(-3deg)" },
              { transform: "rotate(0deg)" },
            ],
            {
              duration: 8000,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )
        }
      }

      const lightsAnimation = () => {
        if (lights) {
          lights.animate([{ opacity: 0.5 }, { opacity: 1 }, { opacity: 0.5 }], {
            duration: 2000,
            iterations: Number.POSITIVE_INFINITY,
            easing: "ease-in-out",
          })
        }
      }

      stationAnimation()
      panelsAnimation()
      lightsAnimation()
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
      <g className="station-body">
        {/* Central Module */}
        <circle cx="50" cy="50" r="15" fill="#78909C" stroke="#455A64" strokeWidth="2" />
        {/* Connecting Tubes */}
        <rect x="20" y="48" width="15" height="4" fill="#90A4AE" stroke="#607D8B" strokeWidth="1" />
        <rect x="65" y="48" width="15" height="4" fill="#90A4AE" stroke="#607D8B" strokeWidth="1" />
        {/* Side Modules */}
        <circle cx="15" cy="50" r="8" fill="#78909C" stroke="#455A64" strokeWidth="1" />
        <circle cx="85" cy="50" r="8" fill="#78909C" stroke="#455A64" strokeWidth="1" />
      </g>
      {/* Solar Panels */}
      <g className="station-panels">
        <rect x="40" y="15" width="20" height="10" fill="#2196F3" stroke="#1976D2" strokeWidth="1" />
        <rect x="40" y="75" width="20" height="10" fill="#2196F3" stroke="#1976D2" strokeWidth="1" />
      </g>
      {/* Station Lights */}
      <g className="station-lights">
        <circle cx="50" cy="50" r="3" fill="#FFEB3B" stroke="#FBC02D" strokeWidth="0.5" />
        <circle cx="15" cy="50" r="2" fill="#FFEB3B" stroke="#FBC02D" strokeWidth="0.5" />
        <circle cx="85" cy="50" r="2" fill="#FFEB3B" stroke="#FBC02D" strokeWidth="0.5" />
      </g>
    </svg>
  )
}
