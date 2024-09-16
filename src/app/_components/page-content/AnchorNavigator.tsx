import NavigationSideMenu from '../NavigationSideMenu';

type Ancre = {
  ancre: string;
  titre: string;
};

type NavigationData = {
  ancre: Ancre[];
};
type AnchorNavigatorProps = {
  data: NavigationData;
};

export const AnchorNavigator = ({ data }: AnchorNavigatorProps) => (
  <NavigationSideMenu
    items={data.ancre.map(({ ancre, titre }) => ({
      text: titre,
      linkProps: { href: `#${ancre}` }
    }))}
    burgerMenuButtonText='Contenus'
    contentId='commencer-content'
    sticky
  />
);
