"use client"

import { useEffect, useRef } from "react"

interface RocketIconProps {
  size?: number
  isAnimated?: boolean
  className?: string
}

export function RocketIcon({ size = 80, isAnimated = true, className = "" }: RocketIconProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (isAnimated && svgRef.current) {
      const rocket = svgRef.current.querySelector(".rocket-body") as SVGElement
      const flames = svgRef.current.querySelector(".rocket-flames") as SVGElement
      const window = svgRef.current.querySelector(".rocket-window") as SVGElement

      const rocketAnimation = () => {
        if (rocket) {
          rocket.animate(
            [
              { transform: "translateY(0px)" },
              { transform: "translateY(-3px)" },
              { transform: "translateY(0px)" },
              { transform: "translateY(3px)" },
              { transform: "translateY(0px)" },
            ],
            {
              duration: 2000,
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
              duration: 500,
              iterations: Number.POSITIVE_INFINITY,
              easing: "ease-in-out",
            },
          )
        }
      }

      const windowAnimation = () => {
        if (window) {
          window.animate([{ opacity: 0.7 }, { opacity: 1 }, { opacity: 0.7 }], {
            duration: 1500,
            iterations: Number.POSITIVE_INFINITY,
            easing: "ease-in-out",
          })
        }
      }

      rocketAnimation()
      flamesAnimation()
      windowAnimation()
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
      <g className="rocket-body">
        {/* Rocket Body */}
        <path d="M50 10 L60 40 L60 70 L40 70 L40 40 Z" fill="#E53935" stroke="#B71C1C" strokeWidth="2" />
        {/* Rocket Nose */}
        <path d="M50 10 L40 40 L60 40 Z" fill="#E53935" stroke="#B71C1C" strokeWidth="2" />
        {/* Rocket Fins */}
        <path d="M40 60 L30 80 L40 70 Z" fill="#E53935" stroke="#B71C1C" strokeWidth="2" />
        <path d="M60 60 L70 80 L60 70 Z" fill="#E53935" stroke="#B71C1C" strokeWidth="2" />
        {/* Rocket Window */}
        <circle className="rocket-window" cx="50" cy="45" r="7" fill="#29B6F6" stroke="#0288D1" strokeWidth="1" />
      </g>
      {/* Rocket Flames */}
      <g className="rocket-flames">
        <path d="M45 70 L50 90 L55 70" fill="#FFA000" stroke="#FF6F00" strokeWidth="1" />
        <path d="M47 70 L50 85 L53 70" fill="#FFCA28" stroke="#FFB300" strokeWidth="1" />
      </g>
    </svg>
  )
}
