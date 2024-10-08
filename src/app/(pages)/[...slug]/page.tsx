import type { Metadata } from 'next';
import { PageBuilder } from '@/app/_components/PageBuilder';
import SkipLinksPortal from '@/app/_components/SkipLinksPortal';
import NotFound from '@/app/not-found';
import { getPagesMatchingSlug, toSinglePage } from '@/api/pages';
import { contentId, defaultSkipLinks } from '@/utils/skipLinks';
import { getBreves } from '@/api/breves';
import { getNavigationItems } from '@/api/navigation-items';
import { byPubicationDate } from '@/ressources/collection-operations';
import { NavbarNavigationItems } from '@/presenters/navbar/navigation-item';

export const generateMetadata = async ({ params: { slug } }: { params: { slug: string[] } }): Promise<Metadata> => {
  const page = toSinglePage(await getPagesMatchingSlug(slug));

  return {
    title: page ? `${page.titre_de_page} - Société Numérique` : 'Société Numérique'
  };
};

const Page = async ({ params: { slug } }: { params: { slug: string[] } }) => {
  const navigationItems: { data: NavbarNavigationItems } = await getNavigationItems();
  const page = toSinglePage(await getPagesMatchingSlug(slug));
  const breves = await getBreves();

  if (page == null) return <NotFound />;

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <main id={contentId}>
        <PageBuilder
          data={page.Composants}
          breves={[...breves.data].sort(byPubicationDate).slice(0, 3)}
          isHome={false}
          navbarNavigationItems={navigationItems.data}
        />
      </main>
    </>
  );
};

export default Page;
