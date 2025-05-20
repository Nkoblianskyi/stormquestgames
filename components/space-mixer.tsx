"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Trophy, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { RocketIcon } from "@/components/animated-icons/rocket-icon"
import { SpaceshipIcon } from "@/components/animated-icons/spaceship-icon"
import { SatelliteIcon } from "@/components/animated-icons/satellite-icon"
import { SpaceStationIcon } from "@/components/animated-icons/space-station-icon"
import { ShuttleIcon } from "@/components/animated-icons/shuttle-icon"

// Definer romfartøyene
const spaceVehicles = [
  { id: "rocket", name: "Rakett", points: 10, component: RocketIcon },
  { id: "spaceship", name: "Romskip", points: 15, component: SpaceshipIcon },
  { id: "satellite", name: "Satellitt", points: 20, component: SatelliteIcon },
  { id: "station", name: "Romstasjon", points: 25, component: SpaceStationIcon },
  { id: "shuttle", name: "Romferge", points: 30, component: ShuttleIcon },
  { id: "star", name: "Stjerne", points: 50, component: Star },
]

interface MixResult {
  item: (typeof spaceVehicles)[0]
  timestamp: number
}

export function SpaceMixer() {
  const [isExploring, setIsExploring] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [mixResults, setMixResults] = useState<MixResult[]>([])
  const [currentItems, setCurrentItems] = useState<(typeof spaceVehicles)[0][]>([])
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
    const savedHighScore = localStorage.getItem("spaceMixerHighScore")
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

  // Get a random item from the spaceVehicles array
  const getRandomItem = () => {
    return spaceVehicles[Math.floor(Math.random() * spaceVehicles.length)]
  }

  // Start mixing
  const startExploration = () => {
    if (isExploring || mixEnergy <= 0) return

    setGameStarted(true)
    setIsExploring(true)
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
        endExploration()
      }
    }, mixSpeed)
  }

  // End mixing and calculate results
  const endExploration = () => {
    if (mixInterval.current) {
      clearInterval(mixInterval.current)
      mixInterval.current = null
    }

    // Generate final result
    const finalItems = [getRandomItem(), getRandomItem(), getRandomItem()]
    setCurrentItems(finalItems)
    setIsExploring(false)

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
        const item = spaceVehicles.find((i) => i.id === itemId)
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
        localStorage.setItem("spaceMixerHighScore", newScore.toString())
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

  // Render a space vehicle
  const renderSpaceVehicle = (item: (typeof spaceVehicles)[0], isMatching = false) => {
    if (item.id === "star") {
      return <Star className={cn("h-12 w-12 text-yellow-400", isMatching && "animate-pulse")} />
    }

    const IconComponent = item.component
    return (
      <IconComponent
        size={60}
        isAnimated={!isExploring && isMatching}
        className={isMatching ? "matching-vehicle" : ""}
      />
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="bg-primary/5">
        <div className="flex items-center justify-between">
          <CardTitle>Romutforskeren</CardTitle>
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
        <div className="mb-8 rounded-lg bg-gradient-to-b from-gray-900 to-blue-900 p-6">
          <div className="flex justify-center gap-4">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                className={cn(
                  "flex h-24 w-24 items-center justify-center rounded-lg border-2 border-blue-600 text-4xl shadow-inner transition-all",
                  isExploring ? "animate-pulse bg-blue-800/50" : "bg-blue-800/30",
                )}
              >
                <div
                  className={cn(
                    "flex h-20 w-20 items-center justify-center rounded-md transition-all",
                    isExploring && "animate-spin",
                  )}
                >
                  {currentItems[index] && renderSpaceVehicle(currentItems[index])}
                </div>
              </div>
            ))}
          </div>

          {/* Mix button */}
          <div className="mt-6 flex justify-center">
            <Button
              size="lg"
              disabled={isExploring || mixEnergy <= 0}
              onClick={startExploration}
              className="relative h-16 w-40 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-lg font-bold text-white shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
            >
              {isExploring ? (
                <span className="flex items-center gap-2">
                  <Zap className="h-5 w-5 animate-pulse" />
                  Utforsker...
                </span>
              ) : mixEnergy <= 0 ? (
                "Ingen energi"
              ) : (
                "UTFORSK!"
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
                    <div className="flex h-10 w-10 items-center justify-center">
                      {renderSpaceVehicle(result.item, true)}
                    </div>
                    <span>
                      {result.item.name} ({result.item.points} poeng)
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Ingen resultater ennå. Trykk på UTFORSK-knappen for å starte!
              </p>
            )}
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium">Romfartøy og poeng</h3>
            <div className="grid grid-cols-2 gap-2">
              {spaceVehicles.map((item) => (
                <div key={item.id} className="flex items-center gap-2 rounded-md bg-muted p-2">
                  <div className="flex h-10 w-10 items-center justify-center">
                    {item.id === "star" ? <Star className="h-6 w-6 text-yellow-400" /> : <item.component size={30} />}
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
          <p>Trykk på UTFORSK-knappen for å utforske verdensrommet!</p>
          <p className="text-muted-foreground">
            Opplev spennende romfenomener og samle poeng. Energi regenereres over tid.
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
