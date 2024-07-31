import type { Metadata } from 'next';
import { fetchData } from '@/functions/fetcher';
import { ScrollToTop } from './_components/ScrollToTop';
import { Footer } from './_components/Footer';
import { Header } from './_components/Header';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Société Numérique',
  description:
    'Le Programme Société Numérique de l’Agence Nationale de la Cohésion des Territoires œuvre en faveur d’un numérique d’intérêt général en offrant à tous et toutes les clés d’appropriation du numérique.'
};

const RootLayout = async ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const linksResponse = await fetchData(process.env.NEXT_PUBLIC_STRAPI_URL + '/api/navigations');
  const alertResponse = await fetchData(process.env.NEXT_PUBLIC_STRAPI_URL + '/api/alerte');

  return (
    <html lang='en'>
      <body>
        <ScrollToTop />
        <Header alerte={alertResponse.data} liens_navbar={linksResponse.data} />
        <div className='margin-footer'>{children} </div>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
