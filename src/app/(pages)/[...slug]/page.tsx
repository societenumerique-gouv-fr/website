import { PageResource } from '@/ressources/pageResource';
import { PageBuilder } from './_components/PageBuilder';

const getPagesMatchingSlug = async (slug: string[]): Promise<{ data: [PageResource] | [] }> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages?filters[nom_de_page][$eq]=${slug.join('/')}`);

  if (!response.ok) {
    throw new Error('Impossible de récupérer les articles');
  }

  return response.json();
};

const toSinglePage = ({ data: pages }: { data: [PageResource] | [] }): PageResource['attributes'] | undefined =>
  pages[0]?.attributes;

const Page = async ({ params: { slug } }: { params: { slug: string[] } }) => {
  const page = toSinglePage(await getPagesMatchingSlug(slug));

  if (page == null) return <>Not found</>;

  return <PageBuilder data={page.Composants} dataArticles={[]} isHome={false} />;
};

export default Page;
