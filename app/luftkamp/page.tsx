import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { SpaceMixer } from "@/components/space-mixer"
import { Disclaimer } from "@/components/disclaimer"

export const metadata: Metadata = {
  title: "Romutforskeren - StormQuest Games",
  description: "Spill Romutforskeren - en sosial underholdningsplattform.",
}

export default function GamePage() {
  return (
    <main className="container py-8">
      <div className="mb-6 flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Tilbake til forsiden</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold md:text-3xl">Romutforskeren</h1>
      </div>

      <Disclaimer className="mb-6" />

      <div className="mx-auto max-w-4xl">
        <SpaceMixer />
      </div>

      <div className="mt-8">
        <Disclaimer type="bottom" />
      </div>
    </main>
  )
}
