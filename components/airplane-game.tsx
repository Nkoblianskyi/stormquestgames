"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Target, Shield, Star } from "lucide-react"

interface GameObject {
  id: string
  x: number
  y: number
  width: number
  height: number
  speed: number
  type: "enemy" | "bullet" | "powerup"
  health?: number
  direction?: { x: number; y: number }
}

export function AirplaneGame() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameObjects, setGameObjects] = useState<GameObject[]>([])
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 })
  const [gameOver, setGameOver] = useState(false)
  const [level, setLevel] = useState(1)

  const gameAreaRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>()
  const lastEnemySpawn = useRef<number>(0)
  const lastBulletTime = useRef<number>(0)
  const enemySpawnRate = useRef<number>(1500) // ms between enemy spawns
  const bulletCooldown = useRef<number>(300) // ms between bullets

  // Initialize game
  useEffect(() => {
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem("airplaneGameHighScore")
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

    // Spawn enemies
    if (timestamp - lastEnemySpawn.current > enemySpawnRate.current) {
      spawnEnemy()
      lastEnemySpawn.current = timestamp

      // Gradually increase difficulty
      enemySpawnRate.current = Math.max(300, 1500 - level * 100)
    }

    // Update game objects
    updateGameObjects()

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
    setGameObjects([])
    lastEnemySpawn.current = 0
    enemySpawnRate.current = 1500
    requestRef.current = requestAnimationFrame(gameLoop)
  }

  // End game
  const endGame = () => {
    setIsPlaying(false)
    setGameOver(true)

    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem("airplaneGameHighScore", score.toString())
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
    const y = e.clientY - rect.top

    setPlayerPosition({ x, y })
  }

  // Handle mouse click (shooting)
  const handleMouseClick = () => {
    if (!isPlaying) return

    const now = Date.now()
    if (now - lastBulletTime.current > bulletCooldown.current) {
      shootBullet()
      lastBulletTime.current = now
    }
  }

  // Spawn enemy
  const spawnEnemy = () => {
    if (!gameAreaRef.current) return

    const gameWidth = gameAreaRef.current.clientWidth
    const enemyWidth = 40
    const enemyHeight = 40

    const enemy: GameObject = {
      id: `enemy-${Date.now()}-${Math.random()}`,
      x: Math.random() * (gameWidth - enemyWidth),
      y: -enemyHeight,
      width: enemyWidth,
      height: enemyHeight,
      speed: 2 + Math.random() * level,
      type: "enemy",
      health: 1,
    }

    setGameObjects((prev) => [...prev, enemy])

    // Occasionally spawn a power-up
    if (Math.random() < 0.1) {
      const powerup: GameObject = {
        id: `powerup-${Date.now()}-${Math.random()}`,
        x: Math.random() * (gameWidth - 30),
        y: -30,
        width: 30,
        height: 30,
        speed: 1.5,
        type: "powerup",
      }

      setGameObjects((prev) => [...prev, powerup])
    }
  }

  // Shoot bullet
  const shootBullet = () => {
    const bullet: GameObject = {
      id: `bullet-${Date.now()}-${Math.random()}`,
      x: playerPosition.x,
      y: playerPosition.y - 20,
      width: 5,
      height: 15,
      speed: 8,
      type: "bullet",
    }

    setGameObjects((prev) => [...prev, bullet])
  }

  // Update game objects
  const updateGameObjects = () => {
    if (!gameAreaRef.current) return

    const gameHeight = gameAreaRef.current.clientHeight
    const gameWidth = gameAreaRef.current.clientWidth

    setGameObjects((prev) => {
      return prev
        .map((obj) => {
          // Move bullets up
          if (obj.type === "bullet") {
            return { ...obj, y: obj.y - obj.speed }
          }

          // Move enemies and powerups down
          if (obj.type === "enemy" || obj.type === "powerup") {
            return { ...obj, y: obj.y + obj.speed }
          }

          return obj
        })
        .filter((obj) => {
          // Remove objects that are out of bounds
          if (obj.type === "bullet" && obj.y < -obj.height) return false
          if ((obj.type === "enemy" || obj.type === "powerup") && obj.y > gameHeight) {
            // If enemy passes through bottom, lose a life
            if (obj.type === "enemy") {
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

  // Check collisions
  const checkCollisions = () => {
    const bullets = gameObjects.filter((obj) => obj.type === "bullet")
    const enemies = gameObjects.filter((obj) => obj.type === "enemy")
    const powerups = gameObjects.filter((obj) => obj.type === "powerup")

    // Check bullet-enemy collisions
    bullets.forEach((bullet) => {
      enemies.forEach((enemy) => {
        if (checkCollision(bullet, enemy)) {
          // Mark objects for removal
          setGameObjects((prev) =>
            prev.map((obj) => {
              if (obj.id === bullet.id) {
                return { ...obj, y: -100 } // Move bullet out of bounds to remove it
              }
              if (obj.id === enemy.id) {
                const newHealth = (enemy.health || 1) - 1
                if (newHealth <= 0) {
                  // Enemy destroyed
                  setScore((prev) => prev + 10)

                  // Level up every 100 points
                  if ((score + 10) % 100 === 0) {
                    setLevel((prev) => prev + 1)
                  }

                  return { ...obj, y: -100 } // Move enemy out of bounds to remove it
                }
                return { ...obj, health: newHealth }
              }
              return obj
            }),
          )
        }
      })
    })

    // Check player-powerup collisions
    const playerObj = {
      x: playerPosition.x - 25, // Adjust for player size
      y: playerPosition.y - 25,
      width: 50,
      height: 50,
    }

    powerups.forEach((powerup) => {
      if (checkCollision(playerObj, powerup)) {
        // Apply powerup effect
        const randomEffect = Math.floor(Math.random() * 3)

        if (randomEffect === 0) {
          // Extra life
          setLives((prev) => prev + 1)
        } else if (randomEffect === 1) {
          // Score boost
          setScore((prev) => prev + 50)
        } else {
          // Temporary bullet cooldown reduction
          bulletCooldown.current = 150
          setTimeout(() => {
            bulletCooldown.current = 300
          }, 5000)
        }

        // Remove powerup
        setGameObjects((prev) => prev.filter((obj) => obj.id !== powerup.id))
      }
    })

    // Check player-enemy collisions
    enemies.forEach((enemy) => {
      if (checkCollision(playerObj, enemy)) {
        setLives((prev) => {
          const newLives = prev - 1
          if (newLives <= 0) {
            endGame()
          }
          return newLives
        })

        // Remove enemy
        setGameObjects((prev) => prev.filter((obj) => obj.id !== enemy.id))
      }
    })
  }

  // Helper function to check collision between two objects
  const checkCollision = (obj1: any, obj2: any) => {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="bg-primary/5">
        <div className="flex items-center justify-between">
          <CardTitle>Luftforsvar</CardTitle>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <Star className="h-3 w-3" /> Nivå {level}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Shield className="h-3 w-3" /> Liv {lives}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Target className="h-3 w-3" /> Poeng {score}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div
          ref={gameAreaRef}
          className="relative h-[500px] w-full overflow-hidden bg-gradient-to-b from-blue-900 to-black"
          onMouseMove={handleMouseMove}
          onClick={handleMouseClick}
        >
          {/* Game objects */}
          {gameObjects.map((obj) => {
            if (obj.type === "enemy") {
              return (
                <div
                  key={obj.id}
                  className="absolute"
                  style={{
                    left: `${obj.x}px`,
                    top: `${obj.y}px`,
                    width: `${obj.width}px`,
                    height: `${obj.height}px`,
                  }}
                >
                  <div className="h-full w-full rounded-md bg-red-500 p-1">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                      <path d="M12 4L8 8H16L12 4Z" fill="white" />
                      <rect x="8" y="8" width="8" height="12" fill="white" />
                      <path d="M10 12H14V16H10V12Z" fill="red" />
                    </svg>
                  </div>
                </div>
              )
            }

            if (obj.type === "bullet") {
              return (
                <div
                  key={obj.id}
                  className="absolute bg-yellow-400"
                  style={{
                    left: `${obj.x}px`,
                    top: `${obj.y}px`,
                    width: `${obj.width}px`,
                    height: `${obj.height}px`,
                  }}
                />
              )
            }

            if (obj.type === "powerup") {
              return (
                <div
                  key={obj.id}
                  className="absolute animate-pulse"
                  style={{
                    left: `${obj.x}px`,
                    top: `${obj.y}px`,
                    width: `${obj.width}px`,
                    height: `${obj.height}px`,
                  }}
                >
                  <div className="h-full w-full rounded-full bg-green-500 p-1">
                    <Star className="h-full w-full text-yellow-300" />
                  </div>
                </div>
              )
            }

            return null
          })}

          {/* Player airplane */}
          {isPlaying && (
            <div
              className="absolute"
              style={{
                left: `${playerPosition.x - 25}px`,
                top: `${playerPosition.y - 25}px`,
                width: "50px",
                height: "50px",
                transition: "transform 0.1s ease-out",
              }}
            >
              <Plane className="h-full w-full rotate-180 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            </div>
          )}

          {/* Game state overlays */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70">
              <div className="text-center text-white">
                <h2 className="mb-4 text-3xl font-bold">{gameOver ? "Spillet er over!" : "Luftforsvar"}</h2>
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
          <p>Bruk musen for å styre flyet. Klikk for å skyte.</p>
          <p className="text-muted-foreground">Samle grønne kraftforsterkninger for bonuser!</p>
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
