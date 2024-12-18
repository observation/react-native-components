import { IconName as FontawesomeIconName } from '@fortawesome/fontawesome-svg-core'
import { IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons/faWikipediaW'

type IconName = Extract<FontawesomeIconName, 'wikipedia-w'>

const BrandIcons: { [key in IconName]: IconDefinition } = {
  'wikipedia-w': faWikipediaW,
}

export default BrandIcons
