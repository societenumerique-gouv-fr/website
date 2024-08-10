// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client';

import { Footer as FooterDsfr } from '@codegouvfr/react-dsfr/Footer';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchData } from '@/functions/fetcher';

export const Footer = () => {
  const [content, setContent] = useState([]);
  const [colMd, setColMd] = useState(null);
  const [footerLinks, setFooterLinks] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);

  const loadContent = async () => {
    try {
      const resp = await fetchData(process.env.NEXT_PUBLIC_STRAPI_URL + '/api/footer');
      setContent(resp.data.attributes);
    } catch (e) {
      console.log('Erreur', e);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  useEffect(() => {
    if (content) {
      content.afficher_section ? setColMd('fr-col-md-4 footer-padding') : setColMd('fr-col-md-8');
      if (content.liens_footer) setFooterLinks(content.liens_footer[0].liens_footer);
      if (content.logo) setLogoUrl(content.logo.data?.attributes.url);
    }
  }, [content]);

  return (
    <>
      <div className='fr-follow'>
        <div className='fr-container'>
          <div className='fr-grid-row'>
            {content.afficher_section && (
              <div className='fr-col-12 fr-col-md-4'>
                <div>
                  <p className='fr-h5'>{content.titre_abonnement}</p>
                  <a
                    href={content.lien_du_bouton_abonnement}
                    className='fr-btn footer-left-button'
                    title={content.texte_du_bouton_abonnement}>
                    {content.texte_du_bouton_abonnement}
                  </a>
                </div>
              </div>
            )}
            <div className={`fr-col-12 ${colMd}`}>
              <div className='fr-follow__newsletter'>
                <div>
                  <p className='fr-h5'>{content.titre}</p>
                  <p className='fr-text--sm'>{content.texte}</p>
                </div>
                <div>
                  <a href={content.lien_du_bouton} className='fr-btn' title={content.texte_du_bouton}>
                    {content.texte_du_bouton}
                  </a>
                </div>
              </div>
            </div>

            <div className='fr-col-12 fr-col-md-4'>
              <div className='fr-follow__social footer-left-button'>
                <p className='fr-h5'>Suivez-nous sur les réseaux sociaux</p>
                <ul className='fr-links-group'>
                  {content.lien_facebook != null && (
                    <li>
                      <a
                        className='fr-link--facebook fr-link'
                        title=''
                        href={content.lien_facebook}
                        target='_blank'
                        rel='noreferrer'>
                        facebook
                      </a>
                    </li>
                  )}
                  {content.lien_twitter != null && (
                    <li>
                      <a
                        className='fr-link--twitter fr-link'
                        title=''
                        href={content.lien_twitter}
                        target='_blank'
                        rel='noreferrer'>
                        twitter
                      </a>
                    </li>
                  )}
                  {content.lien_instagram != null && (
                    <li>
                      <a
                        className='fr-link--instagram fr-link'
                        title=''
                        href={content.lien_instagram}
                        target='_blank'
                        rel='noreferrer'>
                        instagram
                      </a>
                    </li>
                  )}
                  {content.lien_linkedin != null && (
                    <li>
                      <a
                        className='fr-link--linkedin fr-link'
                        title=''
                        href={content.lien_linkedin}
                        target='_blank'
                        rel='noreferrer'>
                        linkedin
                      </a>
                    </li>
                  )}
                  {content.lien_youtube != null && (
                    <li>
                      <a
                        className='fr-link--youtube fr-link'
                        title=''
                        href={content.lien_youtube}
                        target='_blank'
                        rel='noreferrer'>
                        youtube
                      </a>
                    </li>
                  )}
                  {content.lien_mastodon != null && (
                    <li>
                      <a className='fr-link' title='' href={content.lien_mastodon} target='_blank' rel='noreferrer'>
                        <span className='fr-icon-mastodon-fill' aria-hidden='true'></span>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterDsfr
        brandTop={
          <>
            République
            <br />
            Française
          </>
        }
        homeLinkProps={{ href: '/', title: 'Accueil - Société Numérique' }}
        accessibility='non compliant'
        contentDescription='Le Programme Société Numérique de l’Agence Nationale de la Cohésion des Territoires œuvre en faveur d’un numérique d’intérêt général en offrant à tous et toutes les clés d’appropriation du numérique.'
        operatorLogo={{
          alt: 'Programme Société Numérique',
          imgUrl: logoUrl,
          orientation: 'horizontal'
        }}
        bottomItems={footerLinks?.map((link) => (
          <Link
            key={link.url}
            className='fr-footer__bottom-link'
            href={link.url}
            target={link.url.includes('https') ? '__blank' : undefined}>
            {link.titre_du_lien}
          </Link>
        ))}
      />
    </>
  );
};
