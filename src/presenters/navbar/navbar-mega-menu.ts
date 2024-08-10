import { isExternalLink } from './navbar-link';
import { NavbarNavigationItem } from './navigation-item';

type Categorie = { titre_de_la_categorie: string; page_cible?: string };

type Lien = { titre_de_la_categorie: string; titre_du_lien: string; page_cible: string };

export type NavbarMegaMenu = {
  __component: 'composants.mega-menu-navbar';
  titre_du_menu: string;
  titre_editorialise?: string;
  texte_de_presentation?: string;
  categories: Categorie[];
  liens: Lien[];
};

export const isNavbarMegaMenu = (navigationItem: NavbarNavigationItem): navigationItem is NavbarMegaMenu =>
  navigationItem.__component === 'composants.mega-menu-navbar';

const toLinks = (lien: Lien) => ({
  linkProps: { href: lien.page_cible },
  text: lien.titre_du_lien,
  target: isExternalLink(lien.page_cible) ? '_blank' : '_self'
});

const toCategories = (navigationItem: NavbarMegaMenu) => (categorie: Categorie) => ({
  categoryMainLink: {
    text: categorie.titre_de_la_categorie,
    linkProps: {
      href: categorie.page_cible ?? '#',
      target: isExternalLink(categorie.page_cible) ? '_blank' : '_self'
    }
  },
  links: navigationItem.liens.filter((lien) => lien.titre_de_la_categorie === categorie.titre_de_la_categorie).map(toLinks)
});

export const toNavbarMegaMenu = (navigationItem: NavbarMegaMenu) => ({
  megaMenu: {
    categories: navigationItem.categories.map(toCategories(navigationItem)),
    leader: {
      paragraph: navigationItem.texte_de_presentation,
      title: navigationItem.titre_editorialise
    }
  },
  text: navigationItem.titre_du_menu
});
