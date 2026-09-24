import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import { createServerClient } from '@/lib/supabase'
import AccessGate from '@/components/AccessGate'
import ProjectBlocks from '@/components/ProjectBlocks'

export default async function ProjectPage({params}:{params:{slug:string}}) {
  const supabase=await createServerClient(); const {data:p}=await supabase.from('projects').select('*,project_blocks(*)').eq('slug',params.slug).eq('status','published').single(); if(!p)notFound()
  const hasAccess=(await headers()).get('cookie')?.includes(`ry_access_${p.id}=`)
  if(p.requires_age_gate&&!hasAccess)return <AccessGate project={p}/>
  const blocks=(p.project_blocks||[]).sort((a:any,b:any)=>a.sort_order-b.sort_order)
  return <><header className="site-header"><a href="/">RICHARD YATES</a><span>{p.year}</span></header><main><section className="project-head"><div className="eyebrow">Project / {p.year}</div><h1>{p.title}</h1><div className="subtitle">{p.subtitle}</div></section><section className="project-intro"><p>{p.introduction}</p>{p.artist_statement&&<p>{p.artist_statement}</p>}</section><ProjectBlocks blocks={blocks}/>{p.closing_statement&&<section className="block quote">“{p.closing_statement}”</section>}</main><footer className="site-footer"><a href="/">← All projects</a><span>{p.title}</span></footer></>
}
