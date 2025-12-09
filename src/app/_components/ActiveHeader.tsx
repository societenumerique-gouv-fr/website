'use client';

import { Header } from '@codegouvfr/react-dsfr/Header/Header';
import { usePathname } from 'next/navigation';
import { type NavbarHeader, toQuickAccessItems } from '@/presenters/navbar/header';
import { type NavbarNavigationItems, toNavigation } from '@/presenters/navbar/navigation-item';

export const ActiveHeader = ({
  header,
  navigationItems
}: {
  header: { data: NavbarHeader };
  navigationItems: { data: NavbarNavigationItems };
}) => {
  const pathname = usePathname();

  return (
    <Header
      brandTop={
        <>
          République
          <br />
          Française
        </>
      }
      serviceTitle='Programme Société Numérique'
      operatorLogo={
        header.data.attributes.logo.data?.attributes.url
          ? {
              imgUrl: header.data.attributes.logo.data?.attributes.url,
              orientation: 'horizontal',
              alt: ''
            }
          : undefined
      }
      homeLinkProps={{ href: '/', title: 'Accueil - Société Numérique' }}
      quickAccessItems={header.data.attributes.liens_header.map(toQuickAccessItems)}
      navigation={toNavigation(pathname)(navigationItems.data)}
    />
  );
};
