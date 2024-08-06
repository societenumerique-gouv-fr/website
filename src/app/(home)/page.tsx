import type { Metadata } from 'next';
import { PageBuilder } from '../(pages)/[...slug]/_components/PageBuilder';

type Page = {
  id: string;
  attributes: {
    nom_de_page: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    Composants: unknown[];
  };
};

type PageAccueil = {
  id: string;
  attributes: {
    page_accueil: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Accueil - Société Numérique',
  description:
    'Le Programme Société Numérique de l’Agence Nationale de la Cohésion des Territoires œuvre en faveur d’un numérique d’intérêt général en offrant à tous et toutes les clés d’appropriation du numérique.'
};

const fetchToJson = async (url: string, errorMessage: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json();
};

const getPageAccueil = async (): Promise<{ data: PageAccueil }> =>
  await fetchToJson(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/page-accueil`, "Impossible de récupérer la page d'accueil");

const getPageAccueilContent = async (pageName: string): Promise<{ data: [Page] | [] }> =>
  await fetchToJson(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages?filters[nom_de_page][$eq]=${pageName}`,
    "Impossible de récupérer le contenu de la page d'accueil"
  );

const getBreves = async (): Promise<{ data: PageAccueil }> =>
  await fetchToJson(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/breves`, 'Impossible de récupérer les brèves');

const getPublicationsStrategiques = async (): Promise<{ data: PageAccueil }> =>
  await fetchToJson(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/publications-strategiques`,
    'Impossible de récupérer publications stratégiques'
  );

const getRapportsDeRecherches = async (): Promise<{ data: PageAccueil }> =>
  await fetchToJson(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/rapports-de-recherches`,
    'Impossible de récupérer les rapports de recherches'
  );

const pageNameOf = ({ data }: { data: PageAccueil }) => data.attributes.page_accueil;

const toSinglePage = ({ data: pages }: { data: [Page] | [] }): Page['attributes'] | undefined => pages[0]?.attributes;

const HomePage = async () => {
  const pageName = pageNameOf(await getPageAccueil());
  const page = toSinglePage(await getPageAccueilContent(pageName));
  const breves = await getBreves();
  const rapportsStrategies = await getPublicationsStrategiques();
  const rapportsDeRecherches = await getRapportsDeRecherches();

  if (page == null) return <>Not found</>;

  return <PageBuilder data={page.Composants} dataArticles={[breves, rapportsStrategies, rapportsDeRecherches]} isHome={true} />;
};

export default HomePage;
