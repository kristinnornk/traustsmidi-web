"use client";

import Image from "next/image";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative min-h-screen pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:gap-12 sm:px-6 md:grid-cols-2 md:py-32">
        {/* Text */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl md:text-5xl lg:text-6xl">
            Traust og fagleg smíðaþjónusta
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
            Alhliða húsasmíði, viðhald og endurbætur.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
            <a
              href="#contact"
              className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:px-7 sm:py-3.5"
            >
              Fá tilboð
            </a>
            <a
              href="#projects"
              className="rounded-lg border border-border px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-secondary sm:px-7 sm:py-3.5"
            >
              Sjá verkefni →
            </a>
          </div>
          <div className="mt-8 flex gap-8 border-t border-border pt-6 sm:mt-12 sm:gap-10 sm:pt-8">
            <div>
              <p className="font-heading text-2xl font-bold text-accent sm:text-3xl">
                10+
              </p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Ára reynsla
              </p>
            </div>
            <div>
              <p className="font-heading text-2xl font-bold text-accent sm:text-3xl">
                100%
              </p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Ánægja
              </p>
            </div>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          className="relative aspect-[4/3] overflow-hidden rounded-2xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Image
            src="/projects/3.png"
            alt="Verkefni"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
