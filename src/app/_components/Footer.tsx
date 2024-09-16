'use client';

import { Footer as FooterDsfr } from '@codegouvfr/react-dsfr/Footer';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchData } from '@/functions/fetcher';

type FooterLink = {
  url: string;
  titre_du_lien: string;
};

type FooterContent = {
  afficher_section?: boolean;
  titre_abonnement?: string;
  lien_du_bouton_abonnement?: string;
  texte_du_bouton_abonnement?: string;
  titre?: string;
  texte?: string;
  lien_du_bouton?: string;
  texte_du_bouton?: string;
  lien_facebook?: string;
  lien_twitter?: string;
  lien_instagram?: string;
  lien_linkedin?: string;
  lien_youtube?: string;
  lien_mastodon?: string;
  liens_footer?: {
    liens_footer: FooterLink[];
  }[];
  logo?: {
    data?: {
      attributes?: {
        url?: string;
      };
    };
  };
};

export const Footer = () => {
  const [content, setContent] = useState<FooterContent | null>(null);
  const [colMd, setColMd] = useState<string>('fr-col-md-8');
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([]);
  const [logoUrl, setLogoUrl] = useState<string>('');

  const loadContent = async () => {
    try {
      const resp = await fetchData(process.env.NEXT_PUBLIC_STRAPI_URL + '/api/footer');
      setContent(resp.data.attributes);
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  useEffect(() => {
    if (content) {
      setColMd(content.afficher_section ? 'fr-col-md-4 footer-padding' : 'fr-col-md-8');
      if (content.liens_footer && content.liens_footer.length > 0) {
        setFooterLinks(content.liens_footer[0].liens_footer);
      }
      setLogoUrl(content.logo?.data?.attributes?.url ?? '');
    }
  }, [content]);

  return (
    <div>
      <div className='fr-follow'>
        <div className='fr-container'>
          <div className='fr-grid-row'>
            {content?.afficher_section && (
              <div className='fr-col-12 fr-col-md-4'>
                <div>
                  <p className='fr-h5'>{content.titre_abonnement}</p>
                  <a
                    href={content.lien_du_bouton_abonnement ?? '#'}
                    className='fr-btn footer-left-button'
                    title={content.texte_du_bouton_abonnement ?? ''}>
                    {content.texte_du_bouton_abonnement ?? "S'abonner"}
                  </a>
                </div>
              </div>
            )}
            <div className={`fr-col-12 ${colMd}`}>
              <div className='fr-follow__newsletter'>
                <div>
                  <p className='fr-h5'>{content?.titre ?? 'Titre'}</p>
                  <p className='fr-text--sm'>{content?.texte ?? 'Texte'}</p>
                </div>
                <div>
                  <a href={content?.lien_du_bouton ?? '#'} className='fr-btn' title={content?.texte_du_bouton ?? ''}>
                    {content?.texte_du_bouton ?? 'En savoir plus'}
                  </a>
                </div>
              </div>
            </div>
            <div className='fr-col-12 fr-col-md-4'>
              <div className='fr-follow__social footer-left-button'>
                <p className='fr-h5'>Suivez-nous sur les réseaux sociaux</p>
                <ul className='fr-links-group'>
                  {content?.lien_facebook && (
                    <li>
                      <a
                        className='fr-link--facebook fr-link'
                        title='Facebook'
                        href={content.lien_facebook}
                        target='_blank'
                        rel='noreferrer'>
                        facebook
                      </a>
                    </li>
                  )}
                  {content?.lien_twitter && (
                    <li>
                      <a
                        className='fr-link--twitter fr-link'
                        title='Twitter'
                        href={content.lien_twitter}
                        target='_blank'
                        rel='noreferrer'>
                        twitter
                      </a>
                    </li>
                  )}
                  {content?.lien_instagram && (
                    <li>
                      <a
                        className='fr-link--instagram fr-link'
                        title='Instagram'
                        href={content.lien_instagram}
                        target='_blank'
                        rel='noreferrer'>
                        instagram
                      </a>
                    </li>
                  )}
                  {content?.lien_linkedin && (
                    <li>
                      <a
                        className='fr-link--linkedin fr-link'
                        title='LinkedIn'
                        href={content.lien_linkedin}
                        target='_blank'
                        rel='noreferrer'>
                        linkedin
                      </a>
                    </li>
                  )}
                  {content?.lien_youtube && (
                    <li>
                      <a
                        className='fr-link--youtube fr-link'
                        title='YouTube'
                        href={content.lien_youtube}
                        target='_blank'
                        rel='noreferrer'>
                        youtube
                      </a>
                    </li>
                  )}
                  {content?.lien_mastodon && (
                    <li>
                      <a className='fr-link' title='Mastodon' href={content.lien_mastodon} target='_blank' rel='noreferrer'>
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
        accessibilityLinkProps={{ href: '/accessibilite' }}
        contentDescription='Le Programme Société Numérique de l’Agence Nationale de la Cohésion des Territoires œuvre en faveur d’un numérique d’intérêt général en offrant à tous et toutes les clés d’appropriation du numérique.'
        operatorLogo={{
          alt: 'Programme Société Numérique',
          imgUrl: logoUrl,
          orientation: 'horizontal'
        }}
        bottomItems={footerLinks.map((link) => (
          <Link
            key={link.url}
            className='fr-footer__bottom-link'
            href={link.url}
            target={link.url.startsWith('https') ? '_blank' : undefined}>
            {link.titre_du_lien}
          </Link>
        ))}
      />
    </div>
  );
};
