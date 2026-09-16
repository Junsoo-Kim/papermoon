import { defineField, defineType } from 'sanity'

// 홈 화면 스크롤 섹션 중 캡션 없이 사진만 그리드로 보여주는 블록.
export default defineType({
  name: 'homeImageGrid',
  title: '사진 그리드',
  type: 'object',
  fields: [
    defineField({
      name: 'columns',
      title: '한 줄에 몇 장',
      type: 'number',
      options: {
        list: [2, 3, 4],
        layout: 'radio',
      },
      initialValue: 3,
    }),
    defineField({
      name: 'images',
      title: '사진들',
      description:
        '파일 탐색기에서 여러 장을 한 번에 선택(Ctrl/Shift+클릭)해서 이 영역에 드래그하면 한 번에 추가됩니다.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: { layout: 'grid' },
      validation: (r) => r.min(1),
    }),
  ],
  preview: {
    select: { media: 'images.0', count: 'images.length' },
    prepare: ({ media, count }) => ({
      title: `사진 그리드 (${count || 0}장)`,
      media,
    }),
  },
})
