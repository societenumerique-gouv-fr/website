import { PageResource } from '../ressources/page-resource';

export const getPages = async (): Promise<{ data: PageResource[] }> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages?pagination[pageSize]=100`);

  if (!response.ok) {
    throw new Error('Impossible de récupérer les pages');
  }

  return response.json();
};

export const getPagesMatchingSlug = async (slug: string[]): Promise<{ data: [PageResource] | [] }> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages?filters[nom_de_page][$eq]=${slug.join('/')}`);

  if (!response.ok) {
    throw new Error('Impossible de récupérer la page correspondant au slug');
  }

  return response.json();
};

export const toSinglePage = ({ data: pages }: { data: [PageResource] | [] }): PageResource['attributes'] | undefined =>
  pages[0]?.attributes;
