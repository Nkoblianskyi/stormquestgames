import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Kontakt Oss - StormQuest Games",
  description: "Ta kontakt med StormQuest Games for spørsmål, tilbakemeldinger eller samarbeid.",
}

export default function ContactPage() {
  return (
    <main className="container py-12">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Kontakt Oss</h1>
        <p className="text-muted-foreground">
          Har du spørsmål, tilbakemeldinger eller ønsker å samarbeide med oss? Ta gjerne kontakt!
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Telefon
            </CardTitle>
            <CardDescription>Ring oss direkte</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium hover:text-primary hover:underline">
              +47 915 208 214
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              E-post
            </CardTitle>
            <CardDescription>Send oss en e-post</CardDescription>
          </CardHeader>
          <CardContent>
            <p
              className="text-lg font-medium hover:text-primary hover:underline"
            >
              info@stormquestgames.com
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Adresse
            </CardTitle>
            <CardDescription>Besøk vårt kontor</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">Storgata 10, 0155 Oslo, Norway</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Send oss en melding</CardTitle>
            <CardDescription>Fyll ut skjemaet nedenfor, så vil vi svare deg så snart som mulig.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>

    </main>
  )
}
