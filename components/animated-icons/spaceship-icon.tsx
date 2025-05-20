"use client"

import { useEffect, useRef } from "react"

interface SpaceshipIconProps {
  size?: number
  isAnimated?: boolean
  className?: string
}

export function SpaceshipIcon({ size = 80, isAnimated = true, className = "" }: SpaceshipIconProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (isAnimated && svgRef.current) {
      const ship = svgRef.current.querySelector(".spaceship-body") as SVGElement
      const lights = svgRef.current.querySelector(".spaceship-lights") as SVGElement
      const engines = svgRef.current.querySelector(".spaceship-engines") as SVGElement

      const shipAnimation = () => {
        if (ship) {
          ship.animate(
            [{ transform: "rotate(-2deg)" }, { transform: "rotate(2deg)" }, { transform: "rotate(-2deg)" }],
            {
              duration: 3000,
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

      const enginesAnimation = () => {
        if (engines) {
          engines.animate(
            [
              { opacity: 0.7, transform: "scaleX(0.9)" },
              { opacity: 1, transform: "scaleX(1.1)" },
              { opacity: 0.7, transform: "scaleX(0.9)" },
            ],
            {
              duration: 800,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )
        }
      }

      shipAnimation()
      lightsAnimation()
      enginesAnimation()
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
      <g className="spaceship-body">
        {/* Main Body */}
        <ellipse cx="50" cy="50" rx="30" ry="15" fill="#455A64" stroke="#263238" strokeWidth="2" />
        {/* Top Dome */}
        <ellipse cx="50" cy="45" rx="15" ry="10" fill="#78909C" stroke="#455A64" strokeWidth="1" />
        {/* Cockpit Window */}
        <ellipse cx="50" cy="42" rx="8" ry="5" fill="#29B6F6" stroke="#0288D1" strokeWidth="1" />
        {/* Wings */}
        <path d="M20 55 L10 65 L25 60 Z" fill="#546E7A" stroke="#455A64" strokeWidth="1" />
        <path d="M80 55 L90 65 L75 60 Z" fill="#546E7A" stroke="#455A64" strokeWidth="1" />
      </g>
      {/* Lights */}
      <g className="spaceship-lights">
        <circle cx="30" cy="50" r="2" fill="#F44336" />
        <circle cx="70" cy="50" r="2" fill="#4CAF50" />
        <circle cx="50" cy="35" r="2" fill="#FFEB3B" />
      </g>
      {/* Engines */}
      <g className="spaceship-engines">
        <rect x="35" y="60" width="10" height="5" fill="#FF9800" stroke="#F57C00" strokeWidth="1" />
        <rect x="55" y="60" width="10" height="5" fill="#FF9800" stroke="#F57C00" strokeWidth="1" />
      </g>
    </svg>
  )
}
