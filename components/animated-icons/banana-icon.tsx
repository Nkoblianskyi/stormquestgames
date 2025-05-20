"use client"

import { useEffect, useRef } from "react"

interface BananaIconProps {
  size?: number
  isAnimated?: boolean
  className?: string
}

export function BananaIcon({ size = 80, isAnimated = true, className = "" }: BananaIconProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (isAnimated && svgRef.current) {
      const banana = svgRef.current.querySelector(".banana") as SVGElement
      const shine = svgRef.current.querySelector(".shine") as SVGElement

      const bananaAnimation = () => {
        if (banana) {
          banana.animate(
            [
              { transform: "rotate(0deg)" },
              { transform: "rotate(5deg)" },
              { transform: "rotate(0deg)" },
              { transform: "rotate(-5deg)" },
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

      const shineAnimation = () => {
        if (shine) {
          shine.animate([{ opacity: 0.2 }, { opacity: 0.8 }, { opacity: 0.2 }], {
            duration: 2000,
            iterations: Number.POSITIVE_INFINITY,
            easing: "ease-in-out",
          })
        }
      }

      bananaAnimation()
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
      <g className="banana">
        <path
          d="M30 70 C 10 50, 20 20, 50 20 C 80 20, 90 50, 70 70 C 60 80, 40 80, 30 70Z"
          fill="#FFE135"
          stroke="#E6C619"
          strokeWidth="2"
        />
        <path
          d="M35 65 C 20 50, 25 25, 50 25 C 75 25, 85 50, 65 65 C 55 75, 45 75, 35 65Z"
          fill="#FFF394"
          className="shine"
        />
        <path d="M30 20 C 35 15, 45 15, 50 20" stroke="#8E5B3F" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  )
}
