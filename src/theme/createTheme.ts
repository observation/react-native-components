import { deepMerge } from '../lib/Utils'
import { animation } from './tokens/animation'
import { color } from './tokens/color'
import { elevation } from './tokens/elevation'
import { createFont } from './tokens/font'
import { fontSize } from './tokens/fontSize'
import { gradient } from './tokens/gradient'
import { icon } from './tokens/icon'
import { lineHeight } from './tokens/lineHeight'
import { margin } from './tokens/margin'
import { overlay } from './tokens/overlay'
import { createShadow } from './tokens/shadow'
import { surface } from './tokens/surface'
import { createTextStyles } from './tokens/text'
import { Color, Font, Shadow, Text, Theme } from './types'

type ThemeInput = Omit<Partial<Theme>, 'color'> & { color?: Partial<Color> }

/** Theme sections that are derived from other sections, an override of these is applied after deriving them */
const derivedSections = ['font', 'text', 'shadow'] as const

export const createTheme = (overrides: ThemeInput = {}): Theme => {
  const tokens: Theme = {
    color,
    overlay,
    gradient,
    margin,
    icon,
    animation,
    surface,
    elevation,
    fontSize,
    lineHeight,
    font: {} as Font,
    text: {} as Text,
    shadow: {} as Shadow,
  }
  const theme = deepMerge(tokens, overrides as Partial<Theme>)

  const backgroundColor = theme.color.background.system
  theme.color = {
    ...theme.color,
    background: {
      ...theme.color.background,
      system: { ...backgroundColor, screen: backgroundColor[theme.surface.screen] },
    },
  }
  theme.font = createFont(theme)
  theme.text = createTextStyles(theme)
  theme.shadow = createShadow(theme)

  const derivedOverrides = Object.fromEntries(
    Object.entries(overrides).filter(([key]) => (derivedSections as readonly string[]).includes(key)),
  )
  return deepMerge(theme, derivedOverrides as Partial<Theme>)
}
