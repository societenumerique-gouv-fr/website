import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { fetchData } from '@/functions/fetcher';
import { NavbarNavigationItems, toNavigation } from '@/presenters/navbar/navigation-item';
import { NavbarHeader, toQuickAccessItems } from '@/presenters/navbar/header';
import { ScrollToTop } from './_components/ScrollToTop';
import { Footer } from './_components/Footer';
import { Header } from './_components/Header';
import { Dsfr } from './Dsfr';
import { PreloadResources } from './PreloadResources';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Société Numérique',
  description:
    'Le Programme Société Numérique de l’Agence Nationale de la Cohésion des Territoires œuvre en faveur d’un numérique d’intérêt général en offrant à tous et toutes les clés d’appropriation du numérique.'
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const RootLayout = async ({
  children
}: Readonly<{
  children: ReactNode;
}>) => {
  const header: { data: NavbarHeader } = await fetchData(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/header`);
  const navigationItems: { data: NavbarNavigationItems } = await fetchData(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/header-navigation`
  );
  const alertResponse = await fetchData(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/alerte`);

  return (
    <html lang='en'>
      <body>
        <div id='skip-links' />
        <PreloadResources />
        <Dsfr />
        <ScrollToTop />
        <Header
          alerte={alertResponse.data}
          headerImageUrl={header.data.attributes.logo.data.attributes.url}
          quickAccessItems={header.data.attributes.liens_header.map(toQuickAccessItems)}
          navigation={toNavigation(navigationItems.data)}
        />
        <div className='margin-footer'>{children}</div>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
