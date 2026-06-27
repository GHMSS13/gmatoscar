import { supabase } from './supabase';

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  read_time: string;
  image_url: string;
  external_url?: string | null;
  featured: boolean;
  hot: boolean;
  published: boolean;
}

export async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as Post[]) ?? [];
}

export async function getPostSlugs() {
  const { data, error } = await supabase
    .from('posts')
    .select('slug')
    .eq('published', true);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as Post | null;
}
