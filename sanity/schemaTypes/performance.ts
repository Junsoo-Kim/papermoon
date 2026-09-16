import { defineField, defineType } from 'sanity'
import { AutoSlugInput } from '../components/AutoSlugInput'

export default defineType({
  name: 'performance',
  title: '공연',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '공연명',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL 슬러그',
      type: 'slug',
      options: { source: 'title' },
      components: { input: AutoSlugInput },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'date', title: '공연 일시', type: 'datetime' }),
    defineField({ name: 'venue', title: '장소', type: 'string' }),
    defineField({ name: 'summary', title: '한 줄 소개', type: 'text' }),
    defineField({
      name: 'body',
      title: '상세 설명',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'mainImage',
      title: '대표 사진',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: '갤러리 사진',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
})
