import { RapportDeRechercheResource } from '@/ressources/rapportDeRechercheResource';
import { PageBuilder } from '@/app/_components/PageBuilder';

const getEtudesMatchingSlug = async (slug: string): Promise<{ data: [RapportDeRechercheResource] | [] }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/rapports-de-recherches?filters[nom_de_page][$eq]=${slug}`
  );

  if (!response.ok) {
    throw new Error('Impossible de récupérer les rapports de recherche');
  }

  return response.json();
};

const toSingleEtude = ({
  data: pages
}: {
  data: [RapportDeRechercheResource] | [];
}): RapportDeRechercheResource['attributes'] | undefined => pages[0]?.attributes;

const NosRessourcesPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const page = toSingleEtude(await getEtudesMatchingSlug(slug));

  if (page == null) return <>Not found</>;

  return <PageBuilder data={page.composants} dataArticles={[]} isHome={false} />;
};

export default NosRessourcesPage;
