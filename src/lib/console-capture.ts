export function initConsoleCapture() {
  if (typeof window === 'undefined') return

  const win = window as Window & { __consoleCaptureInstalled?: boolean }
  if (win.__consoleCaptureInstalled || window === window.top) return
  win.__consoleCaptureInstalled = true

  const methods = ['log', 'warn', 'error', 'info', 'debug'] as const

  methods.forEach((method) => {
    const original = console[method]
    console[method] = function (...args: unknown[]) {
      original.apply(console, args)
      try {
        window.parent.postMessage(
          {
            type: 'console',
            method,
            args: args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))),
          },
          '*'
        )
      } catch {
        /* ignore */
      }
    }
  })

  window.onerror = function (message, _source, _lineno, _colno, error) {
    window.parent.postMessage(
      {
        type: 'console',
        method: 'error',
        args: ['Uncaught: ' + (error?.stack || message)],
      },
      '*'
    )
  }
}
