'use client'
import React, { useEffect, useState } from 'react'

import PetCard from '@/app/account/components/characters/hench/pets/Card'

import { Hench } from '@/types/hench'
import { Character } from '@/types/character'

interface GeneralProps {
  character: Character | false
}

export default function General({ character }: GeneralProps) {
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
      } catch { setError('Falha ao carregar hench list.') }
      finally { setLoading(false) }
    })()
  }, [])

  function Row({ label, children }: { label: string; children: React.ReactNode }) {
    return (
      <div className="flex items-stretch">
        <span className="text-xs font-bold flex items-center justify-center w-[8rem] rounded-l-[.8rem] bg-(--primary-orange-1)">{label}</span>
        <span className="text-xs text-(--gray-0) flex items-center overflow-hidden bg-(--white) rounded-r-[.8rem] flex-1 min-w-0 h-[3.2rem] px-[.8rem]">{children}</span>
      </div>
    )
  }

  return (
    <div className="general text-base flex flex-col gap-8 w-full max-w-[1000px]">
      {loading && <p className="text-center">Carregando...</p>}
      {!loading && error && <p className="text-center">{error}</p>}
      {!loading && !error && !henches.length && <p className="text-center">No hench records.</p>}
      {!loading && !error && henches.length > 0 && (
        <div className="grid gap-[1.6rem] sm:grid-cols-2 xl:grid-cols-3 w-full">
          {henches
            .slice()
            .sort((a, b) => Number(b.active) - Number(a.active) || a.name.localeCompare(b.name))
            .map(h => <PetCard key={h.id} hench={h} />)}
        </div>
      )}
    </div>
  )
}