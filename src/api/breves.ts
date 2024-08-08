import { BreveResource } from '@/ressources/breve-resource';
import { fetchToJson } from './fetch-to-json';

export const getBreves = async (): Promise<{ data: BreveResource[] }> =>
  await fetchToJson(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/breves`, 'Impossible de récupérer les brèves');

export const getBrevesMatchingSlug = async (slug: string): Promise<{ data: [BreveResource] | [] }> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/breves?filters[nom_de_page][$eq]=${slug}`);

  if (!response.ok) {
    throw new Error('Impossible de récupérer les brèves');
  }

  return response.json();
};

export const toSingleBreve = ({ data: pages }: { data: [BreveResource] | [] }): BreveResource['attributes'] | undefined =>
  pages[0]?.attributes;
