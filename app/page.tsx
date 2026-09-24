import Link from 'next/link'
import { createServerClient } from '@/lib/supabase'

export default async function Home() {
  const supabase = await createServerClient()
  const { data: projects } = await supabase.from('projects').select('id,slug,title,subtitle,year,description,cover_image_url').eq('status','published').order('sort_order')
  return <><header className="site-header"><Link href="/">RICHARD YATES</Link><nav><Link href="#projects">Projects</Link><Link href="/admin">Admin</Link></nav></header><main><section className="home-intro"><div className="eyebrow">An ongoing photographic study · 2026—</div><h1>Self<br/><em>Portraiture</em></h1><p>A collection of photographic projects exploring identity, vulnerability, intimacy, the body and the relationship between photographer and viewer.</p></section><section id="projects" className="project-grid" aria-label="Projects">{(projects ?? []).map((p:any)=><Link className="project-card" href={`/projects/${p.slug}`} key={p.id}><figure><img src={p.cover_image_url || '/demo/red-room-01.svg'} alt="" /></figure><h2>{p.title}</h2><div className="card-meta"><span>{p.subtitle}</span><span>{p.year}</span></div>{p.description&&<p className="card-desc">{p.description}</p>}</Link>)}</section></main><footer className="site-footer"><span>Richard Yates / Self Portraiture</span><span>Independent publication</span></footer></>
}
