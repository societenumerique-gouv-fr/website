import { MetadataRoute } from 'next';
import { urlFromEnv } from '@/utils';
import { getPageAccueil, pageNameOf } from '@/api/page-accueil';
import { getPages } from '@/api/pages';
import { getBreves } from '@/api/breves';
import { getEtudes } from '@/api/etudes';

export const dynamic = 'force-dynamic';

const exceptPageAccueil =
  (pageName: string) =>
  ({ attributes: { nom_de_page } }: { attributes: { nom_de_page: string } }) =>
    nom_de_page != pageName;

const toSitemapField = ({
  attributes: { nom_de_page, updatedAt }
}: {
  attributes: { nom_de_page: string; updatedAt: Date };
}) => ({
  url: `${urlFromEnv()}/${nom_de_page}`,
  lastModified: new Date(updatedAt)
});

const HOME_PAGE = {
  url: urlFromEnv(),
  lastModified: new Date()
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const pageAccueilName = pageNameOf(await getPageAccueil());
  const pages = await getPages();
  const breves = await getBreves();
  const etudes = await getEtudes();

  return [
    HOME_PAGE,
    ...pages.data.filter(exceptPageAccueil(pageAccueilName)).map(toSitemapField),
    ...breves.data.map(toSitemapField),
    ...etudes.data.map(toSitemapField)
  ];
};

export default sitemap;
