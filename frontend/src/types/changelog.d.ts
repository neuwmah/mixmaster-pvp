export interface Changelog {
  id: string
  created_at: string | Date
  slug: string
  title: string
  image_src?: string | null
  content1?: string | null
  content2?: string | null
}