import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Characters() {
  const characters = [
    {
      name: "FISKEN FINN",
      trait: "Nysgjerrig. Fargerik. Eventyrlysten.",
      description:
        "Finn er en livlig og vennlig fisk med en forkjærlighet for å utforske havets hemmeligheter. Med sine raske finner og skarpe øyne kan han navigere gjennom selv de mest komplekse korallrev på jakt etter spennende oppdagelser.",
      image: "/characters/finn.png",
    },
    {
      name: "HAVETS SJØGRESS",
      trait: "Næringsrikt. Livgivende.",
      description:
        "Sjøgresset i havet er ikke bare vakkert, det gir også Finn ekstra energi til å svømme lengre og raskere. Jo mer sjøgress han samler, desto bedre blir hans evner til å utforske nye områder av havet.",
      image: "/characters/seaweed.png",
    },
    {
      name: "SKJELL-SKATTER",
      trait: "Sjeldne. Vakre. Verdifulle.",
      description:
        "Skjellene er havets skjulte skatter. Når Finn finner et skjell, får han spesielle krefter som hjelper ham å oppdage hemmelige stier og skjulte områder i det store, blå havet.",
      image: "/characters/shell.png",
    },
  ]

  return (
    <section className="w-full py-16">
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Undervannsvenner og Skatter</h2>
          <p className="text-muted-foreground">
            Bli med på et spennende undervannseventyr med den nysgjerrige fisken Finn som svømmer gjennom det klare, blå
            havet. Hjelp Finn med å samle sjøgress, reker og skjell mens han navigerer mellom korallrev og andre
            havbeboere.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {characters.map((character, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative aspect-square w-full overflow-hidden bg-muted">
                <Image
                  src={character.image || "/placeholder.svg"}
                  alt={character.name}
                  fill
                  className="object-contain p-8"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle>{character.name}</CardTitle>
                <CardDescription className="text-primary">{character.trait}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{character.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
