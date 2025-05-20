import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Star, Trophy, Sparkles, RefreshCw, Rocket } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: <RefreshCw className="h-10 w-10 text-primary" />,
      title: "Utforsknings-Mekanikk",
      description: "Trykk på UTFORSK-knappen for å sende romskipet ditt på oppdagelsesreise i verdensrommet.",
    },
    {
      icon: <Rocket className="h-10 w-10 text-primary" />,
      title: "Romfenomen-Oppdagelser",
      description: "Opplev et bredt utvalg av fascinerende romfenomener.",
    },
    {
      icon: <Star className="h-10 w-10 text-primary" />,
      title: "Bonuspoeng",
      description: "Opplev sjeldne romfenomene.",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Energisystem",
      description: "Administrer romskipets energi strategisk for å maksimere spillopplevelsen.",
    },
    {
      icon: <Trophy className="h-10 w-10 text-primary" />,
      title: "Nivåsystem",
      description: "Gå opp og lås opp nye romfartøy.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "Spesielle Romfartøy",
      description: "Finn sjeldne romfartøy.",
    },
  ]

  return (
    <section className="w-full bg-muted/50 py-16">
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Romutforskerens Funksjoner</h2>
          <p className="text-muted-foreground">
            Romutforskeren tilbyr en morsom spillopplevelse med enkle kontroller og spennende gameplay.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-md transition-all hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
