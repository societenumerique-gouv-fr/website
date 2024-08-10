// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client';

import { Header as DsfrHeader } from '@codegouvfr/react-dsfr/Header';
import { MainNavigationProps } from '@codegouvfr/react-dsfr/MainNavigation';
import Notice from '@codegouvfr/react-dsfr/Notice';

type HeaderProps = {
  alerte: { attributes: { message: string | null } };
  headerImageUrl: string;
  quickAccessItems: HeaderProps.QuickAccessItem[];
  navigation: MainNavigationProps.Item[];
};

export const Header = ({ alerte, headerImageUrl, quickAccessItems, navigation }: HeaderProps) => (
  <>
    <DsfrHeader
      brandTop={
        <>
          République
          <br />
          Française
        </>
      }
      operatorLogo={{ imgUrl: `${process.env.NEXT_PUBLIC_STRAPI_URL}${headerImageUrl}` }}
      serviceTitle='Programme Société Numérique'
      homeLinkProps={{ href: '/', title: 'Accueil - Société Numérique' }}
      quickAccessItems={quickAccessItems}
      navigation={navigation}
    />
    {alerte.attributes.message && <Notice title={alerte.attributes.message} isClosable />}
  </>
);
