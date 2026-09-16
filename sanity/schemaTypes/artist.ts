import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'artist',
  title: '단원',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '이름',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'role', title: '직함/파트', type: 'string' }),
    defineField({
      name: 'photo',
      title: '사진',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'bio', title: '소개글', type: 'text' }),
  ],
})
