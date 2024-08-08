import { PageAccueil } from '@/ressources/page-accueil';
import { PageResource } from '@/ressources/page-resource';
import { fetchToJson } from './fetch-to-json';

export const getPageAccueil = async (): Promise<{ data: PageAccueil }> =>
  await fetchToJson(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/page-accueil`, "Impossible de récupérer la page d'accueil");

export const getPageAccueilContent = async (pageName: string): Promise<{ data: [PageResource] | [] }> =>
  await fetchToJson(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages?filters[nom_de_page][$eq]=${pageName}`,
    "Impossible de récupérer le contenu de la page d'accueil"
  );

export const pageNameOf = ({ data }: { data: PageAccueil }) => data.attributes.page_accueil;
