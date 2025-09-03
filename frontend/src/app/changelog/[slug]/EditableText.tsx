"use client"
import React, { useState, useRef } from 'react';

import { updateChangelogField } from '@/app/api/changelog'

import { Changelog } from '@/types/changelog'

interface Props {
  tag?: 'h1' | 'div'
  field: keyof Pick<Changelog,'title'|'content1'|'content2'>
  postId: string
  initialValue?: string | null
  isAdmin: boolean
  className?: string
}

export default function EditableText({ tag = 'div', field, postId, initialValue, isAdmin, className }: Props) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(initialValue || '')
  const [draft, setDraft] = useState(value)
  const [saving, setSaving] = useState(false)
  const [h, setH] = useState<number | undefined>()
  const [lh, setLh] = useState<string | undefined>()
  const viewRef = useRef<HTMLElement | null>(null)
  const Tag: any = tag
  
  async function save() {
    if (!isAdmin) return
    if (draft === value) { setEditing(false); return }
    
    setSaving(true)
    
    const updated = await updateChangelogField(postId, { [field]: draft } as any)
    if (updated) setValue((updated as any)[field] || '')
    
    setSaving(false)
    setEditing(false)
  }

  if (!isAdmin)
    return <Tag className={className} >{value}</Tag>

  if (editing)
    console.log('h', h)
  if (editing) {
    const multiline = field !== 'title' && (draft.length > 120 || draft.includes('\n'))
    const Input: any = multiline ? 'textarea' : 'input'
    return <Input 
      autoFocus 
      disabled={saving} 
      className={className + " outline-none border-none w-full overflow-hidden resize-none"} 
      style={{ height: h, lineHeight: lh }} 
      value={draft} 
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDraft((e as any).target.value)} 
      onKeyDown={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const k = (e as any).key; 
        if (k === 'Escape') { setEditing(false); setDraft(value) } 
        if (k === 'Enter' && !(e as any).shiftKey) { e.preventDefault(); save() }
      }} 
      onBlur={save} 
    />
  }

  if (!editing)
    return <Tag
      className={`${className} group relative cursor-pointer whitespace-pre-line`}
      ref={viewRef as any}
      onClick={() => { 
        console.log('viewRef', viewRef)
        if (viewRef.current) { 
          const r = viewRef.current.getBoundingClientRect();
          console.log('r', r) 
          console.log('r.height', r.height) 
          setH(r.height); 
          const cs = window.getComputedStyle(viewRef.current); 
          setLh(cs.lineHeight);
        } 
        setDraft(value); 
        setEditing(true) 
      }}
    >
      <span className="text-base absolute top-[50%] translate-y-[-50%] right-[calc(100%+1.6rem)] opacity-0 duration-[.25s] group-hover:opacity-100">
        ✏️
      </span>
      {value}
    </Tag>
}
