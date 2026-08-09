export const PUBLICATION_OPTIONS = ['Noticias', 'Rankings', 'Garagem dos Sonhos'] as const;
export const ADMIN_POST_FILTER_OPTIONS = ['Todos', ...PUBLICATION_OPTIONS] as const;
export const LEGACY_DREAM_GARAGE_CUTOFF = '2026-07-10';

export type PublicationCategory = (typeof PUBLICATION_OPTIONS)[number];
export type AdminPostFilterCategory = (typeof ADMIN_POST_FILTER_OPTIONS)[number];

interface PublicationCategorySource {
  category?: string | null;
  title?: string | null;
  excerpt?: string | null;
  slug?: string | null;
  date?: string | null;
}

export const normalizeCategoryValue = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

function resolveMatchedPublicationCategory(value: string): PublicationCategory | null {
  const normalized = normalizeCategoryValue(value);

  if (normalized.includes('ranking')) {
    return 'Rankings';
  }

  if (normalized.includes('garagem dos sonhos') || (normalized.includes('garagem') && normalized.includes('sonho'))) {
    return 'Garagem dos Sonhos';
  }

  if (normalized.includes('noticia')) {
    return 'Noticias';
  }

  return null;
}

function isLegacyDreamGarageDate(date?: string | null) {
  if (!date) {
    return false;
  }

  return date <= LEGACY_DREAM_GARAGE_CUTOFF;
}

export function resolvePublicationCategory(value: string): PublicationCategory {
  return resolveMatchedPublicationCategory(value) ?? 'Noticias';
}

export function getEffectivePublicationCategory(source: PublicationCategorySource): PublicationCategory {
  const categoryMatch = resolveMatchedPublicationCategory(source.category ?? '');
  if (categoryMatch === 'Rankings' || categoryMatch === 'Garagem dos Sonhos') {
    return categoryMatch;
  }

  const inferredMatch = resolveMatchedPublicationCategory(
    [source.title, source.excerpt, source.slug].filter(Boolean).join(' ')
  );
  if (inferredMatch === 'Rankings' || inferredMatch === 'Garagem dos Sonhos') {
    return inferredMatch;
  }

  if (isLegacyDreamGarageDate(source.date)) {
    return 'Garagem dos Sonhos';
  }

  return categoryMatch ?? inferredMatch ?? 'Noticias';
}

export function shouldPromoteLegacyPostToDreamGarage(source: PublicationCategorySource) {
  const storedCategory = resolveMatchedPublicationCategory(source.category ?? '');

  return (
    isLegacyDreamGarageDate(source.date) &&
    getEffectivePublicationCategory(source) === 'Garagem dos Sonhos' &&
    storedCategory !== 'Garagem dos Sonhos'
  );
}