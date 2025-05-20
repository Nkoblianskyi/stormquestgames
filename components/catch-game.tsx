"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Trophy } from "lucide-react"

interface FallingObject {
  id: string
  x: number
  y: number
  width: number
  height: number
  speed: number
  type: "fruit" | "star" | "heart" | "bomb"
  rotation: number
  rotationSpeed: number
}

export function CatchGame() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [fallingObjects, setFallingObjects] = useState<FallingObject[]>([])
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 })
  const [gameOver, setGameOver] = useState(false)
  const [level, setLevel] = useState(1)
  const [basketWidth, setBasketWidth] = useState(100)

  const gameAreaRef = useRef<HTMLDivElement | null>(null)
  const requestRef = useRef<number | null>(null)
  const lastObjectSpawn = useRef<number>(Date.now())
  const objectSpawnRate = useRef<number>(1000) // ms between object spawns
  const playerRef = useRef<HTMLDivElement>(null)

  // Initialize game
  useEffect(() => {
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem("catchGameHighScore")
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore))
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  // Game loop
  const gameLoop = (timestamp: number) => {
    if (!isPlaying) return

    // Spawn falling objects
    const now = timestamp || Date.now()
    if (now - lastObjectSpawn.current > objectSpawnRate.current) {
      spawnObject()
      lastObjectSpawn.current = now

      // Gradually increase difficulty
      objectSpawnRate.current = Math.max(300, 1000 - level * 50)
    }

    // Update falling objects
    updateFallingObjects()

    // Check collisions
    checkCollisions()

    // Continue the loop
    requestRef.current = requestAnimationFrame(gameLoop)
  }

  // Start game
  const startGame = () => {
    setIsPlaying(true)
    setGameOver(false)
    setScore(0)
    setLives(3)
    setLevel(1)
    setFallingObjects([])
    lastObjectSpawn.current = Date.now()
    objectSpawnRate.current = 1000
    requestRef.current = requestAnimationFrame(gameLoop)
  }

  // End game
  const endGame = () => {
    setIsPlaying(false)
    setGameOver(true)

    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem("catchGameHighScore", score.toString())
    }

    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current)
    }
  }

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gameAreaRef.current || !isPlaying) return

    const rect = gameAreaRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left

    // Ensure the basket stays within the game area
    const maxX = rect.width - basketWidth / 2
    const minX = basketWidth / 2
    const clampedX = Math.min(Math.max(x, minX), maxX)

    setPlayerPosition({ x: clampedX, y: rect.height - 50 })
  }

  // Spawn falling object
  const spawnObject = () => {
    if (!gameAreaRef.current) return

    const gameWidth = gameAreaRef.current.clientWidth
    const objectSize = 40

    // Determine object type based on probability
    const rand = Math.random()
    let type: "fruit" | "star" | "heart" | "bomb"

    if (rand < 0.6) {
      type = "fruit" // 60% chance for fruit
    } else if (rand < 0.8) {
      type = "star" // 20% chance for star
    } else if (rand < 0.9) {
      type = "heart" // 10% chance for heart
    } else {
      type = "bomb" // 10% chance for bomb
    }

    const object: FallingObject = {
      id: `object-${Date.now()}-${Math.random()}`,
      x: Math.random() * (gameWidth - objectSize) + objectSize / 2,
      y: -objectSize,
      width: objectSize,
      height: objectSize,
      speed: 2 + Math.random() * level,
      type,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 4 - 2, // Between -2 and 2
    }

    setFallingObjects((prev) => [...prev, object])
  }

  // Update falling objects
  const updateFallingObjects = () => {
    if (!gameAreaRef.current) return

    const gameHeight = gameAreaRef.current.clientHeight

    setFallingObjects((prev) => {
      return prev
        .map((obj) => {
          // Move objects down and rotate them
          return {
            ...obj,
            y: obj.y + obj.speed,
            rotation: obj.rotation + obj.rotationSpeed,
          }
        })
        .filter((obj) => {
          // Remove objects that are out of bounds
          if (obj.y > gameHeight + obj.height) {
            // If it's a fruit and it falls through, lose a life
            if (obj.type === "fruit") {
              setLives((prev) => {
                const newLives = prev - 1
                if (newLives <= 0) {
                  endGame()
                }
                return newLives
              })
            }
            return false
          }
          return true
        })
    })
  }

  // Check collisions between player and falling objects
  const checkCollisions = () => {
    if (!playerRef.current) return

    const playerRect = playerRef.current.getBoundingClientRect()

    setFallingObjects((prevObjects) => {
      let updated = false
      const newObjects = prevObjects.filter((obj) => {
        const objCenterX = obj.x
        const objBottom = obj.y + obj.height / 2

        // Check if object is within the basket horizontally and at the right height
        const isCaught =
          Math.abs(objCenterX - playerPosition.x) < basketWidth / 2 && Math.abs(objBottom - playerPosition.y) < 30

        if (isCaught) {
          updated = true

          // Apply effects based on object type
          switch (obj.type) {
            case "fruit":
              setScore((prev) => prev + 10)
              // Level up every 100 points
              if ((score + 10) % 100 === 0) {
                setLevel((prev) => prev + 1)
              }
              break
            case "star":
              setScore((prev) => prev + 25)
              break
            case "heart":
              setLives((prev) => Math.min(prev + 1, 5))
              break
            case "bomb":
              setLives((prev) => {
                const newLives = prev - 1
                if (newLives <= 0) {
                  endGame()
                }
                return newLives
              })
              break
          }

          return false // Remove the caught object
        }

        return true // Keep the object
      })

      // Only trigger re-render if something changed
      return updated ? newObjects : prevObjects
    })
  }

  // Render falling object based on type
  const renderObject = (obj: FallingObject) => {
    const style = {
      left: `${obj.x}px`,
      top: `${obj.y}px`,
      width: `${obj.width}px`,
      height: `${obj.height}px`,
      transform: `rotate(${obj.rotation}deg)`,
    }

    switch (obj.type) {
      case "fruit":
        return (
          <div key={obj.id} className="absolute" style={style}>
            <div className="h-full w-full rounded-full bg-green-500 p-1">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                <circle cx="12" cy="12" r="10" fill="#FF5722" />
                <path d="M12 6C14 6 16 8 16 10" stroke="#4CAF50" strokeWidth="2" />
              </svg>
            </div>
          </div>
        )
      case "star":
        return (
          <div key={obj.id} className="absolute animate-pulse" style={style}>
            <Star className="h-full w-full text-yellow-400" />
          </div>
        )
      case "heart":
        return (
          <div key={obj.id} className="absolute animate-pulse" style={style}>
            <Heart className="h-full w-full text-red-500" />
          </div>
        )
      case "bomb":
        return (
          <div key={obj.id} className="absolute" style={style}>
            <div className="h-full w-full rounded-full bg-gray-800 p-1">
              <div className="relative h-full w-full">
                <div className="absolute right-0 top-0 h-3 w-3 rounded-full bg-red-500" />
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="bg-primary/5">
        <div className="flex items-center justify-between">
          <CardTitle>Fruktfangeren</CardTitle>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <Star className="h-3 w-3" /> Nivå {level}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Heart className="h-3 w-3" /> Liv {lives}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Trophy className="h-3 w-3" /> Poeng {score}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div
          ref={gameAreaRef}
          className="relative h-[500px] w-full overflow-hidden bg-gradient-to-b from-blue-100 to-blue-300"
          onMouseMove={handleMouseMove}
        >
          {/* Falling objects */}
          {fallingObjects.map(renderObject)}

          {/* Player basket */}
          {isPlaying && (
            <div
              ref={playerRef}
              className="absolute"
              style={{
                left: `${playerPosition.x - basketWidth / 2}px`,
                top: `${playerPosition.y - 25}px`,
                width: `${basketWidth}px`,
                height: "50px",
                transition: "transform 0.1s ease-out",
              }}
            >
              <div className="h-full w-full">
                <svg viewBox="0 0 100 50" className="h-full w-full">
                  <path
                    d="M10,10 C10,5 90,5 90,10 L95,40 C95,45 5,45 5,40 Z"
                    fill="#8B4513"
                    stroke="#5D3A1A"
                    strokeWidth="2"
                  />
                  <path d="M15,15 C15,12 85,12 85,15 L90,35 C90,38 10,38 10,35 Z" fill="#D2B48C" />
                </svg>
              </div>
            </div>
          )}

          {/* Game state overlays */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70">
              <div className="text-center text-white">
                <h2 className="mb-4 text-3xl font-bold">{gameOver ? "Spillet er over!" : "Fruktfangeren"}</h2>
                {gameOver && (
                  <div className="mb-6">
                    <p className="text-xl">Din poengsum: {score}</p>
                    <p className="text-lg">Beste poengsum: {highScore}</p>
                  </div>
                )}
                <Button onClick={startGame} size="lg">
                  {gameOver ? "Spill igjen" : "Start spill"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-muted/30 p-4">
        <div className="text-sm">
          <p>Bruk musen for å styre kurven. Fang frukter og stjerner for poeng!</p>
          <p className="text-muted-foreground">
            <span className="text-green-500">●</span> Frukt = 10 poeng |<span className="text-yellow-500">★</span>{" "}
            Stjerne = 25 poeng |<span className="text-red-500">♥</span> Hjerte = +1 liv |
            <span className="text-gray-800">●</span> Bombe = -1 liv
          </p>
        </div>
        {isPlaying && (
          <Button variant="outline" onClick={endGame}>
            Avslutt spill
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
