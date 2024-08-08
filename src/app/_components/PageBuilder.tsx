// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { buildComponents, buildSections } from '@/functions/componentsbuilder';
import { TextArea } from './page-content/TextArea';
import React from 'react';
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

export const PageBuilder = ({ data, dataArticles, dataToolsDevices = null, slug = null, isHome }) => {
  // const [fluxPublications, setFluxPublications] = useState([]);
  // const [fluxActualites, setFluxActualites] = useState([]);
  // const [strategiques, setStrategiques] = useState([]);
  // const [recherches, setRecherch/es] = useState([]);
  // const [bannerTitle, setBannerTitle] = useState(null);
  // const pathname = usePathname();

  const allComponents = buildComponents(data);
  const struct = buildSections(allComponents);
  const array = struct[1] ?? [];

  // useEffect(() => {
  //   if (dataArticles.length > 0) {
  //     const withoutBreves = sortArticles(dataArticles, [0]);
  //     const onlyStrategiques = sortArticles(dataArticles, [0, 2]);
  //     const onlyRecherches = sortArticles(dataArticles, [0, 1]);
  //
  //     setFluxPublications(withoutBreves.slice(0, 2));
  //     setFluxActualites(onlyBreves.slice(0, 3));
  //
  //     setBreves(onlyBreves);
  //     setStrategiques(onlyStrategiques);
  //     setRecherches(onlyRecherches);
  //   }
  // }, [dataArticles]);
  //
  // useEffect(() => {
  //   setBannerTitle(null);
  // }, [pathname]);

  return (
    <>
      {isHome && <Banner />}
      <div className='fr-container mb2'>
        {!isHome && <BreadCrumb />}
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
                <div key={e.id} style={{ marginBottom: marginsBottom[e.espacement_bas] }}>
                  <div className='grid2'>
                    {dataArticles &&
                      dataArticles.map((flux) => {
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
              return <BlocCards articles={dataArticles} type='breve' />;
            case 'bloc-de-publications-strategiques':
              return <BlocCards articles={strategiques} type='rapport-strategique' />;
            case 'bloc-de-rapports-de-recherches':
              return <BlocCards articles={dataArticles.map((article) => article.attributes)} type='etude' />;
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
    </>
  );
};
