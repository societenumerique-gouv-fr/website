import { NavbarNavigationItem } from './navigation-item';

export type NavbarLink = {
  __component: 'composants.lien';
  titre_du_lien: string;
  page_cible: string;
};

export const isExternalLink = (target?: string): boolean =>
  target?.includes('https://') || target?.includes('mailto:') || false;

export const isNavbarLink = (navigationItem: NavbarNavigationItem): navigationItem is NavbarLink =>
  navigationItem.__component === 'composants.lien';

export const toNavbarLink = (pathname: string) => (navigationItem: NavbarLink) => ({
  linkProps: {
    href: navigationItem.page_cible,
    target: isExternalLink(navigationItem.page_cible) ? '_blank' : '_self'
  },
  text: navigationItem.titre_du_lien,
  isActive: pathname.endsWith(navigationItem.page_cible) || (pathname != '/' && navigationItem.page_cible.startsWith(pathname))
});
