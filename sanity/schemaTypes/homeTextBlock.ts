import { defineField, defineType } from 'sanity'

// 홈 화면 스크롤 섹션 중 "크게 자간 벌린 텍스트만 있는" 블록.
// 레퍼런스 사이트의 'A N D A M I R O' 같은 자간 넓은 브랜드 문구 스타일.
export default defineType({
  name: 'homeTextBlock',
  title: '텍스트 블록',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: '문구',
      type: 'string',
      description: '가운데 정렬, 큰 글씨로 표시됩니다. (예: ART COMPANY)',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'text' },
    prepare: ({ title }) => ({ title, subtitle: '텍스트 블록' }),
  },
})
