import { IconName as FontawesomeIconName } from '@fortawesome/fontawesome-svg-core'
import { IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons/faWikipediaW'

type BrandIconName = Extract<FontawesomeIconName, 'wikipedia-w'>

const BrandIcons: { [key in BrandIconName]: IconDefinition } = {
  'wikipedia-w': faWikipediaW,
}

export default BrandIcons
export type { BrandIconName }
