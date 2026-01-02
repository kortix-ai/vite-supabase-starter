import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.12),transparent_50%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-12"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">About This Starter</h1>

        <div className="prose prose-invert prose-zinc max-w-none">
          <p className="text-xl text-zinc-400 leading-relaxed mb-8">
            This is a modern, production-ready starter template designed specifically for agentic AI
            tools that generate and modify code.
          </p>

          <div className="grid gap-8 mb-12">
            <section className="p-6 rounded-2xl bg-zinc-800/50 border border-zinc-700/50">
              <h2 className="text-2xl font-semibold text-white mb-4">The Stack</h2>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">⚡</span>
                  <div>
                    <strong className="text-white">Vite</strong> — Sub-second dev server, instant
                    HMR
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">⚛</span>
                  <div>
                    <strong className="text-white">React 19</strong> — Latest React with concurrent
                    features
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">🧭</span>
                  <div>
                    <strong className="text-white">TanStack Router</strong> — Type-safe file-based
                    routing
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-1">📦</span>
                  <div>
                    <strong className="text-white">TanStack Query</strong> — Powerful async state
                    management
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">🗄</span>
                  <div>
                    <strong className="text-white">Supabase</strong> — Auth, database, edge
                    functions (optional)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">🎨</span>
                  <div>
                    <strong className="text-white">Tailwind CSS v4</strong> — Utility-first styling
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-zinc-400 mt-1">🧩</span>
                  <div>
                    <strong className="text-white">shadcn/ui</strong> — Beautiful, accessible
                    components
                  </div>
                </li>
              </ul>
            </section>

            <section className="p-6 rounded-2xl bg-zinc-800/50 border border-zinc-700/50">
              <h2 className="text-2xl font-semibold text-white mb-4">Why This Stack?</h2>
              <div className="space-y-4 text-zinc-300">
                <p>
                  Traditional Next.js setups can be slow for rapid iteration. This stack optimizes
                  for the fastest possible development experience:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>~300ms dev server startup (vs 2-5s with Next.js)</li>
                  <li>Blazing fast HMR with Vite</li>
                  <li>Much faster build times</li>
                  <li>Direct database access with Supabase RLS</li>
                  <li>Edge Functions for server logic when needed</li>
                </ul>
              </div>
            </section>

            <section className="p-6 rounded-2xl bg-zinc-800/50 border border-zinc-700/50">
              <h2 className="text-2xl font-semibold text-white mb-4">Getting Started</h2>
              <div className="space-y-4 text-zinc-300">
                <p>
                  To connect Supabase, add your credentials to{' '}
                  <code className="px-2 py-1 rounded bg-zinc-700 text-emerald-400">.env</code>:
                </p>
                <pre className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 overflow-x-auto">
                  <code className="text-sm text-zinc-300">
                    {`VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key`}
                  </code>
                </pre>
                <p className="text-zinc-400 text-sm">
                  Supabase is optional — the app works fine without it for pure frontend projects.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
