import Link from "next/link"
import { cn } from "@/lib/utils"
import { CloudLightning } from "lucide-react"

interface LogoProps {
  className?: string
  variant?: "dark" | "light"
}

export function Logo({ className, variant = "dark" }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
        <CloudLightning className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className={cn("text-xl font-bold", variant === "light" ? "text-white" : "text-foreground")}>
        StormQuest
      </span>
    </Link>
  )
}
