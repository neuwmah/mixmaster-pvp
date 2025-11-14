'use client'
import React, { useState, useMemo, useCallback, useRef } from 'react'
import Image from 'next/image'

import HenchInline from '@/app/mix/components/HenchInline'

import { Hench } from '@/types/hench'

interface HenchGalleryProps {
  henches: Hench[]
}

export default function HenchGallery({ henches }: HenchGalleryProps) {
  const types = [0,1,2,3,4,5,6,7]
  const [selectedType, setSelectedType] = useState<number | null>(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [displayCount, setDisplayCount] = useState(24)
  const [isLoading, setIsLoading] = useState(false)
  const [expandedHenchId, setExpandedHenchId] = useState<string | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  const filteredHenches = useMemo(() => {
    if (!Array.isArray(henches)) return []
    let filtered = henches
    
    // Filter by search term (ignores race filter when searching)
    if (searchTerm.trim()) {
      filtered = filtered.filter(h => 
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (h.code && h.code.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    } else {
      // Filter by race only when not searching
      if (selectedType !== null) {
        filtered = filtered.filter(h => h.race === selectedType)
      }
    }
    
    // Sort by level (ascending)
    return filtered.sort((a, b) => {
      const levelA = a.start_base_level || a.base_level || 0
      const levelB = b.start_base_level || b.base_level || 0
      return levelA - levelB
    })
  }, [henches, selectedType, searchTerm])

  const displayedHenches = useMemo(() => {
    return filteredHenches.slice(0, displayCount)
  }, [filteredHenches, displayCount])

  const hasMore = displayCount < filteredHenches.length

  // Reset display count and clear search when filter changes
  const handleTypeChange = (type: number | null) => {
    setSelectedType(type)
    setSearchTerm('') // Clear search when selecting race
    setDisplayCount(24)
  }

  // Reset display count and clear race filter when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    setExpandedHenchId(null)
    if (value.trim()) {
      setSelectedType(null) // Clear race filter when searching
    } else {
      setSelectedType(0) // Back to dragon when clearing search
    }
    setDisplayCount(24)
  }

  // Load more function
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return
    
    setIsLoading(true)
    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayCount(prev => prev + 24)
      setIsLoading(false)
    }, 300)
  }, [isLoading, hasMore])

  // Intersection Observer ref callback
  const lastItemRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading) return
    if (observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore()
      }
    }, { rootMargin: '100px' })
    
    if (node) observer.current.observe(node)
  }, [isLoading, hasMore, loadMore])

  return (
    <div className="hench-gallery text-base flex flex-col gap-12 w-full max-w-[1200px]">

      {/* Search Box */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="
              w-full px-4 py-3
              bg-(--gray-0) border border-(--gray-1)
              text-sm text-center text-white placeholder-gray-400
              focus:outline-none focus:border-(--gray-2)
              transition-colors duration-300
            "
          />
        </div>
      </div>

      {/* Filter by Race */}
      <div className="flex flex-wrap gap-8 items-center justify-center">
        {types.map(type => (
          <button
            key={`filter-${type}`}
            type="button"
            onClick={() => handleTypeChange(type)}
            className={`
              relative group
              flex items-center justify-center
              w-[4.8rem] h-[4.8rem]
              transition-all duration-300
              ${selectedType === type ? 'cursor-default' : 'cursor-pointer'}
            `}
            title={`Race ${type}`}
          >
            <Image
              unoptimized
              width={48}
              height={48}
              src={`/assets/images/hench/${type}.gif`}
              alt={`Race ${type}`}
              className="z-1 relative max-w-full max-h-full object-contain"
              loading="lazy"
            />
            <span className={`
              block
              w-full h-[1.6rem] rounded-[100%]
              absolute top-[80%] left-[50%] translate-x-[-50%]
              transition-all duration-300
              ${selectedType === type 
                ? 'bg-(--gray-2)' 
                : 'bg-(--gray-a) group-hover:bg-(--gray-1)'
              }
            `}></span>
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-center">
        <p className="text-base text-white">
          {filteredHenches.length} result{filteredHenches.length !== 1 ? 's' : ''} for {
            searchTerm.trim() ? (
              <><strong>"{searchTerm}"</strong></>
            ) : (
              selectedType === null ? 'all' : (
                <>
                  <strong>
                    {selectedType === 0 ? 'dragon' : ''}
                    {selectedType === 1 ? 'devil' : ''}
                    {selectedType === 2 ? 'beast' : ''}
                    {selectedType === 3 ? 'bird' : ''}
                    {selectedType === 4 ? 'insect' : ''}
                    {selectedType === 5 ? 'plant' : ''}
                    {selectedType === 6 ? 'mystery' : ''}
                    {selectedType === 7 ? 'metal' : ''} type
                  </strong>
                </>
              )
            )
          }
        </p>
      </div>

      {/* Henches List */}
      {Array.isArray(displayedHenches) && displayedHenches.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-[1px] w-full max-w-[700px] mx-auto">
          {displayedHenches.map((h, i) => {
            const isLast = i === displayedHenches.length - 1
            const uniqueId = `${h.type}-${i}`
            return (
              <div
                key={`hench-inline-${i}`}
                ref={isLast ? lastItemRef : null}
              >
                <HenchInline 
                  hench={h} 
                  isExpanded={expandedHenchId === uniqueId}
                  onToggle={(expanded) => setExpandedHenchId(expanded ? uniqueId : null)}
                />
              </div>
            )
          })}
        </div>
      )}

    </div>
  )
}