import { font, fontSize, lineHeight } from './font'
import { inputStyles } from './input'
import { layout } from './layout'
import { rounded } from './rounded'
import { shadow } from './shadow'
import { default as text } from './text'
import { default as theme } from './theme'

export { font, fontSize, inputStyles, lineHeight, layout, text, theme, shadow, rounded }

// Export styles that are part of the Theme type, but are not used in a specific app
// Until the apps can specify theme overrides, they can import these styles to add them to the theme.
export * from './theme'
