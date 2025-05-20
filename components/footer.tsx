import Link from "next/link"
import { Disclaimer } from "@/components/disclaimer"
import { Logo } from "@/components/logo"
import { AgeRestrictionIcon } from "@/components/age-restriction-icon"
import { Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-slate-50">
      <div className="container py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Logo variant="light" />
            <p className="text-slate-400">
              En sosial spillplattform for underholdningsformål. Ingen ekte penger er involvert, ingen premier eller
              belønninger.
            </p>
            <div className="flex items-center gap-4">
              <AgeRestrictionIcon size={50} />
              <p className="text-sm font-semibold">18+ Aldersgrense</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold">Kontakt oss</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <p className="hover:text-white hover:underline">
                    +47 915 208 214
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <p className="hover:text-white hover:underline">
                    info@stormquestgames.com
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 translate-y-1" />
                  <span>Storgata 10, 0155 Oslo, Norway</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold">Lenker</h3>
              <ul className="grid gap-2 text-slate-400">
                <li>
                  <Link href="/kontakt" className="hover:text-white hover:underline">
                    Kontakt
                  </Link>
                </li>
                <li>
                  <Link href="/vilkar" className="hover:text-white hover:underline">
                    Vilkår
                  </Link>
                </li>
                <li>
                  <Link href="/personvern" className="hover:text-white hover:underline">
                    Personvern
                  </Link>
                </li>
                <li>
                  <Link href="/ansvarsfraskrivelse" className="hover:text-white hover:underline">
                    Ansvarsfraskrivelse
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://hjelpelinjen.no"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-opacity hover:opacity-80"
          >
            <img src="/aware.webp" alt="Hjelpelinjen logo" className="h-20" />
          </a>
          <a
            href="https://gamcare.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-opacity hover:opacity-80"
          >
            <img src="/aware2.png" alt="GamCare logo" className="h-10" />
          </a>
          <a
            href="https://www.gambleaware.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-opacity hover:opacity-80"
          >
            <img src="/aware1.webp" alt="GambleAware logo" className="h-20" />
          </a>
        </div>

        <Disclaimer type="bottom" className="mt-8 bg-slate-900 text-slate-300" />

        <div className="mt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} StormQuest Games. Alle rettigheter reservert.</p>
        </div>
      </div>
    </footer>
  )
}
