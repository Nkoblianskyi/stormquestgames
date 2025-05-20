"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Trophy, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

// Definer spillobjektene
const gameItems = [
  { id: "apple", name: "Eple", points: 10, color: "bg-red-500", emoji: "🍎" },
  { id: "banana", name: "Banan", points: 15, color: "bg-yellow-400", emoji: "🍌" },
  { id: "orange", name: "Appelsin", points: 20, color: "bg-orange-500", emoji: "🍊" },
  { id: "grapes", name: "Druer", points: 25, color: "bg-purple-500", emoji: "🍇" },
  { id: "watermelon", name: "Vannmelon", points: 30, color: "bg-green-500", emoji: "🍉" },
  { id: "star", name: "Stjerne", points: 50, color: "bg-yellow-300", emoji: "⭐" },
  { id: "heart", name: "Hjerte", points: 75, color: "bg-red-400", emoji: "❤️" },
  {
    id: "rainbow",
    name: "Regnbue",
    points: 100,
    color: "bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500",
    emoji: "🌈",
  },
]

interface MixResult {
  item: (typeof gameItems)[0]
  timestamp: number
}

export function ObjectMixer() {
  const [isMixing, setIsMixing] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [mixResults, setMixResults] = useState<MixResult[]>([])
  const [currentItems, setCurrentItems] = useState<(typeof gameItems)[0][]>([])
  const [mixSpeed, setMixSpeed] = useState(100) // ms between item changes
  const [mixEnergy, setMixEnergy] = useState(100)
  const [gameStarted, setGameStarted] = useState(false)

  const mixInterval = useRef<NodeJS.Timeout | null>(null)
  const mixDuration = useRef(3000) // Total mix time in ms
  const mixStartTime = useRef(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])

  // Initialize game
  useEffect(() => {
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem("objectMixerHighScore")
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore))
    }

    // Initialize with random items
    setCurrentItems([getRandomItem(), getRandomItem(), getRandomItem()])

    return () => {
      if (mixInterval.current) {
        clearInterval(mixInterval.current)
      }
    }
  }, [])

  // Get a random item from the gameItems array
  const getRandomItem = () => {
    return gameItems[Math.floor(Math.random() * gameItems.length)]
  }

  // Start mixing
  const startMix = () => {
    if (isMixing || mixEnergy <= 0) return

    setGameStarted(true)
    setIsMixing(true)
    mixStartTime.current = Date.now()

    // Decrease energy
    setMixEnergy((prev) => Math.max(0, prev - 10))

    // Clear any existing interval
    if (mixInterval.current) {
      clearInterval(mixInterval.current)
    }

    // Start the mixing interval
    mixInterval.current = setInterval(() => {
      // Update items rapidly during mix
      setCurrentItems([getRandomItem(), getRandomItem(), getRandomItem()])

      // Check if mix should end
      const elapsedTime = Date.now() - mixStartTime.current
      if (elapsedTime >= mixDuration.current) {
        endMix()
      }
    }, mixSpeed)
  }

  // End mixing and calculate results
  const endMix = () => {
    if (mixInterval.current) {
      clearInterval(mixInterval.current)
      mixInterval.current = null
    }

    // Generate final result
    const finalItems = [getRandomItem(), getRandomItem(), getRandomItem()]
    setCurrentItems(finalItems)
    setIsMixing(false)

    // Calculate points
    let pointsEarned = 0

    // Check for matches
    const itemCounts: Record<string, number> = {}
    finalItems.forEach((item) => {
      itemCounts[item.id] = (itemCounts[item.id] || 0) + 1
    })

    // Award points based on matches
    Object.entries(itemCounts).forEach(([itemId, count]) => {
      if (count >= 2) {
        const item = gameItems.find((i) => i.id === itemId)
        if (item) {
          // Double points for 2 matches, triple for 3 matches
          const multiplier = count === 3 ? 3 : 1.5
          pointsEarned += Math.round(item.points * multiplier)
        }
      }
    })

    // If no matches, award points for highest value item
    if (pointsEarned === 0) {
      const highestItem = finalItems.reduce((prev, current) => (prev.points > current.points ? prev : current))
      pointsEarned = Math.round(highestItem.points * 0.5) // Half points for no match
    }

    // Add points to score
    setScore((prev) => {
      const newScore = prev + pointsEarned

      // Update high score if needed
      if (newScore > highScore) {
        setHighScore(newScore)
        localStorage.setItem("objectMixerHighScore", newScore.toString())
      }

      // Level up every 200 points
      if (Math.floor(prev / 200) < Math.floor(newScore / 200)) {
        setLevel((prevLevel) => prevLevel + 1)
        // Refill some energy on level up
        setMixEnergy((prev) => Math.min(100, prev + 30))
      }

      return newScore
    })

    // Add to results history
    const result = {
      item: finalItems[1], // Center item
      timestamp: Date.now(),
    }
    setMixResults((prev) => [result, ...prev].slice(0, 5))

    // Regenerate some energy over time
    setTimeout(() => {
      setMixEnergy((prev) => Math.min(100, prev + 5))
    }, 3000)
  }

  // Reset game
  const resetGame = () => {
    setScore(0)
    setLevel(1)
    setMixEnergy(100)
    setMixResults([])
    setGameStarted(false)
    setCurrentItems([getRandomItem(), getRandomItem(), getRandomItem()])
  }

  return (
    <Card className="w-full">
      <CardHeader className="bg-primary/5">
        <div className="flex items-center justify-between">
          <CardTitle>Figurmiksen</CardTitle>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <Star className="h-3 w-3" /> Nivå {level}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Trophy className="h-3 w-3" /> Poeng {score}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6 flex justify-between">
          <div>
            <p className="text-sm font-medium">Høyeste poengsum: {highScore}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Energi: {mixEnergy}%</p>
            <div className="mt-1 h-2 w-32 rounded-full bg-gray-200">
              <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${mixEnergy}%` }}></div>
            </div>
          </div>
        </div>

        {/* Mixer display */}
        <div className="mb-8 rounded-lg bg-gradient-to-b from-gray-800 to-gray-900 p-6">
          <div className="flex justify-center gap-4">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                className={cn(
                  "flex h-24 w-24 items-center justify-center rounded-lg border-2 border-gray-600 text-4xl shadow-inner transition-all",
                  isMixing ? "animate-pulse bg-gray-700" : "bg-gray-700",
                )}
              >
                <div
                  className={cn(
                    "flex h-20 w-20 items-center justify-center rounded-md transition-all",
                    currentItems[index]?.color || "bg-gray-600",
                    isMixing && "animate-spin",
                  )}
                >
                  {currentItems[index]?.emoji}
                </div>
              </div>
            ))}
          </div>

          {/* Mix button */}
          <div className="mt-6 flex justify-center">
            <Button
              size="lg"
              disabled={isMixing || mixEnergy <= 0}
              onClick={startMix}
              className="relative h-16 w-40 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-lg font-bold text-white shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
            >
              {isMixing ? (
                <span className="flex items-center gap-2">
                  <Zap className="h-5 w-5 animate-pulse" />
                  Mikser...
                </span>
              ) : mixEnergy <= 0 ? (
                "Ingen energi"
              ) : (
                "MIKS!"
              )}

              <span className="absolute -bottom-1 left-0 right-0 h-1 animate-pulse rounded-full bg-white/30"></span>
            </Button>
          </div>
        </div>

        {/* Results and info */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-medium">Siste resultater</h3>
            {mixResults.length > 0 ? (
              <div className="space-y-2">
                {mixResults.map((result, index) => (
                  <div key={index} className="flex items-center gap-2 rounded-md bg-muted p-2">
                    <div className={cn("flex h-8 w-8 items-center justify-center rounded-md", result.item.color)}>
                      {result.item.emoji}
                    </div>
                    <span>
                      {result.item.name} ({result.item.points} poeng)
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Ingen resultater ennå. Trykk på MIKS-knappen for å starte!
              </p>
            )}
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium">Objekter og poeng</h3>
            <div className="grid grid-cols-2 gap-2">
              {gameItems.map((item) => (
                <div key={item.id} className="flex items-center gap-2 rounded-md bg-muted p-2">
                  <div className={cn("flex h-8 w-8 items-center justify-center rounded-md", item.color)}>
                    {item.emoji}
                  </div>
                  <span className="text-sm">
                    {item.name}: {item.points}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-muted/30 p-4">
        <div className="text-sm">
          <p>Trykk på MIKS-knappen for å mikse objektene!</p>
          <p className="text-muted-foreground">
            Få like objekter for å tjene flere poeng. Energi regenereres over tid.
          </p>
        </div>
        {gameStarted && (
          <Button variant="outline" onClick={resetGame}>
            Start på nytt
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
