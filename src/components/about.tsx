'use client'

import { motion } from 'motion/react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export function About() {
  return (
    <section id="about" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 sm:gap-12 md:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl font-bold tracking-tight text-primary md:text-4xl">
              Um okkur
            </h2>
            <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-muted-foreground sm:text-lg">
              {'Traust smíði var stofnað af Emil Breka Kristinssyni, húsasmíðameistara með yfir 10 ára reynslu í alhliða smíða- og byggingarþjónustu.\n\nLögð er áhersla á vandaða vinnu, áreiðanleika og góð samskipti frá upphafi til enda.'}
            </p>
          </motion.div>
          <motion.div
            className="flex justify-center gap-4 sm:gap-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-xl border border-border bg-background px-6 py-6 text-center sm:px-10 sm:py-8">
              <p className="font-heading text-3xl font-bold text-accent sm:text-4xl">
                10+
              </p>
              <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                Ára reynsla
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background px-6 py-6 text-center sm:px-10 sm:py-8">
              <p className="font-heading text-3xl font-bold text-accent sm:text-4xl">
                100%
              </p>
              <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                Ánægja
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
