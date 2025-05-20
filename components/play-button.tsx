"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { useState } from "react"
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

export function PlayButton() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleConfirm = () => {
    setOpen(false)
    router.push("/luftkamp")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-full px-8 text-lg">
          Spill Romutforskeren
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Aldersbekreftelse
          </DialogTitle>
          <DialogDescription>Du må bekrefte at du er 18 år eller eldre for å spille Romutforskeren.</DialogDescription>
        </DialogHeader>
        <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-900">
          <p className="mb-2 font-semibold">VIKTIG INFORMASJON:</p>
          <p>
            Romutforskeren er kun en sosial plattform for underholdningsformål. Dette er IKKE pengespill. Ingen ekte
            penger er involvert, ingen premier eller belønninger, og ingen virtuelle gjenstander har noen reell verdi.
            Hvis det slutter å være gøy, ta et skritt tilbake. Du kan også besøke hjelpesider som{" "}
            <a
              href="https://hjelpelinjen.no"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-700 underline hover:text-blue-900"
            >
              Hjelpelinjen.no
            </a>
            ,{" "}
            <a
              href="https://gamcare.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-700 underline hover:text-blue-900"
            >
              GamCare
            </a>{" "}
            eller{" "}
            <a
              href="https://www.gambleaware.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-700 underline hover:text-blue-900"
            >
              GambleAware
            </a>{" "}
            for støtte og råd.
          </p>
        </div>
        <DialogFooter className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-auto">
            Avbryt
          </Button>
          <Button onClick={handleConfirm} className="w-full sm:w-auto">
            Jeg bekrefter at jeg er 18 år eller eldre
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
