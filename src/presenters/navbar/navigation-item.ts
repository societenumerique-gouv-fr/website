import { MainNavigationProps } from '@codegouvfr/react-dsfr/MainNavigation';
import { isNavbarLink, NavbarLink, toNavbarLink } from './navbar-link';
import { isNavbarMegaMenu, NavbarMegaMenu, toNavbarMegaMenu } from './navbar-mega-menu';
import { isNavbarMenuDeroulant, NavbarMenuDeroulant, toNavbarMenuDeroulant } from './navbar-menu-deroulant';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type NavbarNavigationItem = NavbarLink | NavbarMenuDeroulant | NavbarMegaMenu;

export type NavbarNavigationItems = {
  attributes: {
    Navbar_navigation_items: NavbarNavigationItem[];
  };
};

const toHeaderNavigationItem =
  (pathname: string) =>
  (navigationItem: NavbarNavigationItem): MainNavigationProps.Item | undefined => {
    if (isNavbarLink(navigationItem)) {
      return toNavbarLink(pathname)(navigationItem);
    }
    if (isNavbarMenuDeroulant(navigationItem)) {
      return toNavbarMenuDeroulant(pathname)(navigationItem);
    }
    if (isNavbarMegaMenu(navigationItem)) {
      return toNavbarMegaMenu(pathname)(navigationItem);
    }
  };

const onlyDefinedNavigationItems = (navigationItem?: MainNavigationProps.Item): navigationItem is MainNavigationProps.Item =>
  navigationItem != null;

export const toNavigation = (pathname: string) => (navigationItems: NavbarNavigationItems) =>
  navigationItems.attributes.Navbar_navigation_items.map(toHeaderNavigationItem(pathname)).filter(onlyDefinedNavigationItems);

export const toBreadcrumbItems =
  (pathname: string) =>
  (navigationItems?: NavbarNavigationItems): BreadcrumbItem[] =>
    navigationItems?.attributes.Navbar_navigation_items.reduce(
      (breadcrumbItems: BreadcrumbItem[], navigationItem: NavbarNavigationItem): BreadcrumbItem[] => {
        if (isNavbarLink(navigationItem) && navigationItem.page_cible === pathname) {
          return [...breadcrumbItems, { label: navigationItem.titre_du_lien }];
        }
        if (isNavbarMenuDeroulant(navigationItem) || isNavbarMegaMenu(navigationItem)) {
          const lien = navigationItem.liens.find((lien) => lien.page_cible.endsWith(pathname));
          const pathArray = pathname.replace(/^\/|\/$/g, '').split('/');

          return lien == null
            ? breadcrumbItems
            : [
                ...breadcrumbItems,
                ...(pathArray.length > 1 ? [{ label: navigationItem.titre_du_menu, href: `/${pathArray[0]}` }] : []),
                { label: lien.titre_du_lien }
              ];
        }
        return breadcrumbItems;
      },
      []
    ) ?? [];
