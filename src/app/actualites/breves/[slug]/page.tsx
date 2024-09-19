import type { Metadata } from 'next';
import { PageBuilder } from '@/app/_components/PageBuilder';
import SkipLinksPortal from '@/app/_components/SkipLinksPortal';
import NotFound from '@/app/not-found';
import { getBrevesMatchingSlug, toSingleBreve } from '@/api/breves';
import { contentId, defaultSkipLinks } from '@/utils/skipLinks';

export const generateMetadata = async ({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> => {
  const breve = toSingleBreve(await getBrevesMatchingSlug(`actualites/breves/${slug}`));

  return {
    title: breve ? `${breve.titre_de_la_carte} - Brève - Société Numérique` : 'Société Numérique'
  };
};

const BrevePage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const breve = toSingleBreve(await getBrevesMatchingSlug(`actualites/breves/${slug}`));

  if (breve == null) return <NotFound />;

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <main id={contentId}>
        <PageBuilder
          data={breve.composants}
          isHome={false}
          breadCrumbItems={[
            {
              label: 'Actualités',
              href: '/actualites'
            },
            {
              label: 'Brèves',
              href: '/actualites/breves'
            },
            {
              label: breve.titre_de_la_carte
            }
          ]}
        />
      </main>
    </>
  );
};

export default BrevePage;
