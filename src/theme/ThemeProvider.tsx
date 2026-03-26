/* eslint-disable observation/no-function-without-logging */
import { createContext, useContext, useMemo } from 'react'

import { Theme } from '../@types/theme'
import defaultTheme from '../styles/theme'

const ThemeContext = createContext<Theme>(defaultTheme)

export const ThemeProvider = ({ theme, children }: { theme: Theme; children: React.ReactNode }) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)

export const useStyles = <T,>(stylesFactory: (theme: Theme) => T): T => {
  const theme = useTheme()
  return useMemo(() => stylesFactory(theme), [theme])
}
