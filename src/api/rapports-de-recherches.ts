import { RapportDeRechercheResource } from '@/ressources/rapport-de-recherche-resource';
import { fetchToJson } from './fetch-to-json';

export const getRapportsDeRecherches = async (): Promise<{ data: RapportDeRechercheResource[] }> =>
  await fetchToJson(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/rapports-de-recherches`,
    'Impossible de récupérer les rapports de recherches'
  );
