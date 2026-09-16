import { defineField, defineType } from 'sanity'

// singleton(단일 문서) 패턴: sanity.config.ts에서 문서 id를 'home' 하나로 고정한다.
export default defineType({
  name: 'home',
  title: '홈페이지',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: '스크롤 섹션 (히어로 아래)',
      description:
        '메인 화면 사진 캐러셀 아래로 스크롤하면 나오는 섹션들입니다. "텍스트 블록"과 "사진 그리드"를 자유롭게 추가/순서변경할 수 있습니다.',
      type: 'array',
      of: [{ type: 'homeTextBlock' }, { type: 'homeImageGrid' }],
    }),
  ],
})
