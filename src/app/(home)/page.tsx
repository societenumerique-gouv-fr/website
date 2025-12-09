import type { Metadata } from 'next';
import { getBreves } from '@/api/breves';
import { getPageAccueil, getPageAccueilContent, pageNameOf } from '@/api/page-accueil';
import { toSinglePage } from '@/api/pages';
import { getRapportsDeRecherches } from '@/api/rapports-de-recherches';
import { PageBuilder } from '@/app/_components/PageBuilder';
import SkipLinksPortal from '@/app/_components/SkipLinksPortal';
import NotFound from '@/app/not-found';
import type { BreveResource } from '@/ressources/breve-resource';
import { byPubicationDate, toAttributes } from '@/ressources/collection-operations';
import type { RapportDeRechercheResource } from '@/ressources/rapport-de-recherche-resource';
import { contentId, defaultSkipLinks } from '@/utils/skipLinks';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Accueil - Société Numérique',
  description:
    'Le Programme Société Numérique de l’Agence Nationale de la Cohésion des Territoires œuvre en faveur d’un numérique d’intérêt général en offrant à tous et toutes les clés d’appropriation du numérique.'
};

const HomePage = async () => {
  const pageName = pageNameOf(await getPageAccueil());
  const page = toSinglePage(await getPageAccueilContent(pageName));
  const breves = await getBreves();
  const rapportsDeRecherches = await getRapportsDeRecherches();

  if (page == null) return <NotFound />;

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <main id={contentId}>
        <PageBuilder
          data={page.Composants}
          breves={breves.data.sort(byPubicationDate).map(toAttributes) as unknown as BreveResource[]}
          rapportsDeRecherches={
            rapportsDeRecherches.data.sort(byPubicationDate).map(toAttributes) as unknown as RapportDeRechercheResource[]
          }
          isHome={true}
        />
      </main>
    </>
  );
};

export default HomePage;
