"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { FishIcon } from "@/components/animated-icons/fish-icon"
import { SeaweedIcon } from "@/components/animated-icons/seaweed-icon"
import { ShellIcon } from "@/components/animated-icons/shell-icon"
import { ShrimpIcon } from "@/components/animated-icons/shrimp-icon"

interface GameInventoryProps {
  items: string[]
}

export function GameInventory({ items }: GameInventoryProps) {
  // Count occurrences of each item type
  const itemCounts: Record<string, number> = {}
  items.forEach((item) => {
    itemCounts[item] = (itemCounts[item] || 0) + 1
  })

  // Get unique item types
  const uniqueItems = Object.keys(itemCounts)

  // If inventory is empty
  if (uniqueItems.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center text-center text-muted-foreground">
        <div>
          <p>Ditt inventar er tomt.</p>
          <p className="mt-2 text-sm">Utforsk havet for å samle gjenstander!</p>
        </div>
      </div>
    )
  }

  const getItemIcon = (type: string, size = 30) => {
    switch (type) {
      case "fish":
        return <FishIcon size={size} isAnimated={true} />
      case "seaweed":
        return <SeaweedIcon size={size} isAnimated={true} />
      case "shell":
        return <ShellIcon size={size} isAnimated={true} />
      case "shrimp":
        return <ShrimpIcon size={size} isAnimated={true} />
      default:
        return <ShellIcon size={size} isAnimated={true} />
    }
  }

  const getItemName = (type: string) => {
    switch (type) {
      case "fish":
        return "Fisk"
      case "seaweed":
        return "Sjøgress"
      case "shell":
        return "Skjell"
      case "shrimp":
        return "Reke"
      case "starfish":
        return "Sjøstjerne"
      default:
        return type
    }
  }

  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="grid grid-cols-2 gap-4">
        {uniqueItems.map((itemType) => (
          <div
            key={itemType}
            className="flex items-center gap-3 rounded-lg border bg-card p-3 text-card-foreground shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center">{getItemIcon(itemType)}</div>
            <div>
              <div className="font-medium">{getItemName(itemType)}</div>
              <div className="text-sm text-muted-foreground">Antall: {itemCounts[itemType]}</div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
