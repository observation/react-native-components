import { deepMerge } from '../lib/Utils'
import { animation } from './tokens/animation'
import { color } from './tokens/color'
import { createFont } from './tokens/font'
import { fontSize } from './tokens/fontSize'
import { gradient } from './tokens/gradient'
import { icon } from './tokens/icon'
import { lineHeight } from './tokens/lineHeight'
import { margin } from './tokens/margin'
import { overlay } from './tokens/overlay'
import { createTextStyles } from './tokens/text'
import { Color, Font, Text, Theme } from './types'

type ThemeInput = Omit<Partial<Theme>, 'color'> & { color?: Partial<Color> }

export const createTheme = (overrides: ThemeInput = {}): Theme => {
  const theme: Theme = {
    color,
    overlay,
    gradient,
    margin,
    icon,
    animation,
    fontSize,
    lineHeight,
    font: {} as Font,
    text: {} as Text,
  }

  theme.font = createFont(theme)
  theme.text = createTextStyles(theme)

  return deepMerge(theme, overrides as Partial<Theme>)
}
