'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'

const navLinks = [
  { label: 'Þjónusta', href: '#services' },
  { label: 'Verkefni', href: '#projects' },
  { label: 'Um okkur', href: '#about' },
] as const

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <nav className="fixed top-0 z-[60] w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-2 font-heading text-lg font-semibold text-primary sm:gap-2.5 sm:text-xl">
            <Image src="/logo-dark.png" alt="TS" width={28} height={28} className="shrink-0 sm:h-8 sm:w-8" unoptimized />
            <span className="truncate">Traust smíði</span>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Hafa samband
            </a>
          </div>

          {/* Mobile: contact button + hamburger */}
          <div className="flex items-center gap-5 md:hidden">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Hafa samband
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="relative z-[60] flex flex-col gap-1.5"
              aria-label="Menu"
            >
              <span
                className={`h-0.5 w-6 bg-primary transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`}
              />
              <span
                className={`h-0.5 w-6 bg-primary transition-opacity ${open ? 'opacity-0' : ''}`}
              />
              <span
                className={`h-0.5 w-6 bg-primary transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — full-screen overlay via portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-0 z-[55] flex flex-col items-center justify-center bg-[#FBFBFD] md:hidden"
              >
                <div className="flex flex-col items-center gap-8">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="text-2xl font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                  <motion.a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + navLinks.length * 0.05 }}
                    className="text-2xl font-medium text-foreground transition-colors hover:text-primary"
                  >
                    Hafa samband
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}
