import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Analytics } from '@vercel/analytics/next'
import '../globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Traust smíði — Fagleg smíðaþjónusta',
    template: '%s | Traust smíði',
  },
  description:
    'Húsasmíðameistari með yfir 10 ára reynslu í alhliða smíða- og byggingarþjónustu. Viðhald, trésmíði og alhliða húsasmíði.',
  metadataBase: new URL('https://traustsmidi.is'),
  openGraph: {
    title: 'Traust smíði — Fagleg smíðaþjónusta',
    description:
      'Húsasmíðameistari með yfir 10 ára reynslu í alhliða smíða- og byggingarþjónustu.',
    url: 'https://traustsmidi.is',
    siteName: 'Traust smíði',
    locale: 'is_IS',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Traust smíði',
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo-dark.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
