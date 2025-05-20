import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarIcon } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Marte Hansen",
      avatar: "MH",
      role: "Spiller",
      content:
        "StormQuest er det perfekte spillet for å slappe av etter en lang dag. Jeg elsker å utforske undervannsverden og samle skatter. Det er så avslappende!",
      rating: 5,
    },
    {
      name: "Anders Johansen",
      avatar: "AJ",
      role: "Spiller",
      content:
        "Jeg har spilt mange spill, men StormQuest skiller seg virkelig ut med sin vakre grafikk og avslappende spillopplevelse. Anbefales på det sterkeste!",
      rating: 5,
    },
    {
      name: "Sofie Berg",
      avatar: "SB",
      role: "Spiller",
      content:
        "Dette spillet er perfekt for å koble av. Jeg elsker å svømme rundt med Finn og utforske alle de hemmelige stedene i havet. Fantastisk spill!",
      rating: 4,
    },
  ]

  return (
    <section className="w-full py-16">
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Hva Spillerne Sier</h2>
          <p className="text-muted-foreground">
            Hør hva våre spillere synes om StormQuest og deres opplevelser med spillet.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={`/avatars/${testimonial.avatar.toLowerCase()}.png`} />
                      <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
