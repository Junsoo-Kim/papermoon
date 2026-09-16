import { defineField, defineType } from 'sanity'

// singleton(단일 문서) 패턴: sanity.config.ts의 structureTool 구조에서
// 이 타입의 문서 id를 'about' 하나로 고정해서 여러 개 생성되지 않게 한다.
export default defineType({
  name: 'about',
  title: '단체 소개',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: '제목', type: 'string' }),
    defineField({
      name: 'body',
      title: '소개글',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'bodyEn',
      title: '소개글(영문)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})
