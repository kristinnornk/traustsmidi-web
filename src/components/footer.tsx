import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary py-12 text-primary-foreground sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:gap-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo-dark.png"
              alt="TS"
              width={48}
              height={48}
              unoptimized
              className="brightness-0 invert"
            />
            <p className="font-heading text-xl font-semibold">Traust smíði</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed opacity-70">
            Alhliða smíða- og byggingarþjónusta.
          </p>
        </div>

        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-wider opacity-60">
            Flýtileiðir
          </p>
          <div className="mt-4 flex flex-col gap-3">
            <a href="#services" className="text-sm opacity-70 transition-opacity hover:opacity-100">
              Þjónusta
            </a>
            <a href="#projects" className="text-sm opacity-70 transition-opacity hover:opacity-100">
              Verkefni
            </a>
            <a href="#about" className="text-sm opacity-70 transition-opacity hover:opacity-100">
              Um okkur
            </a>
          </div>
        </div>

        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-wider opacity-60">
            Hafa samband
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm opacity-70">
            <p>Sími: +354 775 2274</p>
            <p>Netfang: traustsmidi@traustsmidi.is</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-primary-foreground/10 px-4 pt-8 sm:px-6">
        <p className="text-sm opacity-50">
          © {new Date().getFullYear()} Traust smíði. Öll réttindi áskilin.
        </p>
      </div>
    </footer>
  )
}
