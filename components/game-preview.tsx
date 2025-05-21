import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

export function GamePreview() {
  const features = [
    "Morsomt og enkelt gameplay",
    "Utforsk verdensrommet med romskipet ditt",
    "Samle poeng basert på resultater",
    "Få bonuspoeng for like romfartøy",
    "Stigende vanskelighetsgrad",
    "Ingen ekte penger involvert",
  ]

  return (
    <section className="w-full py-16">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Romutforskeren</h2>
            <p className="mb-6 text-muted-foreground">
              Bli med på en spennende romferd! Styr romskipet ditt gjennom verdensrommet, utforsk fascinerende
              romfenomener og samle poeng på din reise.
            </p>

            <ul className="mb-8 space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-4 w-4" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Card className="overflow-hidden border-none shadow-xl">
            <CardContent className="p-0">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image
                  src="/space-mixer-preview.png"
                  alt="Romfartøymiksen spillskjermbilde"
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
