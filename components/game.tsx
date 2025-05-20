"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { GameBoard } from "@/components/game-board"
import { GameInventory } from "@/components/game-inventory"
import { GameShop } from "@/components/game-shop"
import { GameStats } from "@/components/game-stats"
import { Compass, Sparkles } from "lucide-react"

export function Game() {
  const [score, setScore] = useState(0)
  const [energy, setEnergy] = useState(100)
  const [level, setLevel] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [inventory, setInventory] = useState<string[]>([])
  const energyTimer = useRef<NodeJS.Timeout | null>(null)
  const [xp, setXp] = useState(0)
  const [xpToNextLevel, setXpToNextLevel] = useState(100)

  useEffect(() => {
    return () => {
      if (energyTimer.current) {
        clearInterval(energyTimer.current)
      }
    }
  }, [])

  const startExploration = () => {
    setIsPlaying(true)
    if (energyTimer.current) {
      clearInterval(energyTimer.current)
    }

    energyTimer.current = setInterval(() => {
      setEnergy((prev) => {
        if (prev <= 0) {
          clearInterval(energyTimer.current as NodeJS.Timeout)
          setIsPlaying(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const stopExploration = () => {
    setIsPlaying(false)
    if (energyTimer.current) {
      clearInterval(energyTimer.current)
    }
  }

  const collectItem = (item: string) => {
    setInventory((prev) => [...prev, item])
    setScore((prev) => prev + Math.floor(Math.random() * 10) + 1)
    addXp(Math.floor(Math.random() * 5) + 1)
  }

  const addXp = (amount: number) => {
    setXp((prev) => {
      const newXp = prev + amount
      if (newXp >= xpToNextLevel) {
        setLevel((prevLevel) => prevLevel + 1)
        setXpToNextLevel((prevXpToNextLevel) => Math.floor(prevXpToNextLevel * 1.5))
        return newXp - xpToNextLevel
      }
      return newXp
    })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="overflow-hidden">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Undervannsutforsker</CardTitle>
                <CardDescription>Utforsk havet og samle skatter</CardDescription>
              </div>
              <Badge variant="outline" className="text-sm">
                Nivå {level}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <GameBoard isPlaying={isPlaying} onCollect={collectItem} />
          </CardContent>
          <CardFooter className="flex flex-col gap-4 bg-muted/30 p-4">
            <div className="grid w-full gap-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Energi</div>
                <div className="text-sm text-muted-foreground">{energy}%</div>
              </div>
              <Progress value={energy} className="h-2" />
            </div>

            <div className="grid w-full gap-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">XP</div>
                <div className="text-sm text-muted-foreground">
                  {xp}/{xpToNextLevel}
                </div>
              </div>
              <Progress value={(xp / xpToNextLevel) * 100} className="h-2" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Compass className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Utforskningspoeng: {score}</span>
              </div>

              <div className="flex gap-2">
                {!isPlaying ? (
                  <Button onClick={startExploration} disabled={energy <= 0}>
                    Start Utforskning
                  </Button>
                ) : (
                  <Button variant="destructive" onClick={stopExploration}>
                    Stopp
                  </Button>
                )}

                <Button variant="outline" disabled={isPlaying}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Boost
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Tabs defaultValue="stats">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stats">Statistikk</TabsTrigger>
            <TabsTrigger value="inventory">Inventar</TabsTrigger>
            <TabsTrigger value="shop">Butikk</TabsTrigger>
          </TabsList>
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Spillstatistikk</CardTitle>
                <CardDescription>Din fremgang i spillet</CardDescription>
              </CardHeader>
              <CardContent>
                <GameStats score={score} level={level} inventory={inventory.length} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Inventar</CardTitle>
                <CardDescription>Gjenstander du har samlet</CardDescription>
              </CardHeader>
              <CardContent>
                <GameInventory items={inventory} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="shop">
            <Card>
              <CardHeader>
                <CardTitle>Butikk</CardTitle>
                <CardDescription>Bruk poeng til å kjøpe oppgraderinger</CardDescription>
              </CardHeader>
              <CardContent>
                <GameShop score={score} setScore={setScore} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
