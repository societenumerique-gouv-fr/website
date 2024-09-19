// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from 'react';
import { buildComponents, buildSections } from '@/functions/componentsbuilder';
import { BreadcrumbItem, NavbarNavigationItems } from '@/presenters/navbar/navigation-item';
import { BreveResource } from '@/ressources/breve-resource';
import { RapportDeRechercheResource } from '@/ressources/rapport-de-recherche-resource';
import { TextArea } from './page-content/TextArea';
import { labelColors } from './structs';
import { position } from './structs';
import { marginsBottom } from './structs';
import { Banner } from './page-content/Banner';
import { HorizontalCard } from './page-content/HorizontalCard';
import { VerticalCard } from './page-content/VerticalCard';
import { BlocFields } from './page-content/BlocFields';
import { AnchorNavigator } from './page-content/AnchorNavigator';
import { BlocCards } from './page-content/BlocCards';
import { Quote } from './page-content/Quote';
import { Media } from './page-content/Media';
import { MiseEnAvant } from './page-content/MiseEnAvant';
import { Button } from './page-content/Button';
import { ButtonGroup } from './page-content/ButtonGroup';
import { NavLink } from './page-content/NavLink';
import { DownloadLink } from './page-content/DownloadLink';
import { DownloadCard } from './page-content/DownloadCard';
import { Accordion } from './page-content/Accordion';
import { Title } from './page-content/Title';
import { Iframe } from './page-content/Iframe';
import { RollingCard } from './page-content/RollingCard';
import { BreadCrumb } from './page-content/BreadCrumb';
import { ToolsDevicesContainer } from './page-content/ToolsDevicesContainer';

export const PageBuilder = ({
  data,
  breves = [],
  rapportsDeRecherches = [],
  navbarNavigationItems,
  breadCrumbItems = [],
  dataToolsDevices = null,
  slug,
  isHome
}: {
  data: unknown[];
  breves?: BreveResource[];
  rapportsDeRecherches?: RapportDeRechercheResource[];
  navbarNavigationItems?: NavbarNavigationItems;
  breadCrumbItems?: BreadcrumbItem[];
  slug?: string;
  isHome: boolean;
}) => {
  const allComponents = buildComponents(data);
  const struct = buildSections(allComponents);
  const array = struct[1] ?? [];
  const navigationComponent = array.find((component) => component.type === 'navigation');

  return (
    <>
      {isHome && <Banner />}
      <div className='fr-container fr-mb-4w'>
        {!isHome && <BreadCrumb breadCrumbItems={breadCrumbItems} navbarNavigationItems={navbarNavigationItems} />}
        <div className='fr-grid-row gutter'>
          {navigationComponent && (
            <div className='fr-col-md-3 fr-col-12'>
              <AnchorNavigator data={navigationComponent} />
            </div>
          )}
          <div className={navigationComponent ? 'fr-col-md-9 fr-col-12' : 'fr-col-12'}>
            {array.map((e) => {
              switch (e.type) {
                case 'badge':
                  return (
                    <div
                      className={
                        position[e.position] == 'left' || position[e.position] == 'right' ? `${position[e.position]}` : 'center'
                      }
                      style={{ margin: '32px' }}>
                      <p className={`fr-badge fr-badge--${labelColors[e.couleur]}`}>{e.texte} </p>
                    </div>
                  );
                case 'bloc-de-texte':
                  return (
                    <div>
                      <TextArea data={e} row={null} />
                    </div>
                  );
                case 'titre':
                  return <Title data={e} />;
                case 'bouton':
                  return <Button data={e} rows={1} />;
                case 'groupe-de-boutons':
                  return <ButtonGroup data={e} rows={1} />;
                case 'carte-verticale':
                  return <VerticalCard data={e} rows={1} />;
                case 'carte-horizontale':
                  return <HorizontalCard data={e} rows={1} />;
                case 'flux-de-publications':
                  return (
                    <div className='fr-grid-row fr-grid-row--gutters' style={{ marginBottom: marginsBottom[e.espacement_bas] }}>
                      {rapportsDeRecherches &&
                        rapportsDeRecherches.slice(0, 2).map((rapportDeRecherche) => (
                          <div key={rapportDeRecherche.id} className='fr-col-md-6 fr-col-12'>
                            <HorizontalCard
                              key={rapportDeRecherche.titre_de_la_carte}
                              data={rapportDeRecherche}
                              rows={2}
                              displayText={false}
                              fluxTwo={true}
                            />
                          </div>
                        ))}
                    </div>
                  );
                case 'flux-actualite':
                  return (
                    <div className='fr-grid-row fr-grid-row--gutters' style={{ marginBottom: marginsBottom[e.espacement_bas] }}>
                      {breves &&
                        breves.slice(0, 2).map((breve) => (
                          <div key={breve.id} className='fr-col-md-6 fr-col-12'>
                            <VerticalCard data={breve} rows={3} />
                          </div>
                        ))}
                    </div>
                  );
                case 'champ-de-blocs':
                  return <BlocFields data={e} />;
                case 'ancre':
                  return <div className='translate-header-margin' id={e.ancre} />;
                case 'bloc-de-breves':
                  return <BlocCards articles={breves.map(({ attributes }) => attributes)} type='breve' />;
                case 'bloc-de-publications-strategiques':
                  return <BlocCards articles={strategiques} type='rapport-strategique' />;
                case 'bloc-de-rapports-de-recherches':
                  return <BlocCards articles={rapportsDeRecherches.map(({ attributes }) => attributes)} type='etude' />;
                case 'citation':
                  return <Quote data={e} />;
                case 'mise-en-avant':
                  return <MiseEnAvant data={e} />;
                case 'media':
                  return <Media data={e} />;
                case 'lien-hypertexte':
                  return <NavLink data={e} rows={1} />;
                case 'telechargement':
                  return <DownloadLink data={e} rows={1} />;
                case 'carte-telechargement':
                  return <DownloadCard data={e} rows={1} />;
                case 'accordeon':
                  return <Accordion data={e} rows={1} />;
                case 'iframe':
                  return <Iframe data={e} rows={1} />;
                case 'carte-deroulante':
                  return <RollingCard data={e} />;
                case 'bandeau-titre':
                  if (bannerTitle == null) setBannerTitle(e);
                  break;
                case 'flux-dispositifs':
                  return <ToolsDevicesContainer data={dataToolsDevices} slug={slug} type={'Dispositif'} />;
                case 'flux-outils':
                  return <ToolsDevicesContainer data={dataToolsDevices} slug={slug} type={'Outil'} />;
                case 'section':
                  // eslint-disable-next-line no-case-declarations
                  const sections = buildSections(allComponents)[0];
                  if (sections) {
                    const currentSection = sections.find((i) => i.sectionId == e.id);
                    if (currentSection) {
                      return (
                        <div className='fr-grid-row fr-grid-row--gutters fr-mb-3v'>
                          {currentSection.elements.map((c) => {
                            switch (c.type) {
                              case 'badge':
                                return (
                                  <div key={c.id}>
                                    <p className={`fr-badge fr-badge--${labelColors[c.couleur]}`}>{c.texte} </p>
                                  </div>
                                );
                              case 'bloc-de-texte':
                                return (
                                  <div key={c.id}>
                                    <TextArea data={{ texte: c.texte }} row={currentSection.rows} />
                                  </div>
                                );

                              case 'titre':
                                return (
                                  <div key={c.id}>
                                    {e.taille == 'h1' && <h1>{e.titre}</h1>}
                                    {e.taille == 'h2' && <h2>{e.titre}</h2>}
                                    {e.taille == 'h3' && <h3>{e.titre}</h3>}
                                    {e.taille == 'h4' && <h4>{e.titre}</h4>}
                                    {e.taille == 'h5' && <h5>{e.titre}</h5>}
                                    {e.taille == 'h6' && <h6>{e.titre}</h6>}
                                  </div>
                                );
                              case 'bouton':
                                return <Button data={c} rows={currentSection.rows} />;
                              case 'groupe-de-boutons':
                                return <ButtonGroup data={c} rows={currentSection.rows} />;
                              case 'carte-verticale':
                                return <VerticalCard data={c} rows={currentSection.rows} />;
                              case 'carte-horizontale':
                                return <HorizontalCard data={c} rows={currentSection.rows} />;
                              case 'lien-hypertexte':
                                return <NavLink data={c} rows={currentSection.rows} />;
                              case 'telechargement':
                                return <DownloadLink data={c} rows={currentSection.rows} />;
                              case 'carte-telechargement':
                                return <DownloadCard data={c} rows={currentSection.rows} />;
                            }
                          })}
                        </div>
                      );
                    }
                  }
                  break;
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};
