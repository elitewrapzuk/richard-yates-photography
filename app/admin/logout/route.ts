import { createServerClient } from '@/lib/supabase';import { redirect } from 'next/navigation'
export async function GET(){const s=await createServerClient();await s.auth.signOut();redirect('/admin/login')}
