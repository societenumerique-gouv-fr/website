import type { Metadata } from 'next';
import { PageBuilder } from '@/app/_components/PageBuilder';
import SkipLinksPortal from '@/app/_components/SkipLinksPortal';
import NotFound from '@/app/not-found';
import { getEtudesMatchingSlug, toSingleEtude } from '@/api/etudes';
import { contentId, defaultSkipLinks } from '@/utils/skipLinks';

export const generateMetadata = async ({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> => {
  const etude = toSingleEtude(await getEtudesMatchingSlug(`nos-ressources/etudes/${slug}`));

  return {
    title: etude ? `${etude.titre_de_la_carte} - Étude - Société Numérique` : 'Société Numérique'
  };
};

const EtudesPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const etude = toSingleEtude(await getEtudesMatchingSlug(`nos-ressources/etudes/${slug}`));

  if (etude == null) return <NotFound />;

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <main id={contentId}>
        <PageBuilder data={etude.composants} dataArticles={[]} isHome={false} />
      </main>
    </>
  );
};

export default EtudesPage;
