function toMySqlDateTime(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  const yyyy = d.getFullYear()
  const MM = pad(d.getMonth() + 1)
  const dd = pad(d.getDate())
  const hh = pad(d.getHours())
  const mm = pad(d.getMinutes())
  const ss = pad(d.getSeconds())
  return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`
}

export function convertData(v: any): any {
  if (typeof v === 'bigint') return v.toString()
  if (v instanceof Date) return toMySqlDateTime(v)
  if (Array.isArray(v)) return v.map(convertData)
  if (v && typeof v === 'object') {
    const out: any = {}
    for (const k of Object.keys(v)) out[k] = convertData(v[k])
    return out
  }
  return v
}