"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Battery, Compass, Shield, Sparkles, Zap } from "lucide-react"

interface GameShopProps {
  score: number
  setScore: (score: number) => void
}

interface ShopItem {
  id: string
  name: string
  description: string
  price: number
  icon: React.ReactNode
}

export function GameShop({ score, setScore }: GameShopProps) {
  const [purchasedItems, setPurchasedItems] = useState<string[]>([])

  const shopItems: ShopItem[] = [
    {
      id: "energy_boost",
      name: "Energiboost",
      description: "Øker energinivået ditt med 50%",
      price: 100,
      icon: <Battery className="h-8 w-8 text-green-500" />,
    },
    {
      id: "speed_boost",
      name: "Fartsøkning",
      description: "Øker svømmehastigheten din i 5 minutter",
      price: 150,
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
    },
    {
      id: "treasure_finder",
      name: "Skattesøker",
      description: "Hjelper deg å finne sjeldne skatter",
      price: 200,
      icon: <Compass className="h-8 w-8 text-blue-500" />,
    },
    {
      id: "protection",
      name: "Beskyttelse",
      description: "Beskytter deg mot farlige skapninger",
      price: 250,
      icon: <Shield className="h-8 w-8 text-purple-500" />,
    },
    {
      id: "special_ability",
      name: "Spesialevne",
      description: "Lås opp en spesiell evne for karakteren din",
      price: 500,
      icon: <Sparkles className="h-8 w-8 text-amber-500" />,
    },
  ]

  const purchaseItem = (item: ShopItem) => {
    if (score >= item.price) {
      setScore(score - item.price)
      setPurchasedItems((prev) => [...prev, item.id])
    }
  }

  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="mb-4 rounded-lg bg-muted p-3 text-center">
        <p className="text-sm font-medium">Dine poeng: {score}</p>
      </div>

      <div className="space-y-4">
        {shopItems.map((item) => {
          const isPurchased = purchasedItems.includes(item.id)
          const canAfford = score >= item.price

          return (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">{item.icon}</div>
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
              <Button
                variant={isPurchased ? "outline" : canAfford ? "default" : "outline"}
                size="sm"
                disabled={isPurchased || !canAfford}
                onClick={() => purchaseItem(item)}
              >
                {isPurchased ? "Kjøpt" : `${item.price} poeng`}
              </Button>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}
