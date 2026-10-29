import { createContext } from 'react'

/**
 * Used by the focused screen to report what the snackbar needs to know: the content insets at the bottom of the
 * screen, and open modals
 */
type SnackbarReporter = {
  /** Set the height of a UI element at the bottom of the screen, excluding the bottom safe area inset */
  setContentInset: (id: string, height: number) => void

  /** Remove the height of a UI element at the bottom of the screen */
  removeContentInset: (id: string) => void

  /** A modal screen is open, the snackbar is suppressed until it is closed */
  addOpenModal: (id: string) => void

  /** A modal screen is closed */
  removeOpenModal: (id: string) => void
}

const SnackbarReporterContext = createContext<SnackbarReporter | undefined>(undefined)

export default SnackbarReporterContext
export type { SnackbarReporter }
