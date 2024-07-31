import { PageBuilder } from './_components/PageBuilder';

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

const getPagesMatchingSlug = async (slug: string): Promise<{ data: [Page] | [] }> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages?filters[nom_de_page][$eq]=${slug}`);

  if (!response.ok) {
    throw new Error('Impossible de récupérer les articles');
  }

  return response.json();
};

const toSinglePage = ({ data: pages }: { data: [Page] | [] }): Page['attributes'] | undefined => pages[0]?.attributes;

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const page = toSinglePage(await getPagesMatchingSlug(slug));

  if (page == null) return <>Not found</>;

  return <PageBuilder data={page.Composants} dataArticles={[]} isHome={false} />;
};

export default Page;
