import { FrIconClassName } from '@codegouvfr/react-dsfr';
import { HeaderProps } from '@codegouvfr/react-dsfr/Header';

export type LienHeader = {
  titre_du_lien: string;
  pictogramme_remixicon: string;
  page_cible: string;
};

export type NavbarHeader = {
  attributes: {
    liens_header: LienHeader[];
    logo: { data?: { attributes: { url: string } } };
  };
};

export const toQuickAccessItems = (lienHeader: LienHeader): HeaderProps.QuickAccessItem => ({
  text: lienHeader.titre_du_lien,
  iconId: lienHeader.pictogramme_remixicon as FrIconClassName,
  linkProps: {
    href: lienHeader.page_cible
  }
});
