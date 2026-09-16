import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'
import { projectId, dataset, apiVersion } from './sanity/env'

export default defineConfig({
  name: 'default',
  title: '연극단 관리자',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .id('content')
          .title('콘텐츠')
          .items([
            S.listItem()
              .id('home')
              .title('홈페이지')
              .child(
                S.document()
                  .id('home')
                  .schemaType('home')
                  .documentId('home'),
              ),
            S.listItem()
              .id('about')
              .title('단체 소개')
              .child(
                S.document()
                  .id('about')
                  .schemaType('about')
                  .documentId('about'),
              ),
            S.documentTypeListItem('performance').title('공연'),
            S.documentTypeListItem('artist').title('단원'),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
})
