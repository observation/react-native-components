/* eslint-disable observation/no-function-without-logging */
import { createContext, useContext, useMemo } from 'react'

import { defaultTheme } from './defaultTheme'
import { Theme } from './types'

const ThemeContext = createContext<Theme>(defaultTheme)

/**
 * Provider component to supply the theme to the component tree.
 *
 * @param theme The theme object to provide to the component tree.
 * @param children The child components that will have access to the theme.
 * @returns A React element that provides the theme context to its children.
 */
export const ThemeProvider = ({ theme, children }: { theme: Theme; children: React.ReactNode }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
)

/**
 * Hook to access the current theme.
 * @returns The current theme object.
 */
export const useTheme = (): Theme => useContext(ThemeContext)

/**
 * Hook to create memoized styles based on the current theme.
 *
 * @param stylesFactory A function that takes the current theme and returns a styles object.
 * @returns The memoized styles object.
 */
export const useStyles = <T,>(stylesFactory: (theme: Theme) => T): T => {
  const theme = useTheme()
  return useMemo(() => stylesFactory(theme), [stylesFactory, theme])
}
