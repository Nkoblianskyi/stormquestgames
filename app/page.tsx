import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { GamePreview } from "@/components/game-preview"
import { About } from "@/components/about"
import { PlayButton } from "@/components/play-button"
import { Disclaimer } from "@/components/disclaimer"
import { GameDescription } from "@/components/game-description"

export default function HomePage() {
  return (
    <main className="flex flex-col items-center">
      <Hero />
      <Features />
      <GamePreview />
      <About />
      <GameDescription />
      <section className="w-full bg-primary/10 py-16">
        <div className="container flex flex-col items-center">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Klar til å starte romreisen?
          </h2>
          <PlayButton />
        </div>
      </section>
      <Disclaimer type="bottom" className="container my-8" />
    </main>
  )
}
