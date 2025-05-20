"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertTriangle } from "lucide-react"

export function AgeVerificationModal() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // Sjekk om brukeren allerede har godkjent aldersverifiseringen
  useEffect(() => {
    const hasVerified = localStorage.getItem("age-verified")
    if (!hasVerified) {
      setOpen(true)
    }
  }, [])

  const handleAccept = () => {
    // Lagre i localStorage at brukeren har godkjent
    localStorage.setItem("age-verified", "true")
    setOpen(false)
  }

  const handleDecline = () => {
    // Omdiriger til en ekstern side eller vis en annen melding
    router.push("https://www.google.com")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Aldersbekreftelse
          </DialogTitle>
          <DialogDescription>Du må bekrefte at du er 18 år eller eldre for å besøke denne nettsiden.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-900">
            <p className="mb-2 font-semibold">VIKTIG INFORMASJON:</p>
            <p>
              StormQuest Games er kun en sosial plattform for underholdningsformål. Dette er IKKE pengespill. Ingen ekte
              penger er involvert, ingen premier eller belønninger, og ingen virtuelle gjenstander har noen reell verdi.
            </p>
          </div>

          <div className="rounded-md bg-yellow-50 p-4 text-sm text-yellow-900">
            <p className="flex items-center gap-2 font-semibold">
              <AlertTriangle className="h-4 w-4" />
              ADVARSEL: 18+ INNHOLD
            </p>
            <p>
              Denne nettsiden er kun for personer som har fylt 18 år. Ved å klikke på "Jeg bekrefter" bekrefter du at du
              er 18 år eller eldre.
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={handleDecline} className="w-full sm:w-auto">
            Avvis
          </Button>
          <Button onClick={handleAccept} className="w-full sm:w-auto">
            Jeg bekrefter at jeg er 18 år eller eldre
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
