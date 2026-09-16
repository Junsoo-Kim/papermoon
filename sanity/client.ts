import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // 배포본(prod)은 Sanity CDN 캐시 사용(속도↑, 반영까지 최대 수십 초 지연될 수 있음).
  // 로컬 개발 중엔 CDN을 거치지 않아야 Studio에서 등록한 내용이 바로 보인다.
  useCdn: process.env.NODE_ENV === 'production',
})
