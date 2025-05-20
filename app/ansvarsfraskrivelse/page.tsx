export default function DisclaimerPage() {
  return (
    <main
      className="disclaimer-page"
      itemScope
      itemType="https://schema.org/WebPage"
      aria-labelledby="disclaimer-title"
    >
      <meta itemProp="name" content="Ansvarsfraskrivelse - QuestVibe Games" />
      <div className="disclaimer-page__container">
        <h1 className="disclaimer-page__title" id="disclaimer-title">
          Ansvarsfraskrivelse
        </h1>

        <div className="disclaimer-page__alert" role="alert" aria-label="Viktig advarsel om aldersgrense">
          <h2 className="disclaimer-page__alert-title">18+ ALDERSGRENSE</h2>
          <p className="disclaimer-page__alert-text">
            <strong>QuestVibe er eksklusivt for personer som har fylt 18 år.</strong> Dersom du er under 18 år, har du
            ikke tillatelse til å benytte denne plattformen under noen omstendigheter.
          </p>
        </div>

        <section className="disclaimer-page__section" aria-labelledby="disclaimer-section-1">
          <h2 className="disclaimer-page__section-title" id="disclaimer-section-1">
            1. Kun for underholdningsformål
          </h2>
          <p className="disclaimer-page__text">
            <strong>QuestVibe er utviklet utelukkende for underholdning og sosial interaksjon.</strong> Dette er en
            sosial spillplattform og involverer ikke ekte penger, gevinster eller belønninger av noen art. Vi
            understreker at dette IKKE er en pengespillplattform, og ingen aktiviteter på QuestVibe kan anses som
            gambling.
          </p>
        </section>

        <section className="disclaimer-page__section" aria-labelledby="disclaimer-section-2">
          <h2 className="disclaimer-page__section-title" id="disclaimer-section-2">
            2. Ingen pengespill eller premier
          </h2>
          <p className="disclaimer-page__text">
            <strong>
              Vi tilbyr ikke noen form for pengespill eller mulighet til å vinne premier eller belønninger.
            </strong>{" "}
            Alle aktiviteter, poeng og resultater på plattformen er fullstendig fiktive og har absolutt ingen verdi i
            den virkelige verden. QuestVibe er UTELUKKENDE designet for underholdning og sosial interaksjon.
          </p>
        </section>

        <section className="disclaimer-page__section" aria-labelledby="disclaimer-section-3">
          <h2 className="disclaimer-page__section-title" id="disclaimer-section-3">
            3. Ansvarlig bruk
          </h2>
          <p className="disclaimer-page__text">
            Vi oppfordrer alle brukere til å benytte vår plattform på en ansvarlig og balansert måte. Dersom du opplever
            at aktivitetene på QuestVibe begynner å påvirke ditt daglige liv, humør eller velvære negativt, anbefaler vi
            på det sterkeste at du tar en pause og vurderer å søke profesjonell veiledning.
          </p>
        </section>

        <section className="disclaimer-page__section" aria-labelledby="disclaimer-section-4">
          <h2 className="disclaimer-page__section-title" id="disclaimer-section-4">
            4. Støtteressurser
          </h2>
          <p className="disclaimer-page__text">
            Hvis du eller noen du kjenner opplever utfordringer knyttet til overdreven spilling eller lignende
            aktiviteter, finnes det profesjonell støtte tilgjengelig gjennom organisasjoner som{" "}
            <a
              href="https://hjelpelinjen.no"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Besøk Hjelpelinjen - Åpnes i nytt vindu"
            >
              Hjelpelinjen
            </a>{" "}
            (hjelpelinjen.no),{" "}
            <a
              href="https://gamcare.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Besøk GamCare - Åpnes i nytt vindu"
            >
              GamCare
            </a>{" "}
            (gamcare.org.uk) og{" "}
            <a
              href="https://gambleware.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Besøk GambleAware - Åpnes i nytt vindu"
            >
              GambleAware
            </a>{" "}
            (gambleware.org). Vi oppfordrer til å søke hjelp tidlig hvis du merker tegn på problematisk spilleatferd.
          </p>
        </section>

        <section className="disclaimer-page__section" aria-labelledby="disclaimer-section-5">
          <h2 className="disclaimer-page__section-title" id="disclaimer-section-5">
            5. Innholdsansvarsfraskrivelse
          </h2>
          <p className="disclaimer-page__text">
            Vi gjør vårt ytterste for å sikre at alt innhold på QuestVibe er passende, underholdende og skaper en
            positiv brukeropplevelse. Vi tar imidlertid forbehold om at innholdet kan misforstås eller feiltolkes, og vi
            påtar oss ikke ansvar for eventuelle konsekvenser som måtte oppstå som følge av dette.
          </p>
        </section>

        <section className="disclaimer-page__section" aria-labelledby="disclaimer-section-6">
          <h2 className="disclaimer-page__section-title" id="disclaimer-section-6">
            6. Tekniske utfordringer
          </h2>
          <p className="disclaimer-page__text">
            Vi arbeider kontinuerlig for å opprettholde en stabil og feilfri plattform, men vi kan ikke garantere
            uavbrutt tilgang til tjenesten til enhver tid. Tekniske problemer, vedlikehold eller faktorer utenfor vår
            kontroll kan påvirke tilgjengeligheten. Vi er ikke ansvarlige for eventuelle tap eller ulemper som måtte
            oppstå som følge av slike tekniske utfordringer.
          </p>
        </section>
      </div>
    </main>
  )
}
