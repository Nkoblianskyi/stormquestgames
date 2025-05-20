import { cn } from "@/lib/utils"
import { AlertTriangle } from "lucide-react"

interface DisclaimerProps {
  type?: "top" | "bottom" | "inline"
  className?: string
}

export function Disclaimer({ type = "inline", className }: DisclaimerProps) {
  return (
    <div
      className={cn(
        "bg-blue-50 px-4 py-3 text-sm text-blue-900",
        type === "top" && "sticky top-0 z-50 border-b border-blue-100",
        type === "bottom" && "mt-8 rounded-lg",
        className,
      )}
      role="alert"
      aria-label="Viktig informasjon om at dette ikke er pengespill"
    >
      <div className="container flex items-start gap-2">
        {type !== "inline" && <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />}
        <p className="text-pretty">
          <strong>VIKTIG INFORMASJON:</strong> StormQuest Games er kun en sosial spillplattform for
          underholdningsformål. Ingen ekte penger er involvert, ingen premier eller belønninger, og ingen virtuelle
          gjenstander har noen reell verdi. Dette er IKKE pengespill. Du må være 18 år eller eldre for å bruke denne
          plattformen. Hvis det slutter å være gøy, ta et skritt tilbake. Du kan også besøke hjelpesider som{" "}
          <a
            href="https://hjelpelinjen.no"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-700 underline hover:text-blue-900"
          >
            Hjelpelinjen.no
          </a>
          ,{" "}
          <a
            href="https://gamcare.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-700 underline hover:text-blue-900"
          >
            GamCare
          </a>{" "}
          eller{" "}
          <a
            href="https://www.gambleaware.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-700 underline hover:text-blue-900"
          >
            GambleAware
          </a>{" "}
          for støtte og råd.
        </p>
      </div>
    </div>
  )
}
