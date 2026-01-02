import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { toast } from 'sonner'
import { ThemeToggle } from '@/components/theme-toggle'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/examples')({
  component: ExamplesPage,
})

function ExamplesPage() {
  const supabaseReady = isSupabaseConfigured()

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
          <Link to="/" className="font-semibold text-zinc-900 dark:text-zinc-100">
            ← Back
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Supabase Examples
        </h1>
        <p className="mb-8 text-zinc-600 dark:text-zinc-400">
          Patterns for data fetching and server-side logic
        </p>

        {!supabaseReady && (
          <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Supabase not configured.</strong> Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env to see live examples.
            </p>
          </div>
        )}

        <div className="grid gap-8">
          <DataFetchingExample />
          <MutationExample />
          <EdgeFunctionExample />
          <RealtimeExample />
        </div>
      </main>
    </div>
  )
}

function DataFetchingExample() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase not configured')
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
    enabled: isSupabaseConfigured(),
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>1. Data Fetching</CardTitle>
        <CardDescription>Query data with TanStack Query + Supabase</CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`const { data, isLoading } = useQuery({
  queryKey: ['todos'],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },
})`}</code>
        </pre>
        <div className="mt-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
          <p className="text-sm text-zinc-500">
            {isLoading ? 'Loading...' : error ? `Error: ${error.message}` : `Result: ${JSON.stringify(data ?? 'Configure Supabase to see data')}`}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function MutationExample() {
  const [title, setTitle] = useState('')
  const queryClient = useQueryClient()

  const createTodo = useMutation({
    mutationFn: async (title: string) => {
      if (!supabase) throw new Error('Supabase not configured')
      const { data, error } = await supabase
        .from('todos')
        .insert({ title, completed: false })
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast.success('Todo created!')
      setTitle('')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>2. Mutations</CardTitle>
        <CardDescription>Create, update, delete with optimistic updates</CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`const createTodo = useMutation({
  mutationFn: async (title: string) => {
    const { data, error } = await supabase
      .from('todos')
      .insert({ title, completed: false })
      .select()
      .single()
    if (error) throw error
    return data
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
    toast.success('Todo created!')
  },
})`}</code>
        </pre>
        <div className="mt-4 flex gap-2">
          <Input
            placeholder="New todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            onClick={() => createTodo.mutate(title)}
            disabled={!title || createTodo.isPending || !isSupabaseConfigured()}
          >
            {createTodo.isPending ? 'Adding...' : 'Add'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function EdgeFunctionExample() {
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const callEdgeFunction = async () => {
    if (!supabase) {
      toast.error('Supabase not configured')
      return
    }
    setLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke('hello', {
        body: { name: 'World' },
      })
      if (error) throw error
      setResult(JSON.stringify(data, null, 2))
      toast.success('Edge function called!')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>3. Edge Functions</CardTitle>
        <CardDescription>Server-side logic with Supabase Edge Functions (Deno)</CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`// supabase/functions/hello/index.ts
Deno.serve(async (req) => {
  const { name } = await req.json()
  
  return new Response(
    JSON.stringify({ message: \`Hello \${name}!\` }),
    { headers: { 'Content-Type': 'application/json' } }
  )
})

// Client call
const { data } = await supabase.functions.invoke('hello', {
  body: { name: 'World' },
})`}</code>
        </pre>
        <div className="mt-4 flex items-center gap-4">
          <Button onClick={callEdgeFunction} disabled={loading || !isSupabaseConfigured()}>
            {loading ? 'Calling...' : 'Call Edge Function'}
          </Button>
          {result && (
            <code className="text-sm text-zinc-600 dark:text-zinc-400">{result}</code>
          )}
        </div>
        <p className="mt-4 text-sm text-zinc-500">
          Create with: <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-800">supabase functions new hello</code>
        </p>
      </CardContent>
    </Card>
  )
}

function RealtimeExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>4. Realtime Subscriptions</CardTitle>
        <CardDescription>Live updates from the database</CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
          <code>{`useEffect(() => {
  if (!supabase) return

  const channel = supabase
    .channel('todos')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'todos' },
      (payload) => {
        console.log('Change:', payload)
        queryClient.invalidateQueries({ queryKey: ['todos'] })
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [])`}</code>
        </pre>
        <p className="mt-4 text-sm text-zinc-500">
          Enable in Supabase Dashboard → Database → Replication
        </p>
      </CardContent>
    </Card>
  )
}

