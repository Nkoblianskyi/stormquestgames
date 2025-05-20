import { Card, CardContent } from "@/components/ui/card"
import { Compass, Star, Backpack, Trophy } from "lucide-react"

interface GameStatsProps {
  score: number
  level: number
  inventory: number
}

export function GameStats({ score, level, inventory }: GameStatsProps) {
  const stats = [
    {
      name: "Utforskningspoeng",
      value: score,
      icon: <Compass className="h-4 w-4 text-blue-500" />,
    },
    {
      name: "Nivå",
      value: level,
      icon: <Star className="h-4 w-4 text-yellow-500" />,
    },
    {
      name: "Gjenstander",
      value: inventory,
      icon: <Backpack className="h-4 w-4 text-green-500" />,
    },
    {
      name: "Prestasjoner",
      value: Math.floor(level / 2),
      icon: <Trophy className="h-4 w-4 text-purple-500" />,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">{stat.icon}</div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-lg bg-muted p-4">
        <h4 className="mb-2 font-medium">Spillfremgang</h4>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Neste nivå:</span> {level + 1}
          </p>
          <p>
            <span className="font-medium">Utforsket områder:</span> {Math.min(level * 2, 10)} av 10
          </p>
          <p>
            <span className="font-medium">Spilletid:</span> 00:45:12
          </p>
        </div>
      </div>
    </div>
  )
}
