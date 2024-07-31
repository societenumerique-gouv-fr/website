// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { buildComponents, buildSections } from '@/functions/componentsbuilder';
import { sortArticles } from '@/functions/sortarticles';
import { TextArea } from './pageContent/TextArea';
import React from 'react';
import { labelColors } from './structs';
import { position } from './structs';
import { marginsBottom } from './structs';
import { Banner } from './pageContent/Banner';
import { HorizontalCard } from './pageContent/HorizontalCard';
import { VerticalCard } from './pageContent/VerticalCard';
import { BlocFields } from './pageContent/BlocFields';
import { AnchorNavigator } from './pageContent/AnchorNavigator';
import { BlocCards } from './pageContent/BlocCards';
import { Quote } from './pageContent/Quote';
import { Media } from './pageContent/Media';
import { MiseEnAvant } from './pageContent/MiseEnAvant';
import { Button } from './pageContent/Button';
import { ButtonGroup } from './pageContent/ButtonGroup';
import { NavLink } from './pageContent/NavLink';
import { DownloadLink } from './pageContent/DownloadLink';
import { DownloadCard } from './pageContent/DownloadCard';
import { Accordion } from './pageContent/Accordion';
import { Title } from './pageContent/Title';
import { Iframe } from './pageContent/Iframe';
import { RollingCard } from './pageContent/RollingCard';
import { BreadCrumb } from './pageContent/BreadCrumb';
import { BannerTitle } from './pageContent/BannerTitle';
import { ToolsDevicesContainer } from './pageContent/ToolsDevicesContainer';

export const PageBuilder = ({ data, dataArticles, dataToolsDevices = null, slug = null, isHome }) => {
  const [fluxPublications, setFluxPublications] = useState([]);
  const [fluxActualites, setFluxActualites] = useState([]);
  const [breves, setBreves] = useState([]);
  const [strategiques, setStrategiques] = useState([]);
  const [recherches, setRecherches] = useState([]);
  const [bannerTitle, setBannerTitle] = useState(null);
  const pathname = usePathname();

  const allComponents = buildComponents(data);
  const struct = buildSections(allComponents);
  const array = struct[1];
  const hasBannerTitle = array && array.some((e) => e.type == 'bandeau-titre');

  useEffect(() => {
    if (dataArticles.length > 0) {
      const withoutBreves = sortArticles(dataArticles, [0]);
      const onlyBreves = sortArticles(dataArticles, [1, 2]);
      const onlyStrategiques = sortArticles(dataArticles, [0, 2]);
      const onlyRecherches = sortArticles(dataArticles, [0, 1]);

      setFluxPublications(withoutBreves.slice(0, 2));
      setFluxActualites(onlyBreves.slice(0, 3));

      setBreves(onlyBreves);
      setStrategiques(onlyStrategiques);
      setRecherches(onlyRecherches);
    }
  }, [dataArticles]);

  useEffect(() => {
    setBannerTitle(null);
  }, [pathname]);

  return (
    <>
      {isHome && <Banner />}
      {hasBannerTitle && bannerTitle != null && <BannerTitle data={bannerTitle}></BannerTitle>}
      <div className='fr-container mb2'>
        <BreadCrumb hasBannerTitle={hasBannerTitle}></BreadCrumb>
        {array ? (
          array.map((e) => {
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
                  <div key={e.id} style={{ marginBottom: marginsBottom[e.espacement_bas] }}>
                    <div className='grid2'>
                      {fluxPublications &&
                        fluxPublications.map((flux) => {
                          return (
                            <HorizontalCard
                              key={flux.titre_de_la_carte}
                              data={flux}
                              rows={2}
                              displayText={false}
                              fluxTwo={true}
                            />
                          );
                        })}
                    </div>
                  </div>
                );
              case 'flux-actualite':
                return (
                  <div className='flexrow-container' style={{ marginBottom: marginsBottom[e.espacement_bas] }}>
                    <div className='grid3'>
                      {fluxActualites &&
                        fluxActualites.map((flux) => {
                          return <VerticalCard key={flux.titre_de_la_carte} data={flux} rows={3} />;
                        })}
                    </div>
                  </div>
                );
              case 'champ-de-blocs':
                return <BlocFields data={e} />;
              case 'navigation':
                return <AnchorNavigator data={e} />;
              case 'ancre':
                return <div className='translate-header-margin' id={e.ancre} />;
              case 'bloc-de-breves':
                return <BlocCards articles={breves} type='breve' />;
              case 'bloc-de-publications-strategiques':
                return <BlocCards articles={strategiques} type='rapport-strategique' />;
              case 'bloc-de-rapports-de-recherches':
                return <BlocCards articles={recherches} type='etude' />;
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
                    const gridType = `grid${currentSection.rows}`;
                    return (
                      <div className='flexrow-container'>
                        <div className={gridType} style={{ marginBottom: marginsBottom[e.espacement_bas] }}>
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
                      </div>
                    );
                  }
                }
                break;
            }
          })
        ) : (
          <h3 style={{ textAlign: 'center' }}>En construction...</h3>
        )}
      </div>
    </>
  );
};
