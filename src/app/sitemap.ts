import { MetadataRoute } from 'next';
import { PageResource } from '@/ressources/pageResource';
import { urlFromEnv } from '@/utils';

export const dynamic = 'force-dynamic';

const getPages = async (): Promise<{ data: PageResource[] }> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages?pagination[pageSize]=100`);

  if (!response.ok) {
    throw new Error('Impossible de récupérer les pages');
  }

  return response.json();
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const pages = await getPages();

  return [
    {
      url: urlFromEnv(),
      lastModified: new Date()
    },
    ...pages.data.map((page) => ({
      url: `${urlFromEnv()}/${page.attributes.nom_de_page}`,
      lastModified: new Date(page.attributes.updatedAt)
    }))
  ];
};

export default sitemap;
