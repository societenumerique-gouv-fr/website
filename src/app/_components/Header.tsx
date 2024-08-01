// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchData } from '@/functions/fetcher';

type LienNavbar = {
  id: string;
  __component: 'composants.lien';
  titre_du_lien: string;
  page_cible: string;
};

type HeaderProps = {
  alerte: {
    id: number;
    attributes: {
      createdAt: Date;
      updatedAt: Date;
      publishedAt: Date;
      message: string | null;
    };
  }[];
  liens_navbar: {
    id: number;
    attributes: {
      createdAt: Date;
      updatedAt: Date;
      publishedAt: Date;
      lien_navbar: LienNavbar[];
    };
  }[];
};

export const Header = ({ alerte, liens_navbar }: HeaderProps) => {
  const [selectedLink, setSelectedLink] = useState(null);
  const [selectedSubLink, setSelectedSubLink] = useState(null);
  const [currentCollapse, setCurrentCollapse] = useState(null);
  const [headerAlerte, setHeaderAlerte] = useState(null);
  const [fixNav, setFixNav] = useState(false);
  const [headerImage, setHeaderImage] = useState(null);
  const [headerLinks, setHeaderLinks] = useState(null);
  const pathname = usePathname();

  const getNestedPath = (path: string) => {
    switch (path) {
      case 'rapports-strategiques':
        return 'nos-ressources/';
      case 'etudes':
        return 'nos-ressources/';
      case 'breves':
        return 'actualites/';
      default:
        return '';
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 145) {
        setFixNav(true);
      } else if (window.scrollY < 145) {
        setFixNav(false);
      }
    });
  }, []);

  useEffect(() => {
    if (liens_navbar) {
      let current_link = null;
      if (pathname == '/') {
        current_link = liens_navbar[0];
      } else {
        const index = liens_navbar.find(
          (e) =>
            e.attributes.titre
              .split(' ')
              .join('-')
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '') == pathname.slice(1).split('/')[0]
        );
        current_link = index;
        if (index != null) {
          if (index.attributes.lien_navbar[0].__component == 'composants.deroulant-navbar') {
            setCurrentCollapse(index.id);
          }
        }
      }
      if (current_link) setSelectedLink(current_link);
    }
  }, [liens_navbar]);

  useEffect(() => {
    if (alerte.length > 0) setHeaderAlerte(alerte[0]);
  }, [alerte]);

  useEffect(() => {
    const currentPath = pathname;
    liens_navbar.map((lien_navbar) => {
      if (
        currentPath.includes(lien_navbar.attributes.lien_navbar[0].page_cible) &&
        lien_navbar.attributes.lien_navbar[0].page_cible != '/'
      ) {
        setSelectedLink(lien_navbar);
      }
      if (lien_navbar.attributes.lien_navbar[0].liens != null || lien_navbar.attributes.lien_navbar[0].liens != undefined) {
        const linkIndex = lien_navbar.attributes.lien_navbar[0].liens.findIndex((f) => currentPath.includes(f.page_cible));
        if (linkIndex != -1) {
          setSelectedLink(lien_navbar);
          setCurrentCollapse(lien_navbar.id);
        }
      }
    });
  }, [pathname]);

  useEffect(() => {
    ///LIENS DU HEADER///
    const loadHeaderLinks = async () => {
      try {
        const resp = await fetchData(process.env.NEXT_PUBLIC_STRAPI_URL + '/api/header');
        setHeaderLinks(resp.data.attributes.liens_header);
        setHeaderImage(resp.data.attributes.logo.data.attributes.url);
      } catch (e) {
        console.log('Erreur', e);
      }
    };
    loadHeaderLinks();
  }, []);

  const giveMePath = (svg_coords) => {
    const start_path = svg_coords.indexOf('<path d="') + 9;
    const end_path = svg_coords.indexOf('"></path>');
    return svg_coords.slice(start_path, end_path);
  };

  return (
    <>
      <header role='banner' className={`fr-header ${fixNav ? 'sticky-header' : ''}`}>
        <div className='fr-header__body'>
          <div className='fr-container'>
            <div className='fr-header__body-row'>
              <div className='fr-header__brand fr-enlarge-link'>
                <div className='fr-header__brand-top'>
                  <div className='fr-header__logo'>
                    <a href='/' title='Accueil - ANCT'>
                      <img
                        src={process.env.NEXT_PUBLIC_STRAPI_URL + '/uploads/rp_6c5a005a88.svg'}
                        style={{ width: '4.9rem' }}
                      />
                    </a>
                  </div>
                  <div className='fr-header__operator'>
                    <img
                      className='fr-responsive-img'
                      style={{ maxWidth: '9.0625rem' }}
                      src={process.env.NEXT_PUBLIC_STRAPI_URL + headerImage}
                      alt='Logo Société Numérique'
                    />
                  </div>
                  <div className='fr-header__navbar'>
                    <button
                      className='fr-btn--menu fr-btn'
                      data-fr-opened='false'
                      aria-controls='modal-491'
                      aria-haspopup='menu'
                      id='button-492'
                      title='Menu'>
                      Menu
                    </button>
                  </div>
                </div>
                <div className='fr-header__service'>
                  <a href='/' title='Accueil : Société Numérique'>
                    <p className='fr-header__service-title'>Programme Société Numérique</p>
                  </a>
                </div>
              </div>
              <div className='fr-header__tools'>
                <div className='fr-header__tools-links'>
                  <ul className='fr-btns-group ty10'>
                    {headerLinks &&
                      headerLinks.map((headerLink, index) => {
                        return (
                          <li key={headerLink.id} className='subspace'>
                            <Link
                              href={headerLink.page_cible}
                              className='headerlink sublink'
                              target={headerLink.page_cible.includes('https') ? '_blank' : undefined}>
                              {headerLink.pictogramme_remixicon && (
                                <>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    style={{ width: '22px', position: 'absolute', top: '2px' }}
                                    viewBox='0 0 24 24'>
                                    <path d={giveMePath(headerLink.pictogramme_remixicon)} fill='rgb(0,0,145)'></path>
                                  </svg>
                                  <span style={{ marginLeft: '35px' }}>{headerLink.titre_du_lien}</span>
                                </>
                              )}
                              {!headerLink.pictogramme_remixicon && (
                                <>
                                  <div style={{ marginTop: '4px' }}>{headerLink.titre_du_lien}</div>
                                </>
                              )}
                            </Link>
                            {index < headerLinks.length - 1 && <span className='delimiter'></span>}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='fr-header__menu fr-modal' id='modal-491' aria-labelledby='button-492'>
          <div className='fr-container'>
            <button
              className='fr-btn--close fr-btn'
              style={{ backgroundColor: 'white' }}
              aria-controls='modal-491'
              title='Fermer'>
              Fermer
            </button>
            <div className='fr-header__menu-links'></div>
            <nav className='fr-nav' id='navigation-494' role='navigation' aria-label='Menu principal'>
              <ul className='fr-nav__list'>
                {liens_navbar &&
                  liens_navbar.map((lien_navbar) => {
                    return lien_navbar.attributes.lien_navbar[0].__component == 'composants.lien' ? (
                      <li className='fr-nav__item' key={lien_navbar.id}>
                        <Link
                          href={
                            getNestedPath(lien_navbar.attributes.lien_navbar[0].page_cible) +
                            lien_navbar.attributes.lien_navbar[0].page_cible
                          }
                          className='fr-nav__link'
                          target={
                            lien_navbar.attributes.lien_navbar[0].page_cible &&
                            lien_navbar.attributes.lien_navbar[0].page_cible.includes('https://')
                              ? '_blank'
                              : undefined
                          }
                          aria-current={selectedLink === lien_navbar ? 'true' : null}
                          onClick={() => {
                            setSelectedLink(lien_navbar), setCurrentCollapse(null);
                          }}>
                          {lien_navbar.attributes.lien_navbar[0].titre_du_lien}
                        </Link>
                      </li>
                    ) : (
                      <li className='fr-nav__item' key={lien_navbar.id}>
                        <button
                          className='fr-nav__btn'
                          aria-expanded='false'
                          aria-controls={lien_navbar.id}
                          aria-current={currentCollapse === lien_navbar.id ? 'true' : null}
                          onClick={(e) => {
                            if (e.button == 0) setSelectedLink(null);
                          }}>
                          {lien_navbar.attributes.lien_navbar[0].titre_du_menu}
                        </button>
                        <div className='fr-collapse fr-menu' id={lien_navbar.id}>
                          <ul className='fr-menu__list'>
                            {lien_navbar.attributes.lien_navbar[0].liens.map((data) => {
                              return (
                                <li key={data.id}>
                                  <Link
                                    href={getNestedPath(data.page_cible) + data.page_cible}
                                    className='fr-nav__link'
                                    aria-current={selectedSubLink === data ? 'true' : null}
                                    target={data.page_cible && data.page_cible.includes('https://') ? '_blank' : undefined}
                                    onClick={(e) => {
                                      if (e.button == 0) setCurrentCollapse(lien_navbar.id);
                                    }}
                                    onFocus={() => {
                                      setSelectedSubLink(data);
                                      setCurrentCollapse(lien_navbar.id);
                                    }}
                                    onBlur={() => setSelectedSubLink(null)}>
                                    {data.titre_du_lien}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </nav>
          </div>
        </div>
        {headerAlerte && (
          <div className='fr-notice fr-notice--info'>
            <div className='fr-container'>
              <div className='fr-notice__body'>
                <p className='fr-notice__title'>
                  {headerAlerte}
                  <button className='fr-btn--close fr-btn' title='Masquer le message' onClick={() => setHeaderAlerte(null)}>
                    Masquer le message
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
