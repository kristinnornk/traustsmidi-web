'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'

const projects = [
  {
    title: 'Endurnýjun íbúðar',
    description: 'Íbúð tekin í gegn, meðal annars innréttingar, hurðar, veggir, gólfefni og fleira.',
    images: [
      { src: '/projects/appartment/1.png', alt: 'Íbúð 1' },
      { src: '/projects/appartment/2.png', alt: 'Íbúð 2' },
      { src: '/projects/appartment/3.png', alt: 'Íbúð 3' },
      { src: '/projects/appartment/4.jpeg', alt: 'Íbúð 4' },
      { src: '/projects/appartment/5.jpeg', alt: 'Íbúð 5' },
    ],
  },
  {
    title: 'Milliloft',
    description: 'Smíði millilofts í iðnaðarhúsnæði — nýting á lofthæð til að skapa aukið rými.',
    images: [
      { src: '/projects/milliloft/1.jpeg', alt: 'Milliloft 1' },
      { src: '/projects/milliloft/2.jpeg', alt: 'Milliloft 2' },
      { src: '/projects/milliloft/3.jpeg', alt: 'Milliloft 3' },
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

function ProjectCarousel({ images }: { images: { src: string; alt: string }[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 2)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [checkScroll])

  function scroll(direction: 'left' | 'right') {
    const el = scrollRef.current
    if (!el) return
    const children = Array.from(el.children) as HTMLElement[]
    if (children.length === 0) return
    const gap = parseFloat(getComputedStyle(el).gap) || 0
    const itemWidth = children[0].offsetWidth + gap
    el.scrollBy({ left: direction === 'left' ? -itemWidth : itemWidth, behavior: 'smooth' })
  }

  return (
    <div className="relative mt-6">
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden scrollbar-hide sm:gap-4"
      >
        {images.map((img) => (
          <div
            key={img.src}
            className="relative aspect-[4/3] w-[calc(50%-6px)] shrink-0 snap-start overflow-hidden rounded-xl sm:w-[calc(33.333%-11px)]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        ))}
      </div>

      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 sm:flex items-center justify-center rounded-full bg-background/40 text-muted-foreground transition-all hover:bg-background/70 hover:text-primary"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 sm:flex items-center justify-center rounded-full bg-background/40 text-muted-foreground transition-all hover:bg-background/70 hover:text-primary"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  )
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

        <div className="mt-14 flex flex-col gap-8">
          {projects.map((project, pi) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: pi * 0.15 }}
            >
              <div className="rounded-2xl border border-border bg-secondary p-4 sm:p-6 md:p-8">
                <h3 className="font-heading text-xl font-semibold text-primary">
                  {project.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <ProjectCarousel images={project.images} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
