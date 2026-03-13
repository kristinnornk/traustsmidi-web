'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import imageCompression from 'browser-image-compression'
import { motion } from 'motion/react'

const contactSchema = z.object({
  name: z.string().min(1),
  phone: z.string(),
  email: z.string().min(1).email(),
  description: z.string().min(1),
})

type FormData = z.infer<typeof contactSchema>

interface CompressedImage {
  name: string
  base64: string
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export function Contact() {
  const t = useTranslations('contact')
  const [images, setImages] = useState<CompressedImage[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
  })

  async function handleImages(files: FileList | null) {
    if (!files) return
    const remaining = 3 - images.length
    const selected = Array.from(files).slice(0, remaining)

    const compressed: CompressedImage[] = []
    const newPreviews: string[] = []

    for (const file of selected) {
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      }
      const compressedFile = await imageCompression(file, options)
      const base64 = await toBase64(compressedFile)
      compressed.push({ name: file.name, base64 })
      newPreviews.push(URL.createObjectURL(compressedFile))
    }

    setImages((prev) => [...prev, ...compressed])
    setPreviews((prev) => [...prev, ...newPreviews])
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index])
      return prev.filter((_, i) => i !== index)
    })
  }

  async function onSubmit(data: FormData) {
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, images }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
      setImages([])
      setPreviews([])
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent'

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <motion.div
          className="text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-muted-foreground">{t('subtitle')}</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {status === 'success' ? (
            <div className="mt-10 rounded-lg border border-accent/30 bg-accent/5 p-8 text-center">
              <p className="text-lg font-medium text-primary">{t('success')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col gap-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  {t('name')} *
                </label>
                <input
                  {...register('name', { required: true })}
                  placeholder={t('namePlaceholder')}
                  className={`${inputClass} ${errors.name ? 'border-destructive' : ''}`}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    {t('email')} *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    className={`${inputClass} ${errors.email ? 'border-destructive' : ''}`}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    {t('phone')}
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder={t('phonePlaceholder')}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  {t('description')} *
                </label>
                <textarea
                  {...register('description', { required: true })}
                  rows={5}
                  placeholder={t('descriptionPlaceholder')}
                  className={`${inputClass} resize-y ${errors.description ? 'border-destructive' : ''}`}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  {t('images')}
                </label>
                <p className="mb-2 text-xs text-muted-foreground">{t('imagesHint')}</p>

                {previews.length > 0 && (
                  <div className="mb-3 flex gap-3">
                    {previews.map((src, i) => (
                      <div key={i} className="group relative">
                        <img
                          src={src}
                          alt=""
                          className="h-20 w-20 rounded-lg border border-border object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-white"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {images.length < 3 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-lg border border-dashed border-border px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    + {t('chooseImages')}
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleImages(e.target.files)}
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-destructive">{t('error')}</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {status === 'sending' ? t('sending') : t('submit')}
              </button>
            </form>
          )}
        </motion.div>

        <div className="mx-auto mt-12 flex flex-col items-center justify-center gap-4 border-t border-border pt-8 sm:flex-row sm:gap-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
              <span className="text-lg">📞</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('phone')}</p>
              <a href="tel:+3540000000" className="text-sm font-medium text-primary">
                +354 000 0000
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
              <span className="text-lg">✉️</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t('email')}</p>
              <a href="mailto:info@traustsmidi.is" className="text-sm font-medium text-primary">
                info@traustsmidi.is
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function toBase64(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })
}
