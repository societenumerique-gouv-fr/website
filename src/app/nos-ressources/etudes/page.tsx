import { Metadata } from 'next';
import { byPubicationDate } from '@/ressources/collection-operations';
import { PageBuilder } from '@/app/_components/PageBuilder';
import SkipLinksPortal from '@/app/_components/SkipLinksPortal';
import NotFound from '@/app/not-found';
import { getPagesMatchingSlug, toSinglePage } from '@/api/pages';
import { getEtudes } from '@/api/etudes';
import { contentId, defaultSkipLinks } from '@/utils/skipLinks';

export const metadata: Metadata = {
  title: 'Études et évaluations - Société Numérique'
};

const EtudesPage = async () => {
  const page = toSinglePage(await getPagesMatchingSlug(['nos-ressources', 'etudes']));
  const etudes = await getEtudes();

  if (page == null) return <NotFound />;

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <main id={contentId}>
        <PageBuilder
          data={page.Composants}
          dataArticles={etudes.data.sort(byPubicationDate) ?? []}
          isHome={false}
          breadCrumbItems={[
            {
              label: 'Nos ressources',
              href: '/nos-ressources'
            },
            {
              label: 'Nos études et évaluations'
            }
          ]}
        />
      </main>
    </>
  );
};

export default EtudesPage;
