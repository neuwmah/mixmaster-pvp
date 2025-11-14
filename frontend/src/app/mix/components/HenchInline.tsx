'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import { getIcon, getSprite } from '@/app/account/components/hench/pets/image/index'
import { getMixFormulas, getHenchHabitat, MixFormula, ZoneHabitat } from '@/app/api/mix'

import { Hench } from '@/types/hench'

interface HenchInlineProps {
  hench: Hench
  isExpanded?: boolean
  onToggle?: (expanded: boolean) => void
}

export default function HenchInline({ hench, isExpanded = false, onToggle }: HenchInlineProps) {
  const [formulas, setFormulas] = useState<MixFormula[]>([])
  const [habitat, setHabitat] = useState<ZoneHabitat[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isExpanded) {
      setFormulas([])
      setHabitat([])
    }
  }, [isExpanded])

  useEffect(() => {
    setFormulas([])
    setHabitat([])
  }, [hench.type])

  const toggleExpanded = async () => {
    const newExpandedState = !isExpanded
    
    if (newExpandedState && formulas.length === 0 && hench.type) {
      setLoading(true)
      try {
        const [formulasData, habitatData] = await Promise.all([
          getMixFormulas(parseInt(hench.type)),
          getHenchHabitat(parseInt(hench.type))
        ])
        setFormulas(formulasData)
        setHabitat(habitatData)
      } catch (error) {
        console.error('Error loading formulas:', error)
      } finally {
        setLoading(false)
      }
    }
    onToggle?.(newExpandedState)
  }

  const getRaceName = (race: number) => {
    switch (race) {
      case 0: return 'Dragon'
      case 1: return 'Devil'
      case 2: return 'Beast'
      case 3: return 'Bird'
      case 4: return 'Insect'
      case 5: return 'Plant'
      case 6: return 'Mystery'
      case 7: return 'Metal'
      default: return 'Unknown'
    }
  }

  return (
    <div
      className={`
        hench-inline
        relative overflow-hidden
        border-[1px] border-(--gray-1) bg-(--gray-0)
      `}
      onClick={!isExpanded ? toggleExpanded : undefined}
    >
      {/* Main inline content */}
      <div className="flex items-center min-h-[4.8rem] px-8 cursor-pointer bg-(--gray-0) duration-[.25s] hover:bg-(--gray-a)" onClick={toggleExpanded}>
        <Image
          unoptimized
          width={40}
          height={40}
          src={getIcon(hench.type ?? '')}
          alt={hench.name}
          className="object-contain w-[3.2rem] h-[3.2rem] mr-4 rounded-full"
          loading="lazy"
        />

        <div className="flex items-center flex-1">
          <h3 className="text-sm font-semibold text-white">
            {hench.name}
          </h3>
          <span className="text-xs font-normal text-white ml-4">
            Lv. {hench.start_base_level || hench.base_level}
          </span>
          {hench.race !== null && hench.race !== undefined && (
            <span className="text-xs font-normal text-(--gray-4) ml-4">
              {getRaceName(hench.race)}
            </span>
          )}
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-(--gray-1) p-8 gap-[1px] flex flex-col">
          {loading ? (
            <p className="text-sm text-center text-white">Loading recipes...</p>
          ) : (
            <>
              <div className="space-y-[1px]">
                <h4 className="text-sm font-semibold text-white mb-2">Status:</h4>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 text-center text-sm gap-[1px]">
                  <p className="py-2 bg-(--gray-a) rounded">
                    Base level: <strong>{hench.start_base_level}</strong>
                  </p>
                  <p className="py-2 bg-(--gray-a) rounded">
                    Max level: <strong>{Number(hench.start_base_level) + 25}</strong>
                  </p>
                  <p className="py-2 bg-(--gray-a) rounded">
                    Type: {hench.race !== null && hench.race !== undefined && (
                      <strong>{getRaceName(hench.race)}</strong>
                    )}
                  </p>
                </div>
              </div>

              {formulas.length > 0 ? (
                <div className="mt-4 space-y-[1px]">
                  <h4 className="text-sm font-semibold text-white mb-2">Recipes:</h4>
                  {formulas.map((formula, index) => (
                    <div 
                      key={index}
                      className="flex flex-wrap items-center justify-center gap-4 text-sm text-white bg-(--gray-a) p-4 rounded"
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          unoptimized
                          width={32}
                          height={32}
                          src={getIcon(formula.main_item.toString())}
                          alt={formula.main_name}
                          className="object-contain w-[3.2rem] h-[3.2rem] rounded-full bg-black"
                          loading="lazy"
                        />
                        <span className="text-sm font-medium">{formula.main_name}</span>
                        <span className="text-xs text-(--gray-4)">
                          Lv. {formula.main_level}
                        </span>
                        <span className="text-xs text-(--gray-4)">
                          {getRaceName(formula.main_race)}
                        </span>
                      </div>
                      <span className="text-(--primary-orange-1) font-bold">+</span>
                      <div className="flex items-center gap-4">
                        <Image
                          unoptimized
                          width={32}
                          height={32}
                          src={getIcon(formula.sub_item.toString())}
                          alt={formula.sub_name}
                          className="object-contain w-[3.2rem] h-[3.2rem] rounded-full bg-black"
                          loading="lazy"
                        />
                        <span className="text-sm font-medium">{formula.sub_name}</span>
                        <span className="text-xs text-(--gray-4)">
                          Lv. {formula.sub_level}
                        </span>
                        <span className="text-xs text-(--gray-4)">
                          {getRaceName(formula.sub_race)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white mt-4">No recipes available for this hench.</p>
              )}

              {habitat.length > 0 && (
                <div className="mt-4 space-y-[1px]">
                  <h4 className="text-sm font-semibold text-white mb-2">Locations:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-[1px]">
                    {habitat.map((zone, index) => {
                      const zoneIdPadded = zone.zone_idx.toString().padStart(3, '0')
                      const mapImageUrl = `https://gamedata.joyplegames.com/mixmaster/data/img/spr/map/mm${zoneIdPadded}.webp`
                      
                      return (
                        <div key={index} className="text-sm text-white bg-(--gray-a) p-6 rounded">
                          <Image
                            unoptimized
                            width={200}
                            height={150}
                            src={mapImageUrl}
                            alt={zone.zone_name}
                            className="w-full h-auto rounded mb-4"
                            loading="lazy"
                          />
                          <div className="font-semibold text-center text-sm mb-2">{zone.zone_name}</div>
                          {zone.drops && zone.drops.length > 0 && (
                            <div className="text-xs leading-8 text-center">
                              {zone.drops.map((drop, dropIndex) => (
                                <p key={dropIndex}>{drop}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}