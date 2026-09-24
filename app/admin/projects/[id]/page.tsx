import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase'
import AdminEditor from '@/components/AdminEditor'
export default async function ProjectEditor({params}:{params:{id:string}}){const s=await createServerClient();const {data:{user}}=await s.auth.getUser();if(!user)redirect('/admin/login');const isNew=params.id==='new';let project:any=null;if(!isNew){const {data}=await s.from('projects').select('*,project_blocks(*)').eq('id',params.id).single();project=data}return <main className="admin"><AdminEditor initial={project}/></main>}
