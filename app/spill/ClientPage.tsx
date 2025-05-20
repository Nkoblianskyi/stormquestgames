"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { FishIcon } from "@/components/animated-icons/fish-icon"
import { SeaweedIcon } from "@/components/animated-icons/seaweed-icon"
import { ShrimpIcon } from "@/components/animated-icons/shrimp-icon"
import { ShellIcon } from "@/components/animated-icons/shell-icon"
import { Game } from "@/components/game"
import { Disclaimer } from "@/components/disclaimer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

// Game symbols
const symbols = [
  { id: "fish", value: 4, component: FishIcon },
  { id: "seaweed", value: 2, component: SeaweedIcon },
  { id: "shrimp", value: 5, component: ShrimpIcon },
  { id: "shell", value: 3, component: ShellIcon },
]

export default function ClientPage() {
  const [score, setScore] = useState(5000)
  const [energy, setEnergy] = useState(50)
  const [grid, setGrid] = useState<string[][]>([])
  const [spinning, setSpinning] = useState(false)
  const [matches, setMatches] = useState<{ symbol: string; count: number; multiplier: number; points: number }[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [spinningColumns, setSpinningColumns] = useState<boolean[]>([false, false, false, false, false])
  const [revealedGrid, setRevealedGrid] = useState<string[][]>([])

  // Animation timing references
  const spinDurations = [1000, 1400, 1800, 2200, 2600] // Different durations for each column
  const spinTimers = useRef<NodeJS.Timeout[]>([])

  // Initialize grid
  useEffect(() => {
    if (grid.length === 0) {
      const initialGrid = generateGrid()
      setGrid(initialGrid)
      setRevealedGrid(initialGrid)
    }

    // Cleanup timers on unmount
    return () => {
      spinTimers.current.forEach((timer) => clearTimeout(timer))
    }
  }, [])

  const generateGrid = () => {
    const newGrid: string[][] = []
    for (let row = 0; row < 3; row++) {
      const newRow: string[] = []
      for (let col = 0; col < 5; col++) {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)]
        newRow.push(randomSymbol.id)
      }
      newGrid.push(newRow)
    }
    return newGrid
  }

  const spin = () => {
    if (spinning || score < energy) return

    // Clear any existing timers
    spinTimers.current.forEach((timer) => clearTimeout(timer))
    spinTimers.current = []

    setSpinning(true)
    setMatches([])
    setTotalPoints(0)
    setScore((prev) => prev - energy)

    // Set all columns to spinning state
    setSpinningColumns([true, true, true, true, true])

    // Generate new grid but don't show it yet
    const newGrid = generateGrid()
    setGrid(newGrid)

    // Stop columns one by one with delays
    spinDurations.forEach((duration, colIndex) => {
      const timer = setTimeout(() => {
        setSpinningColumns((prev) => {
          const updated = [...prev]
          updated[colIndex] = false
          return updated
        })

        // Update revealed grid column by column
        setRevealedGrid((prev) => {
          const updated = JSON.parse(JSON.stringify(prev))
          for (let row = 0; row < 3; row++) {
            updated[row][colIndex] = newGrid[row][colIndex]
          }
          return updated
        })

        // When last column stops, calculate matches
        if (colIndex === spinDurations.length - 1) {
          setTimeout(() => {
            calculateMatches(newGrid)
            setSpinning(false)
          }, 500) // Small delay after last column stops
        }
      }, duration)

      spinTimers.current.push(timer)
    })
  }

  const calculateMatches = (grid: string[][]) => {
    const symbolCounts: Record<string, number> = {}

    // Count symbols
    grid.forEach((row) => {
      row.forEach((symbol) => {
        symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1
      })
    })

    // Calculate matches
    const newMatches: { symbol: string; count: number; multiplier: number; points: number }[] = []
    let newTotalPoints = 0

    Object.entries(symbolCounts).forEach(([symbol, count]) => {
      if (count >= 3) {
        const symbolData = symbols.find((s) => s.id === symbol)
        if (symbolData) {
          const multiplier = symbolData.value
          const points = Math.round(energy * multiplier * (count / 3))
          newMatches.push({
            symbol,
            count,
            multiplier,
            points,
          })
          newTotalPoints += points
        }
      }
    })

    if (newTotalPoints > 0) {
      setScore((prev) => prev + newTotalPoints)
      setMatches(newMatches)
      setTotalPoints(newTotalPoints)
    }
  }

  const decreaseEnergy = () => {
    if (energy > 10) {
      setEnergy((prev) => prev - 10)
    }
  }

  const increaseEnergy = () => {
    if (energy < 500) {
      setEnergy((prev) => prev + 10)
    }
  }

  const renderSymbol = (symbolId: string, isMatching: boolean, size = 80) => {
    const symbolData = symbols.find((s) => s.id === symbolId)
    if (!symbolData) return null

    const IconComponent = symbolData.component
    return (
      <IconComponent size={size} isAnimated={!spinning && isMatching} className={isMatching ? "matching-symbol" : ""} />
    )
  }

  return (
    <main className="container py-8">
      <div className="mb-6 flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Tilbake til forsiden</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold md:text-3xl">StormQuest Undervannsutforsker</h1>
      </div>

      <Disclaimer className="mb-6" />

      <Game />

      <div className="mt-8">
        <Disclaimer type="bottom" />
      </div>
    </main>
  )
}
