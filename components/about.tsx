"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

// Animert romscene-komponent for About-seksjonen
function AnimatedSpaceAbout() {
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
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
      })
    }

    // Planeter
    const planets = [
      {
        x: canvas.width * 0.25,
        y: canvas.height * 0.3,
        radius: 50,
        color: "#3949AB",
        rotation: 0,
        rotationSpeed: 0.0005,
      },
      {
        x: canvas.width * 0.75,
        y: canvas.height * 0.7,
        radius: 35,
        color: "#5E35B1",
        rotation: 0,
        rotationSpeed: 0.001,
      },
      {
        x: canvas.width * 0.5,
        y: canvas.height * 0.5,
        radius: 70,
        color: "#1E88E5",
        rotation: 0,
        rotationSpeed: 0.0003,
      },
    ]

    // Romfartøy
    const spaceships = [
      {
        x: canvas.width * 0.2,
        y: canvas.height * 0.2,
        size: 30,
        speed: 0.7,
        direction: 1,
        trail: [] as { x: number; y: number; opacity: number }[],
      },
      {
        x: canvas.width * 0.8,
        y: canvas.height * 0.6,
        size: 40,
        speed: 0.5,
        direction: -1,
        trail: [] as { x: number; y: number; opacity: number }[],
      },
      {
        x: canvas.width * 0.5,
        y: canvas.height * 0.8,
        size: 25,
        speed: 0.9,
        direction: 1,
        trail: [] as { x: number; y: number; opacity: number }[],
      },
    ]

    // Animasjonsloop
    let animationFrame: number
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
        // Oppdater rotasjon
        planet.rotation += planet.rotationSpeed

        // Planet
        ctx.save()
        ctx.translate(planet.x, planet.y)
        ctx.rotate(planet.rotation)

        // Tegn planet med tekstur
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, planet.radius)
        gradient.addColorStop(0, planet.color)
        gradient.addColorStop(0.7, planet.color)
        gradient.addColorStop(1, `${planet.color}88`)

        ctx.beginPath()
        ctx.arc(0, 0, planet.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Tegn overflatedetaljer
        for (let i = 0; i < 8; i++) {
          const angle = Math.random() * Math.PI * 2
          const distance = Math.random() * planet.radius * 0.7
          const size = Math.random() * planet.radius * 0.15 + planet.radius * 0.05

          ctx.beginPath()
          ctx.arc(Math.cos(angle) * distance, Math.sin(angle) * distance, size, 0, Math.PI * 2)
          ctx.fillStyle = `${planet.color}55`
          ctx.fill()
        }

        // Planet glød
        const glowGradient = ctx.createRadialGradient(0, 0, planet.radius * 0.8, 0, 0, planet.radius * 1.3)
        glowGradient.addColorStop(0, `${planet.color}33`)
        glowGradient.addColorStop(1, "transparent")
        ctx.beginPath()
        ctx.arc(0, 0, planet.radius * 1.3, 0, Math.PI * 2)
        ctx.fillStyle = glowGradient
        ctx.fill()

        ctx.restore()
      })

      // Tegn romfartøy
      spaceships.forEach((ship) => {
        // Legg til trail
        if (Math.random() > 0.5) {
          ship.trail.push({
            x: ship.x - (ship.size / 2) * ship.direction,
            y: ship.y,
            opacity: 0.7,
          })
        }

        // Tegn trail
        ship.trail.forEach((point, index) => {
          ctx.beginPath()
          ctx.arc(point.x, point.y, ship.size / 10, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(135, 206, 250, ${point.opacity})`
          ctx.fill()

          // Reduser opacity
          point.opacity -= 0.02
        })

        // Fjern gamle trail-punkter
        ship.trail = ship.trail.filter((point) => point.opacity > 0)

        // Tegn romfartøy
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

      animationFrame = requestAnimationFrame(animate)
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
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} className="h-full w-full rounded-lg" />
}

export function About() {
  return (
    <section className="w-full bg-muted/50 py-16">
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Om StormQuest Games</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-lg lg:aspect-auto lg:h-full">
            <Image
              src="/a7aa616c2c15959141f923bab5cfcbc1.jpg"
              alt="StormQuest Games team"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-4">
              StormQuest Games er skapt for å gi deg en spennende og fascinerende opplevelse i det ytre rom. Vår
              plattform kombinerer vakre romlandskap med engasjerende aktiviteter, der du kan utforske universets
              hemmeligheter og oppleve livet blant stjernene.
            </p>
            <p className="mb-4">
              Vårt dedikerte team av romeksperter og designere har bygget en verden der lysende stjerner, fargerike
              planeter og mystiske romfenomener skaper en autentisk romfartopplevelse. Hver detalj er nøye utformet for
              å gi deg en oppslukende og avslappende opplevelse.
            </p>
            <p>
              I StormQuest handler det om å oppdage og nyte universets skjønnhet. Her finner du ingen stressende
              elementer - bare en fredelig flukt inn i en romfantasi der du kan utforske i ditt eget tempo og oppleve de
              utrolige underverkene som finnes i det uendelige kosmos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
