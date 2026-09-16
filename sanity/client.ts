import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // 배포본은 CDN 캐시 사용 (속도↑)
})
