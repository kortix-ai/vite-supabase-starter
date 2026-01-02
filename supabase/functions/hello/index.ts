// @ts-nocheck
// This file runs on Supabase Edge Functions (Deno runtime)
// Deploy with: supabase functions deploy hello
Deno.serve(async (req) => {
  const { name } = await req.json()

  const data = {
    message: `Hello ${name}!`,
    timestamp: new Date().toISOString(),
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
})
