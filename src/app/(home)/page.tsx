import type { Metadata } from 'next';
import { PageBuilder } from '../(pages)/[slug]/_components/PageBuilder';

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

const getPageAccueil = async (): Promise<{ data: PageAccueil }> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/page-accueil`);

  if (!response.ok) {
    throw new Error("Impossible de récupérer la page d'accueil");
  }

  return response.json();
};

const getPageAccueilContent = async (pageName: string): Promise<{ data: [Page] | [] }> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages?filters[nom_de_page][$eq]=${pageName}`);

  if (!response.ok) {
    throw new Error('Impossible de récupérer les articles');
  }

  return response.json();
};

const pageNameOf = ({ data }: { data: PageAccueil }) => data.attributes.page_accueil;

const toSinglePage = ({ data: pages }: { data: [Page] | [] }): Page['attributes'] | undefined => pages[0]?.attributes;

const HomePage = async () => {
  const pageName = pageNameOf(await getPageAccueil());
  const page = toSinglePage(await getPageAccueilContent(pageName));

  if (page == null) return <>Not found</>;

  return <PageBuilder data={page.Composants} dataArticles={[]} isHome={false} />;
};

export default HomePage;
