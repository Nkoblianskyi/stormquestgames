"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { FishIcon } from "@/components/animated-icons/fish-icon"
import { SeaweedIcon } from "@/components/animated-icons/seaweed-icon"
import { ShellIcon } from "@/components/animated-icons/shell-icon"
import { ShrimpIcon } from "@/components/animated-icons/shrimp-icon"

interface GameBoardProps {
  isPlaying: boolean
  onCollect: (item: string) => void
  level: number
  energy: number
}

interface GameItem {
  id: string
  type: string
  x: number
  y: number
  collected: boolean
}

const ITEM_TYPES = ["shell", "seaweed", "fish", "shrimp", "starfish"]

export function GameBoard({ isPlaying, onCollect, level, energy }: GameBoardProps) {
  const [items, setItems] = useState<GameItem[]>([])
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 })
  const boardRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const lastItemTime = useRef<number>(0)

  // Initialize game
  useEffect(() => {
    if (isPlaying) {
      // Start game loop
      lastItemTime.current = Date.now()
      animationRef.current = requestAnimationFrame(gameLoop)
    } else {
      // Stop game loop
      cancelAnimationFrame(animationRef.current)
    }

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [isPlaying])

  // Handle keyboard controls
  useEffect(() => {
    if (!isPlaying) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const speed = 5
      switch (e.key) {
        case "ArrowUp":
          setPlayerPosition((prev) => ({ ...prev, y: Math.max(0, prev.y - speed) }))
          break
        case "ArrowDown":
          setPlayerPosition((prev) => ({ ...prev, y: Math.min(100, prev.y + speed) }))
          break
        case "ArrowLeft":
          setPlayerPosition((prev) => ({ ...prev, x: Math.max(0, prev.x - speed) }))
          break
        case "ArrowRight":
          setPlayerPosition((prev) => ({ ...prev, x: Math.min(100, prev.x + speed) }))
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isPlaying])

  // Handle mouse/touch controls
  const handleBoardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPlaying || !boardRef.current) return

    const rect = boardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setPlayerPosition({ x, y })
  }

  // Game loop
  const gameLoop = () => {
    // Spawn new items occasionally
    const now = Date.now()
    if (now - lastItemTime.current > 2000) {
      // Every 2 seconds
      spawnItem()
      lastItemTime.current = now
    }

    // Check for collisions
    checkCollisions()

    // Continue the loop
    animationRef.current = requestAnimationFrame(gameLoop)
  }

  // Spawn a new item
  const spawnItem = () => {
    const type = ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)]
    const newItem: GameItem = {
      id: `item-${Date.now()}-${Math.random()}`,
      type,
      x: Math.random() * 90 + 5, // Keep away from edges
      y: Math.random() * 90 + 5, // Keep away from edges
      collected: false,
    }

    setItems((prev) => [...prev.slice(-19), newItem]) // Keep max 20 items
  }

  // Check for collisions between player and items
  const checkCollisions = () => {
    setItems((prevItems) => {
      let updated = false
      const newItems = prevItems.map((item) => {
        if (!item.collected) {
          const dx = playerPosition.x - item.x
          const dy = playerPosition.y - item.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // If player is close enough to the item
          if (distance < 10) {
            onCollect(item.type)
            updated = true
            return { ...item, collected: true }
          }
        }
        return item
      })

      // Only trigger re-render if something changed
      return updated ? newItems : prevItems
    })
  }

  // Render item based on type
  const renderItem = (item: GameItem) => {
    if (item.collected) return null

    const style = {
      left: `${item.x}%`,
      top: `${item.y}%`,
    }

    let ItemComponent
    switch (item.type) {
      case "fish":
        ItemComponent = FishIcon
        break
      case "seaweed":
        ItemComponent = SeaweedIcon
        break
      case "shell":
        ItemComponent = ShellIcon
        break
      case "shrimp":
        ItemComponent = ShrimpIcon
        break
      default:
        ItemComponent = ShellIcon
    }

    return (
      <div
        key={item.id}
        className="absolute -translate-x-1/2 -translate-y-1/2 transform transition-all duration-300"
        style={style}
      >
        <ItemComponent size={30} isAnimated={true} />
      </div>
    )
  }

  return (
    <div
      ref={boardRef}
      className={cn(
        "relative h-[400px] w-full cursor-pointer overflow-hidden bg-gradient-to-b from-blue-500 to-blue-900",
        !isPlaying && "opacity-80",
      )}
      onClick={handleBoardClick}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/underwater-background.png')] bg-cover bg-center opacity-50"></div>

      {/* Game items */}
      {items.map(renderItem)}

      {/* Player character */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 transform transition-all duration-300"
        style={{ left: `${playerPosition.x}%`, top: `${playerPosition.y}%` }}
      >
        <div className="relative">
          <FishIcon size={40} isAnimated={isPlaying} />
          <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {level}
          </div>
        </div>
      </div>

      {/* Game state overlays */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
          {energy <= 0 ? (
            <div className="text-center">
              <h3 className="text-xl font-bold">Ingen energi igjen!</h3>
              <p className="mt-2">Vent litt for å få mer energi eller kjøp en boost.</p>
            </div>
          ) : (
            <div className="text-center">
              <h3 className="text-xl font-bold">Klar til å utforske?</h3>
              <p className="mt-2">Klikk på "Start Utforskning" for å begynne eventyret!</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
