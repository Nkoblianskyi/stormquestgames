export function Waves() {
  return (
    <svg
      className="h-auto w-full"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
    >
      <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
      </defs>
      <g className="waves">
        <use
          xlinkHref="#gentle-wave"
          x="48"
          y="0"
          fill="rgba(255, 255, 255, 0.7)"
          className="animate-wave"
          style={{ animationDelay: "0s", animationDuration: "7s" }}
        />
        <use
          xlinkHref="#gentle-wave"
          x="48"
          y="3"
          fill="rgba(255, 255, 255, 0.5)"
          className="animate-wave"
          style={{ animationDelay: "-2s", animationDuration: "10s" }}
        />
        <use
          xlinkHref="#gentle-wave"
          x="48"
          y="5"
          fill="rgba(255, 255, 255, 0.3)"
          className="animate-wave"
          style={{ animationDelay: "-4s", animationDuration: "13s" }}
        />
        <use
          xlinkHref="#gentle-wave"
          x="48"
          y="7"
          fill="rgba(255, 255, 255, 1)"
          className="animate-wave"
          style={{ animationDelay: "-6s", animationDuration: "16s" }}
        />
      </g>
    </svg>
  )
}
