import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Waves } from "@/components/waves"

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-blue-900 to-indigo-900 pb-16 pt-24 text-primary-foreground">
      <div className="container relative z-10 flex flex-col items-center text-center">
        <h1 className="animate-fade-up text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          STORMQUEST
        </h1>
        <p className="animate-fade-up text-xl font-medium opacity-90 sm:text-2xl md:text-3xl [animation-delay:200ms]">
          Romutforskeren
        </p>
        <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-lg opacity-80 [animation-delay:400ms]">
          Styr romskipet ditt gjennom det uendelige verdensrommet, opplev fascinerende romfenomener dette morsomme og engasjerende spillet.
        </p>
        <div className="mt-8 animate-fade-up rounded-lg bg-primary-foreground/10 px-4 py-2 text-sm [animation-delay:800ms]">
          <p className="font-medium">KUN FOR UNDERHOLDNING - Ingen ekte penger, ingen premier</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <Waves />
      </div>

      <div className="absolute left-0 top-0 -z-10 h-full w-full">
        <div className="absolute left-1/4 top-1/4 h-32 w-32 animate-float rounded-full bg-white/10 [animation-delay:0s]"></div>
        <div className="absolute left-3/4 top-1/2 h-24 w-24 animate-float rounded-full bg-white/10 [animation-delay:1s]"></div>
        <div className="absolute left-1/2 top-1/3 h-40 w-40 animate-float rounded-full bg-white/10 [animation-delay:2s]"></div>
        <div className="absolute left-1/5 top-2/3 h-20 w-20 animate-float rounded-full bg-white/10 [animation-delay:3s]"></div>
        <div className="absolute left-4/5 top-1/4 h-28 w-28 animate-float rounded-full bg-white/10 [animation-delay:4s]"></div>
      </div>
    </section>
  )
}
