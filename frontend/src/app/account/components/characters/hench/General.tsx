'use client'
import React, { useEffect, useState } from 'react'

import PetInline from '@/app/account/components/characters/hench/pets/Inline'

import { Hench } from '@/types/hench'

interface GeneralProps {
  selectedHench?: Array<string>
  setSelectedHench?: (value: Array<string>) => void
}

export default function General({ selectedHench = [], setSelectedHench = () => {} }: GeneralProps) {
  const [henches, setHenches] = useState<Hench[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const baseEnv = process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.BACKEND_API_URL || ''
    if (!baseEnv) { setError('API URL not configured'); setLoading(false); return }
    ;(async () => {
      try {
        const res = await fetch(`${baseEnv}/hench?active=true`, { cache: 'no-store' })
        if (!res.ok) throw new Error('failed')
        const data: Hench[] = await res.json()
        setHenches(Array.isArray(data) ? data : [])
      } catch { setError('Error loading hench list.') }
      finally { setLoading(false) }
    })()
  }, [])

  return (
    <div className="general text-base flex flex-col gap-8 w-full max-w-[1000px]">
      {!loading && !error && henches.length > 0 && (
        <div className="flex flex-col gap-6 w-full">
          {henches
            .slice()
            .sort((a, b) => Number(b.active) - Number(a.active) || a.name.localeCompare(b.name))
            .map(h => <PetInline key={h.id} hench={h} selectedHench={selectedHench} setSelectedHench={setSelectedHench} />)}
        </div>
      )}
    </div>
  )
}