import { Metadata } from 'next';
import { PageBuilder } from '@/app/_components/PageBuilder';
import SkipLinksPortal from '@/app/_components/SkipLinksPortal';
import NotFound from '@/app/not-found';
import { byPubicationDate } from '@/ressources/collection-operations';
import { getBreves } from '@/api/breves';
import { getPagesMatchingSlug, toSinglePage } from '@/api/pages';
import { contentId, defaultSkipLinks } from '@/utils/skipLinks';

export const metadata: Metadata = {
  title: 'Brèves - Société Numérique'
};

const BrevesPage = async () => {
  const page = toSinglePage(await getPagesMatchingSlug(['actualites', 'breves']));
  const breves = await getBreves();

  if (page == null) return <NotFound />;

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <main id={contentId}>
        <PageBuilder
          data={page.Composants}
          dataArticles={breves.data.sort(byPubicationDate) ?? []}
          isHome={false}
          breadCrumbItems={[
            {
              label: 'Actualités',
              href: '/actualites'
            },
            {
              label: 'Brèves'
            }
          ]}
        />
      </main>
    </>
  );
};

export default BrevesPage;
