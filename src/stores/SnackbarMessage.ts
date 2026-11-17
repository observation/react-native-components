type SnackbarAction = {
  onPress: () => void
  text: string
}

export type SnackbarMessageParams = {
  text: string
  closable?: boolean
  action?: SnackbarAction
  /** Called when the message is dismissed by the user or the auto-dismiss timer, not when it is replaced or hidden */
  onDismiss?: () => void
}

let nextId = 0

export class SnackbarMessage {
  /** Unique per message, so a replaced message is rendered as a new snackbar */
  readonly id: number
  readonly text: string
  readonly closable?: boolean
  readonly action?: SnackbarAction
  readonly onDismiss?: () => void

  constructor(params: SnackbarMessageParams) {
    this.id = nextId++
    this.text = params.text
    this.closable = params.closable
    this.action = params.action
    this.onDismiss = params.onDismiss
  }

  get isAutoDismissible(): boolean {
    return !this.closable && !this.action
  }
}
