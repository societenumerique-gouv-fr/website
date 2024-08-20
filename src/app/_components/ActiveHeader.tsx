'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@codegouvfr/react-dsfr/Header/Header';
import { NavbarHeader, toQuickAccessItems } from '@/presenters/navbar/header';
import { NavbarNavigationItems, toNavigation } from '@/presenters/navbar/navigation-item';

type ActiveHeaderProps = {
  header: {
    data: NavbarHeader;
  };
  navigationItems: {
    data: NavbarNavigationItems;
  };
};

type RegisteredLinkProps = {
  href: string;
};

type HomeLinkProps = RegisteredLinkProps & { title: string };

export const ActiveHeader: React.FC<ActiveHeaderProps> = ({ header, navigationItems }) => {
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
              imgUrl: header.data.attributes.logo.data.attributes.url,
              orientation: 'horizontal',
              alt: ''
            }
          : undefined
      }
      homeLinkProps={
        {
          href: '/',
          title: 'Accueil - Société Numérique'
        } as HomeLinkProps
      }
      quickAccessItems={header.data.attributes.liens_header.map(toQuickAccessItems)}
      navigation={toNavigation(pathname)(navigationItems.data)}
    />
  );
};
