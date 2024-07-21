import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {myStructure} from './deskStructure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Campo Base Project',

  projectId: 'oyfix3ky',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: myStructure,
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
