import { Theme } from '../theme'
import { IconName } from './Icons'

type Indicator = { color: string; iconName: IconName }
type RarityConfig = Record<number, Indicator>

const rarityId = {
  unknown: 0,
  common: 1,
}

const rarityConfig = (theme: Theme): RarityConfig => ({
  0: {
    color: theme.color.icon.rarity.unknown,
    iconName: 'question-square',
  },
  1: {
    color: theme.color.icon.rarity.common,
    iconName: 'triangle',
  },
  2: {
    // previously #45D1D6, now #4ad1d6
    color: theme.color.icon.rarity.relativelyCommon,
    iconName: 'square',
  },
  3: {
    color: theme.color.icon.rarity.rare,
    iconName: 'hexagon',
  },
  4: {
    color: theme.color.icon.rarity.veryRare,
    iconName: 'certificate',
  },
})

const Config = {
  rarityId,
  rarityConfig,
}

export default Config
