import { createServerClient as createSSR } from '@supabase/ssr'
import { cookies } from 'next/headers'
export async function createServerClient(){const c=await cookies();return createSSR(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{cookies:{getAll(){return c.getAll()},setAll(items){try{items.forEach(({name,value,options})=>c.set(name,value,options))}catch{}}}})}
