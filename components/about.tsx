import Image from "next/image"

export function About() {
  return (
    <section className="w-full bg-muted/50 py-16">
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Om StormQuest Games</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-lg lg:aspect-auto lg:h-full">
            <Image src="/a7aa616c2c15959141f923bab5cfcbc1.jpg" alt="StormQuest Games team" fill className="object-cover" priority />
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-4">
              StormQuest Games er skapt for å gi deg en avslappende og fascinerende opplevelse under havets overflate.
              Vår plattform kombinerer vakre undervannslandskap med engasjerende aktiviteter, der du kan utforske havets
              hemmeligheter og oppleve livet i det blå.
            </p>
            <p className="mb-4">
              Vårt dedikerte team av havbiologer og designere har bygget en verden der bølgende sjøgress, fargerike
              fisker og skjulte skatter skaper en autentisk undervannsatmosfære. Hver detalj er nøye utformet for å gi
              deg en oppslukende og avslappende opplevelse.
            </p>
            <p>
              I StormQuest handler det om å oppdage og nyte havets skjønnhet. Her finner du ingen stressende elementer -
              bare en fredelig flukt inn i en undervannsfantasi der du kan svømme fritt og utforske i ditt eget tempo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
