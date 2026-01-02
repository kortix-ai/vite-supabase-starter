import { createFileRoute } from '@tanstack/react-router'
import { AnimatedBackground } from '@/components/animated-background'
import { ThemeToggle } from '@/components/theme-toggle'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const stack = [
  { name: 'Vite', icon: '⚡' },
  { name: 'React 19', icon: '⚛️' },
  { name: 'TanStack', icon: '🧭' },
  { name: 'Supabase', icon: '⚡' },
  { name: 'Tailwind', icon: '🎨' },
  { name: 'shadcn/ui', icon: '✨' },
]

function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      <AnimatedBackground />
      <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">V</span>
          </div>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">vite-starter</span>
        </div>
        <ThemeToggle />
      </header>
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-1.5 text-sm text-zinc-600 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Ready for AI agents
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl dark:text-zinc-50">
            AI-friendly
            <span className="block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              Vite + Supabase
            </span>
            starter
          </h1>
          <p className="mx-auto mb-8 max-w-md text-lg text-zinc-600 dark:text-zinc-400">
            Minimal. Fast. Type-safe. Built for agentic AI tools.
          </p>
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            {stack.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white/60 px-3 py-1.5 text-sm font-medium text-zinc-700 backdrop-blur-sm transition-colors hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:bg-zinc-900"
              >
                <span>{tech.icon}</span>
                {tech.name}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/examples"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              View Examples
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white/80 px-6 font-medium text-zinc-900 backdrop-blur-sm transition-colors hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-center px-6 py-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          ~300ms dev server • Instant HMR • Type-safe routing
        </p>
      </footer>
    </div>
  )
}
