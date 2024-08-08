import { RapportDeRechercheResource } from '../ressources/rapport-de-recherche-resource';
import { fetchToJson } from './fetch-to-json';

export const getEtudes = async (): Promise<{ data: RapportDeRechercheResource[] }> =>
  await fetchToJson(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/rapports-de-recherches`, 'Impossible de récupérer les études');

export const getEtudesMatchingSlug = async (slug: string): Promise<{ data: [RapportDeRechercheResource] | [] }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/rapports-de-recherches?filters[nom_de_page][$eq]=${slug}`
  );

  if (!response.ok) {
    throw new Error('Impossible de récupérer les rapports de recherche');
  }

  return response.json();
};

export const toSingleEtude = ({
  data: pages
}: {
  data: [RapportDeRechercheResource] | [];
}): RapportDeRechercheResource['attributes'] | undefined => pages[0]?.attributes;
