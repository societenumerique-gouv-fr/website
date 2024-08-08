import type { Metadata } from 'next';
import { PageBuilder } from '@/app/_components/PageBuilder';
import SkipLinksPortal from '@/app/_components/SkipLinksPortal';
import NotFound from '@/app/not-found';
import { getPagesMatchingSlug, toSinglePage } from '@/api/pages';
import { contentId, defaultSkipLinks } from '@/utils/skipLinks';

export const generateMetadata = async ({ params: { slug } }: { params: { slug: string[] } }): Promise<Metadata> => {
  const page = toSinglePage(await getPagesMatchingSlug(slug));

  return {
    title: page ? `${page.titre_de_page} - Société Numérique` : 'Société Numérique'
  };
};

const Page = async ({ params: { slug } }: { params: { slug: string[] } }) => {
  const page = toSinglePage(await getPagesMatchingSlug(slug));

  if (page == null) return <NotFound />;

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <main id={contentId}>
        <PageBuilder data={page.Composants} dataArticles={[]} isHome={false} />
      </main>
    </>
  );
};

export default Page;
