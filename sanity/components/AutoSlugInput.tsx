import { useEffect, useRef } from 'react'
import { SlugInput, set, useFormValue } from 'sanity'
import type { SlugInputProps } from 'sanity'

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

// 제목을 입력하는 즉시 슬러그를 자동 생성한다.
// 사용자가 슬러그를 직접 수정한 뒤에는(직전 자동생성값과 달라지면) 더 이상 덮어쓰지 않는다.
export function AutoSlugInput(props: SlugInputProps) {
  const { value, onChange, schemaType } = props
  const sourceField = (schemaType.options?.source as string) || 'title'
  const sourceValue = useFormValue([sourceField]) as string | undefined
  const lastAutoSlug = useRef<string | undefined>(value?.current)

  useEffect(() => {
    if (!sourceValue) return

    const generated = slugify(sourceValue)
    const isUntouched = !value?.current || value.current === lastAutoSlug.current

    if (isUntouched && generated && generated !== value?.current) {
      lastAutoSlug.current = generated
      onChange(set({ _type: 'slug', current: generated }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceValue])

  return <SlugInput {...props} />
}
