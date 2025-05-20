"use client"

import { Card, CardContent } from "@/components/ui/card"
import { RocketIcon } from "@/components/animated-icons/rocket-icon"
import { SpaceshipIcon } from "@/components/animated-icons/spaceship-icon"
import { SatelliteIcon } from "@/components/animated-icons/satellite-icon"
import { AlertTriangle } from "lucide-react"
import { useEffect, useRef } from "react"

// Animert romscene-komponent
function AnimatedSpaceScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Sett opp canvas
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Stjerner
    const stars: { x: number; y: number; radius: number; speed: number; opacity: number }[] = []
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
      })
    }

    // Romfartøy
    const spaceships = [
      { x: canvas.width * 0.2, y: canvas.height * 0.3, size: 30, speed: 0.5, direction: 1 },
      { x: canvas.width * 0.8, y: canvas.height * 0.6, size: 40, speed: 0.3, direction: -1 },
      { x: canvas.width * 0.5, y: canvas.height * 0.2, size: 25, speed: 0.7, direction: 1 },
    ]

    // Planeter
    const planets = [
      { x: canvas.width * 0.15, y: canvas.height * 0.7, radius: 40, color: "#3949AB" },
      { x: canvas.width * 0.85, y: canvas.height * 0.25, radius: 30, color: "#5E35B1" },
    ]

    // Animasjonsloop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Tegn stjerner
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()

        // Beveg stjerner
        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      // Tegn planeter
      planets.forEach((planet) => {
        // Planet
        ctx.beginPath()
        ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2)
        ctx.fillStyle = planet.color
        ctx.fill()

        // Planet glød
        const gradient = ctx.createRadialGradient(
          planet.x,
          planet.y,
          planet.radius * 0.8,
          planet.x,
          planet.y,
          planet.radius * 1.2,
        )
        gradient.addColorStop(0, `${planet.color}33`)
        gradient.addColorStop(1, "transparent")
        ctx.beginPath()
        ctx.arc(planet.x, planet.y, planet.radius * 1.2, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Tegn romfartøy
      spaceships.forEach((ship) => {
        ctx.save()
        ctx.translate(ship.x, ship.y)
        ctx.scale(ship.direction, 1)

        // Romfartøy kropp
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(-ship.size / 2, ship.size / 4)
        ctx.lineTo(-ship.size / 2, -ship.size / 4)
        ctx.closePath()
        ctx.fillStyle = "#E1F5FE"
        ctx.fill()
        ctx.strokeStyle = "#29B6F6"
        ctx.lineWidth = 2
        ctx.stroke()

        // Romfartøy vindu
        ctx.beginPath()
        ctx.arc(-ship.size / 4, 0, ship.size / 8, 0, Math.PI * 2)
        ctx.fillStyle = "#29B6F6"
        ctx.fill()

        // Romfartøy motor
        ctx.beginPath()
        ctx.moveTo(-ship.size / 2, ship.size / 8)
        ctx.lineTo(-ship.size / 2 - ship.size / 4, 0)
        ctx.lineTo(-ship.size / 2, -ship.size / 8)
        ctx.closePath()
        ctx.fillStyle = "#FF9800"
        ctx.fill()

        ctx.restore()

        // Beveg romfartøy
        ship.x += ship.speed * ship.direction
        if (ship.x > canvas.width + ship.size || ship.x < -ship.size) {
          ship.direction *= -1
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Håndter vindustørrelse
    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="h-full w-full rounded-lg" />
}

export function GameDescription() {
  return (
    <section className="w-full space-background py-16">
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Hvordan Spille Romutforskeren
          </h2>
          <p className="text-blue-100">
            Romutforskeren er et enkelt og morsomt spill der du styrer et romskip gjennom verdensrommet og utforsker
            ulike fenomener. Her er hvordan du spiller:
          </p>
        </div>

        {/* Animert romscene */}
        <div className="mx-auto mb-12 h-64 max-w-4xl overflow-hidden rounded-lg border border-blue-500/30 shadow-lg shadow-blue-500/20">
          <AnimatedSpaceScene />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-blue-900/50 text-white backdrop-blur-sm">
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-4 rounded-full bg-blue-800/50 p-4">
                <RocketIcon size={60} />
              </div>
              <h3 className="mb-2 text-xl font-bold">1. Trykk på UTFORSK-knappen</h3>
              <p className="text-center text-blue-100">
                Start spillet ved å trykke på UTFORSK-knappen. Dette vil sende romskipet ditt ut på en spennende reise
                gjennom verdensrommet.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/50 text-white backdrop-blur-sm">
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-4 rounded-full bg-blue-800/50 p-4">
                <SpaceshipIcon size={60} />
              </div>
              <h3 className="mb-2 text-xl font-bold">2. Opplev romfenomener</h3>
              <p className="text-center text-blue-100">
                Under utforskningen vil romskipet ditt oppdage ulike romfenomener.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/50 text-white backdrop-blur-sm">
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-4 rounded-full bg-blue-800/50 p-4">
                <SatelliteIcon size={60} />
              </div>
              <h3 className="mb-2 text-xl font-bold">3. Samle poeng og nivåer</h3>
              <p className="text-center text-blue-100">
                Fortsett å utforske for og gå opp i nivå. Høyere nivåer gir deg mer energi og tilgang til
                nye områder i verdensrommet!
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-lg bg-red-900/20 p-6 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <AlertTriangle className="mt-1 h-6 w-6 flex-shrink-0 text-yellow-400" />
            <div>
              <h3 className="mb-2 text-xl font-bold text-white">Viktig informasjon</h3>
              <p className="text-blue-100">
                Romutforskeren er KUN for underholdningsformål. Dette er IKKE et pengespill og involverer ikke ekte
                penger, premier eller belønninger av noen art. Alle poeng og nivåer er virtuelle og har ingen verdi i
                den virkelige verden.
              </p>
              <p className="mt-4 text-blue-100">
                Spillet er designet for voksne (18+) og er ment å være en morsom og avslappende opplevelse. Hvis du
                opplever at spillet ikke lenger er morsomt, anbefaler vi at du tar en pause.
              </p>
              <p className="mt-4 text-blue-100">
                Hvis du eller noen du kjenner har problemer med spillavhengighet, kan du besøke hjelpesider som
                <a
                  href="https://hjelpelinjen.no"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-1 font-semibold text-blue-300 underline hover:text-blue-200"
                >
                  Hjelpelinjen.no
                </a>
                ,
                <a
                  href="https://gamcare.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-1 font-semibold text-blue-300 underline hover:text-blue-200"
                >
                  GamCare
                </a>{" "}
                eller
                <a
                  href="https://www.gambleaware.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-1 font-semibold text-blue-300 underline hover:text-blue-200"
                >
                  GambleAware
                </a>
                for støtte og råd.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
