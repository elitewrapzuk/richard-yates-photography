import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase'

export default async function Admin() {
  const s = await createServerClient(); const { data: { user } } = await s.auth.getUser(); if (!user) redirect('/admin/login')
  const [{ count: projects }, { count: published }, { count: visitors }, { data: recent }] = await Promise.all([
    s.from('projects').select('*', { count: 'exact', head: true }), s.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'published'), s.from('visitor_access').select('*', { count: 'exact', head: true }), s.from('visitor_access').select('name,email,created_at,projects(title)').order('created_at', { ascending: false }).limit(8)
  ])
  return <main className="admin"><header className="site-header"><Link href="/">RICHARD YATES</Link><nav><Link href="/admin">Overview</Link><Link href="/admin/projects">Projects</Link><Link href="/admin/visitors">Visitors</Link><Link href="/admin/logout">Sign out</Link></nav></header><p className="eyebrow">Private studio</p><h1>Overview</h1><div className="admin-grid"><div className="stat">Projects<strong>{projects || 0}</strong></div><div className="stat">Published<strong>{published || 0}</strong></div><div className="stat">Visitors<strong>{visitors || 0}</strong></div><div className="stat">Session<strong>Secure</strong></div></div><div className="row" style={{justifyContent:'space-between'}}><h2>Recent visitors</h2><Link className="admin-link" href="/admin/visitors">View all →</Link></div><table className="admin-table"><thead><tr><th>Name</th><th>Email</th><th>Project</th><th>Date</th></tr></thead><tbody>{(recent || []).map((v:any)=><tr key={v.created_at+v.email}><td>{v.name}</td><td>{v.email}</td><td>{v.projects?.title || '—'}</td><td>{new Date(v.created_at).toLocaleString()}</td></tr>)}</tbody></table></main>
}
