import { isExternalLink, NavbarLink } from './navbar-link';
import { NavbarNavigationItem } from './navigation-item';

export type NavbarMenuDeroulant = {
  __component: 'composants.deroulant-navbar';
  titre_du_menu: 'Nos Outils';
  liens: NavbarLink[];
};

export const isNavbarMenuDeroulant = (navigationItem: NavbarNavigationItem): navigationItem is NavbarMenuDeroulant =>
  navigationItem.__component === 'composants.deroulant-navbar';

export const toNavbarMenuDeroulant = (navigationItem: NavbarMenuDeroulant) => ({
  menuLinks: navigationItem.liens.map((lien: NavbarLink) => ({
    linkProps: { href: lien.page_cible, target: isExternalLink(lien.page_cible) ? '_blank' : '_self' },
    text: lien.titre_du_lien
  })),
  text: navigationItem.titre_du_menu
});
