'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

const projectImages = [
  { src: '/projects/1.png', alt: 'Íbúð 1' },
  { src: '/projects/2.png', alt: 'Íbúð 2' },
  { src: '/projects/3.png', alt: 'Íbúð 3' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary md:text-4xl">
            Verkefni
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Nokkur verkefni sem við höfum unnið.
          </p>
        </motion.div>

        <motion.div
          className="mt-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="rounded-2xl border border-border bg-secondary p-4 sm:p-6 md:p-8">
            <h3 className="font-heading text-xl font-semibold text-primary">
              Íbúðaendurnýjun
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Íbúðin er ný endurnýjuð meðal annars allar innréttingar, gólfefni og rafmagn yfirfarið.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {projectImages.map((img, i) => (
                <motion.div
                  key={img.src}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                  className={`relative aspect-[4/3] overflow-hidden rounded-xl ${i === 2 ? 'hidden md:block' : ''}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
