'use client'

import { Home, Hammer, HardHat, type LucideIcon } from 'lucide-react'
import { motion } from 'motion/react'

const services: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Viðhald og endurbætur',
    description: 'Þak, gluggar, hurðir, gólf og annað sem þarf til að halda eigninni í góðu standi.',
    icon: Home,
  },
  {
    title: 'Trésmíði og smíðaverk',
    description: 'Pallar, klæðningar, loft, milliloft, veggir og sérsmíðaðar lausnir eftir þörfum hvers verkefnis.',
    icon: Hammer,
  },
  {
    title: 'Alhliða húsasmíði',
    description: 'Húsasmíði og byggingarþjónusta — fagleg vinna við smærri sem stærri verkefni.',
    icon: HardHat,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export function Services() {
  return (
    <section id="services" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary md:text-4xl">
            Þjónusta
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Frá smærri verkefnum upp í heildarendurnýjun — alltaf vandað og faglegt.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-md sm:p-8"
            >
              <service.icon className="h-8 w-8 text-accent" strokeWidth={1.5} />
              <h3 className="mt-4 font-heading text-lg font-semibold text-primary">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
