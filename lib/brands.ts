import { supabase } from './supabase';

function isMissingTableError(message: string) {
  return message.toLowerCase().includes('could not find the table');
}

export interface BrandTimelineItem {
  id: string;
  brand_id: string;
  year: number;
  title: string;
  description: string;
  sort_order: number;
}

export interface BrandModel {
  id: string;
  brand_id: string;
  slug: string;
  name: string;
  year: string;
  highlight: string;
  category: string;
  image_url: string;
  description: string;
  power: string;
  top_speed: string;
  acceleration: string;
  drivetrain: string;
  published: boolean;
  sort_order: number;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  country: string;
  description: string;
  founded: number;
  top_model: string;
  max_speed: string;
  color: string;
  logo_url: string;
  hero_image_url: string;
  published: boolean;
  timeline: BrandTimelineItem[];
  models: BrandModel[];
}

export interface ModelWithBrand extends BrandModel {
  brands: {
    id: string;
    slug: string;
    name: string;
    color: string;
  };
}

function normalizeModelBrandRelation(raw: any): ModelWithBrand {
  const relation = Array.isArray(raw.brands) ? raw.brands[0] : raw.brands;

  return {
    ...raw,
    brands: {
      id: relation?.id ?? '',
      slug: relation?.slug ?? '',
      name: relation?.name ?? '',
      color: relation?.color ?? '#dc2626',
    },
  } as ModelWithBrand;
}

export async function getBrands() {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('published', true)
    .order('name', { ascending: true });

  if (error) {
    if (isMissingTableError(error.message)) return [] as Brand[];
    throw new Error(error.message);
  }

  const brands = (data as Omit<Brand, 'timeline' | 'models'>[]) ?? [];
  if (brands.length === 0) return [] as Brand[];

  const brandIds = brands.map((brand) => brand.id);

  const [timelineResponse, modelResponse] = await Promise.all([
    supabase
      .from('brand_timeline')
      .select('*')
      .in('brand_id', brandIds)
      .order('year', { ascending: true })
      .order('sort_order', { ascending: true }),
    supabase
      .from('brand_models')
      .select('*')
      .eq('published', true)
      .in('brand_id', brandIds)
      .order('sort_order', { ascending: true })
      .order('name', { ascending: true }),
  ]);

  if (timelineResponse.error) {
    throw new Error(timelineResponse.error.message);
  }

  if (modelResponse.error) {
    throw new Error(modelResponse.error.message);
  }

  const timelineByBrand = new Map<string, BrandTimelineItem[]>();
  for (const item of (timelineResponse.data as BrandTimelineItem[]) ?? []) {
    const list = timelineByBrand.get(item.brand_id) ?? [];
    list.push(item);
    timelineByBrand.set(item.brand_id, list);
  }

  const modelsByBrand = new Map<string, BrandModel[]>();
  for (const item of (modelResponse.data as BrandModel[]) ?? []) {
    const list = modelsByBrand.get(item.brand_id) ?? [];
    list.push(item);
    modelsByBrand.set(item.brand_id, list);
  }

  return brands.map((brand) => ({
    ...brand,
    timeline: timelineByBrand.get(brand.id) ?? [],
    models: modelsByBrand.get(brand.id) ?? [],
  }));
}

export async function getBrandBySlug(slug: string) {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error) {
    if (isMissingTableError(error.message)) return null;
    throw new Error(error.message);
  }

  if (!data) return null;

  const baseBrand = data as Omit<Brand, 'timeline' | 'models'>;

  const [timelineResponse, modelResponse] = await Promise.all([
    supabase
      .from('brand_timeline')
      .select('*')
      .eq('brand_id', baseBrand.id)
      .order('year', { ascending: true })
      .order('sort_order', { ascending: true }),
    supabase
      .from('brand_models')
      .select('*')
      .eq('brand_id', baseBrand.id)
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .order('name', { ascending: true }),
  ]);

  if (timelineResponse.error) {
    throw new Error(timelineResponse.error.message);
  }

  if (modelResponse.error) {
    throw new Error(modelResponse.error.message);
  }

  return {
    ...baseBrand,
    timeline: (timelineResponse.data as BrandTimelineItem[]) ?? [],
    models: (modelResponse.data as BrandModel[]) ?? [],
  } as Brand;
}

export async function getBrandSlugs() {
  const { data, error } = await supabase
    .from('brands')
    .select('slug')
    .eq('published', true)
    .order('slug', { ascending: true });

  if (error) {
    if (isMissingTableError(error.message)) return [];
    throw new Error(error.message);
  }

  return (data as { slug: string }[]) ?? [];
}

export async function getModels() {
  const { data, error } = await supabase
    .from('brand_models')
    .select(`
      id,
      brand_id,
      slug,
      name,
      year,
      highlight,
      category,
      image_url,
      description,
      power,
      top_speed,
      acceleration,
      drivetrain,
      published,
      sort_order,
      brands:brands!brand_models_brand_id_fkey(id, slug, name, color)
    `)
    .eq('published', true)
    .order('name', { ascending: true });

  if (error) {
    if (isMissingTableError(error.message)) return [];
    throw new Error(error.message);
  }

  return ((data ?? []) as any[]).map(normalizeModelBrandRelation);
}

export async function getModelBySlug(slug: string) {
  const { data, error } = await supabase
    .from('brand_models')
    .select(`
      id,
      brand_id,
      slug,
      name,
      year,
      highlight,
      category,
      image_url,
      description,
      power,
      top_speed,
      acceleration,
      drivetrain,
      published,
      sort_order,
      brands:brands!brand_models_brand_id_fkey(id, slug, name, color)
    `)
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error) {
    if (isMissingTableError(error.message)) return null;
    throw new Error(error.message);
  }

  return data ? normalizeModelBrandRelation(data) : null;
}

export async function getModelSlugs() {
  const { data, error } = await supabase
    .from('brand_models')
    .select('slug')
    .eq('published', true)
    .order('slug', { ascending: true });

  if (error) {
    if (isMissingTableError(error.message)) return [];
    throw new Error(error.message);
  }

  return (data as { slug: string }[]) ?? [];
}
