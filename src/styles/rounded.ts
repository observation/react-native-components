import { RoundedStyle, RoundedStyles } from '../@types/rounded'

export const normal = {
  borderRadius: 4,
  overflow: 'hidden',
} satisfies RoundedStyle

export const large = {
  borderRadius: 8,
  overflow: 'hidden',
} satisfies RoundedStyle

export const huge = {
  borderRadius: 10,
  overflow: 'hidden',
} satisfies RoundedStyle

export const rounded = {
  normal,
  large,
  huge,
} satisfies RoundedStyles
