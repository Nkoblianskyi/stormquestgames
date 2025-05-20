interface AgeRestrictionIconProps {
  size?: number
  className?: string
}

export function AgeRestrictionIcon({ size = 50, className = "" }: AgeRestrictionIconProps) {
  return (
    <div className={className} role="img" aria-label="18+ Aldersgrense">
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#e74c3c" />
        <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" fill="none" />
        <text
          x="50"
          y="55"
          fontFamily="Arial, sans-serif"
          fontSize="36"
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          18+
        </text>
      </svg>
    </div>
  )
}
