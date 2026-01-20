declare global {
  function requestIdleCallback(
    callback: (deadline: { timeRemaining(): number; didTimeout: boolean }) => void,
    options?: { timeout: number },
  ): number

  function cancelIdleCallback(handle: number): void
}

export {}
