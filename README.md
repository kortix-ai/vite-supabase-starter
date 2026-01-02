# Vite + Supabase Starter

A minimal, blazing-fast starter optimized for **agentic AI tools** like Lovable, Bolt, Cursor, and more.

## ⚡ Stack

| Technology | Purpose |
|------------|---------|
| **Vite** | ~300ms dev server, instant HMR |
| **React 19** | Latest React |
| **TanStack Router** | Type-safe file-based routing |
| **TanStack Query** | Async state management |
| **Supabase** | Auth, database, edge functions (optional) |
| **Tailwind CSS v4** | Utility-first styling |
| **shadcn/ui** | Accessible component library |

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📁 Project Structure

```
├── src/
│   ├── components/           # Reusable components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── error-boundary.tsx
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and clients
│   │   ├── supabase.ts      # Supabase client (optional)
│   │   ├── query-client.ts  # TanStack Query config
│   │   └── utils.ts         # cn() helper
│   ├── routes/              # File-based routes
│   │   ├── __root.tsx       # Root layout (providers)
│   │   ├── _404.tsx         # Not found page
│   │   ├── index.tsx        # /
│   │   └── examples.tsx     # /examples (Supabase patterns)
│   └── main.tsx             # Entry point
└── supabase/
    └── functions/           # Edge Functions (Deno)
        └── hello/           # Example function
```

---

## 🤖 AI Agent Conventions

**These conventions help AI agents understand and extend this codebase consistently.**

### Adding Routes

Create a file in `src/routes/`:

```tsx
// src/routes/dashboard.tsx → /dashboard
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  return <div>Dashboard</div>
}
```

**Dynamic routes:**
```tsx
// src/routes/users/$userId.tsx → /users/:userId
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$userId')({
  component: UserPage,
})

function UserPage() {
  const { userId } = Route.useParams()
  return <div>User {userId}</div>
}
```

**Nested layouts:**
```tsx
// src/routes/_dashboard.tsx → Layout for /dashboard/*
// src/routes/_dashboard/index.tsx → /dashboard
// src/routes/_dashboard/settings.tsx → /dashboard/settings
```

### Data Fetching

Use TanStack Query for all data fetching:

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

function MyComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['items'],
    queryFn: () => fetch('/api/items').then(r => r.json()),
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (newItem) => fetch('/api/items', {
      method: 'POST',
      body: JSON.stringify(newItem),
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['items'] }),
  })
}
```

### Adding UI Components

Use shadcn/ui CLI:

```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

Components are added to `src/components/ui/`.

### Custom Hooks

Place in `src/hooks/` and export from `src/hooks/index.ts`:

```tsx
// src/hooks/use-something.ts
export function useSomething() {
  // ...
}

// src/hooks/index.ts
export { useSomething } from './use-something'
```

### Toast Notifications

```tsx
import { toast } from 'sonner'

toast.success('Saved!')
toast.error('Something went wrong')
toast.loading('Saving...')
```

### Theme Toggle

```tsx
import { ThemeToggle } from '@/components/theme-toggle'
import { useTheme } from '@/components/theme-provider'

// In a component
const { theme, setTheme, resolvedTheme } = useTheme()
```

### Supabase (When Needed)

```tsx
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

if (isSupabaseConfigured()) {
  const { data } = await supabase.from('table').select('*')
}
```

Set in `.env`:
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

---

## 📋 Common Patterns

### Protected Routes (when auth is added)

```tsx
// src/routes/_authenticated.tsx
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const session = await getSession()
    if (!session) throw redirect({ to: '/login' })
  },
  component: AuthenticatedLayout,
})
```

### Form Handling (when needed)

```bash
npm install react-hook-form @hookform/resolvers zod
```

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
})

function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  })
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input {...form.register('email')} />
    </form>
  )
}
```

### API Layer Pattern

```tsx
// src/lib/api/items.ts
import { supabase } from '@/lib/supabase'

export const itemsApi = {
  list: () => supabase!.from('items').select('*'),
  get: (id: string) => supabase!.from('items').select('*').eq('id', id).single(),
  create: (data: CreateItem) => supabase!.from('items').insert(data),
  update: (id: string, data: UpdateItem) => supabase!.from('items').update(data).eq('id', id),
  delete: (id: string) => supabase!.from('items').delete().eq('id', id),
}
```

### Edge Functions (Server-Side Logic)

For backend logic, use Supabase Edge Functions (Deno-based):

```bash
# Install Supabase CLI
npm install -g supabase

# Create a new function
supabase functions new hello

# Deploy
supabase functions deploy hello
```

```ts
// supabase/functions/hello/index.ts
Deno.serve(async (req) => {
  const { name } = await req.json()
  
  return new Response(
    JSON.stringify({ message: `Hello ${name}!` }),
    { headers: { 'Content-Type': 'application/json' } }
  )
})
```

Call from client:

```tsx
const { data } = await supabase.functions.invoke('hello', {
  body: { name: 'World' },
})
```

### Realtime Subscriptions

```tsx
useEffect(() => {
  if (!supabase) return

  const channel = supabase
    .channel('todos')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'todos' },
      (payload) => {
        queryClient.invalidateQueries({ queryKey: ['todos'] })
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [])
```

---

## 📜 Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview build
npm run lint             # ESLint
npm run typecheck        # TypeScript check
npm run clean            # Clear build cache

# Supabase (requires CLI: npm i -g supabase)
npm run supabase:start   # Start local Supabase
npm run supabase:stop    # Stop local Supabase
npm run supabase:status  # Check status
npm run supabase:gen-types  # Generate TS types from DB
npm run supabase:deploy  # Deploy all Edge Functions
npm run supabase:deploy:hello  # Deploy hello function
```

Before using Supabase scripts, set your project ID in `package.json`:
```json
"config": {
  "supabase_project_id": "your-project-id"
}
```

## 🔗 Resources

- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
- [Supabase](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
