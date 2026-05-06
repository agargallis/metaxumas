import { ADMIN_MEDIA_BUCKET, supabase } from './supabase'

function slugifyFileName(name) {
  return name
    .normalize('NFKD')
    .replace(/[^\w.\-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}

export async function uploadAdminImage(file, folder = 'live-promos') {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }

  const extension = file.name.includes('.') ? file.name.split('.').pop() : 'jpg'
  const safeName = slugifyFileName(file.name.replace(/\.[^.]+$/, '')) || 'upload'
  const filePath = `${folder}/${Date.now()}-${safeName}.${extension}`

  const { error: uploadError } = await supabase.storage
    .from(ADMIN_MEDIA_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) throw uploadError

  const { data } = supabase.storage.from(ADMIN_MEDIA_BUCKET).getPublicUrl(filePath)
  return { path: filePath, publicUrl: data.publicUrl }
}
