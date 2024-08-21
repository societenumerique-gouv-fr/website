'use client';

import React from 'react';
import { labelColors, marginsBottom } from '../structs';

type DownloadCardLocalData = {
  id: string;
  image_de_la_carte: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  type_de_carte: 'Tuile' | 'Classique';
  taille: 'Petit' | 'Grand';
  media_a_telecharger: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  titre_de_la_carte: string;
  description_de_la_carte: string;
  label?: {
    couleur_du_label: keyof typeof labelColors;
    titre_du_label: string;
  };
  espacement_bas: keyof typeof marginsBottom;
  position: 'Centre' | 'Gauche' | 'Droite';
  telechargement_externe?: string;
};

type DownloadCardProps = {
  data: DownloadCardLocalData;
  rows: number;
};

export const DownloadCard = ({ data, rows }: DownloadCardProps) => {
  if (!data) {
    return null;
  }

  const marginBottomValue = marginsBottom[data.espacement_bas] || 'default';
  const colorClass = data.label?.couleur_du_label ? labelColors[data.label.couleur_du_label] : 'defaultColorClass';

  return (
    <>
      {data.type_de_carte === 'Tuile' && (
        <div
          key={data.id}
          style={
            rows === 1
              ? {
                  display: 'flex',
                  justifyContent: data.position === 'Centre' ? 'center' : data.position === 'Gauche' ? 'flex-start' : 'flex-end'
                }
              : {}
          }>
          <div
            className='fr-tile fr-tile--download fr-enlarge-link mb2'
            id='tile-6735'
            style={{ marginBottom: marginBottomValue }}>
            <div className='fr-tile__body'>
              <div className='fr-tile__content'>
                <h3 className='fr-tile__title'>
                  <a
                    href={
                      data.media_a_telecharger.data
                        ? data.media_a_telecharger.data.attributes.url
                        : data.telechargement_externe || '#'
                    }
                    download
                    target='_blank'
                    data-fr-assess-file='arraybuffer'
                    hrefLang='fr'>
                    {data.titre_de_la_carte}
                  </a>
                </h3>
                <p className='fr-card__desc'>
                  {data.label && (
                    <span
                      className={`card-label ${colorClass}`}
                      style={{ fontSize: '14px', display: 'block', marginTop: '0px', marginBottom: '16px' }}>
                      {data.label.titre_du_label}
                    </span>
                  )}
                  {data.description_de_la_carte}
                </p>
                <p className='fr-tile__detail'>Détail (optionel)</p>
              </div>
            </div>
            {data.image_de_la_carte.data?.attributes.url && (
              <div className='fr-tile__header'>
                <div className='fr-tile__pictogram'>
                  <img src={data.image_de_la_carte.data.attributes.url} alt='' layout='fill' objectFit='contain' />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {data.type_de_carte === 'Classique' && (
        <div
          className={[
            rows === 1
              ? `fr-grid-row fr-grid-row--gutters ${marginsBottom[data.espacement_bas]} fr-col-md-6`
              : `fr-col-md-${12 / rows} fr-col ${marginsBottom[data.espacement_bas]}}`,
            data.position === 'Centre' ? 'fr-mx-auto' : undefined,
            data.position === 'Gauche' ? 'fr-mr-auto' : undefined,
            data.position === 'Droite' ? 'fr-ms-auto' : undefined
          ].join(' ')}
          key={data.id}>
          <div
            className='fr-card fr-enlarge-link fr-card--horizontal fr-card--horizontal-half mb2'
            style={{ marginBottom: marginBottomValue }}>
            <div className='fr-card__body'>
              <div className='fr-card__content'>
                <h3 className='fr-card__title blue-text'>{data.titre_de_la_carte}</h3>
                <a
                  href={
                    data.media_a_telecharger.data
                      ? data.media_a_telecharger.data.attributes.url
                      : data.telechargement_externe || '#'
                  }
                  target='_blank'
                  hrefLang='fr'></a>
                <p className='fr-card__desc'>{data.description_de_la_carte}</p>
                <div className='fr-card__start'>
                  {data.label && (
                    <span
                      className={`card-label ${colorClass}`}
                      style={{ fontSize: '14px', display: 'block', marginTop: '0px', marginBottom: '16px' }}>
                      {data.label.titre_du_label}
                    </span>
                  )}
                </div>
                <div className='fr-card__end'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    style={{ width: '25px', position: 'absolute', right: '24px', bottom: '24px' }}
                    viewBox='0 0 24 24'>
                    <path
                      d='M3 19H21V21H3V19ZM13 13.1716L19.0711 7.1005L20.4853 8.51472L12 17L3.51472 8.51472L4.92893 7.1005L11 13.1716V2H13V13.1716Z'
                      fill='#000091'></path>
                  </svg>
                </div>
              </div>
            </div>
            {data.image_de_la_carte.data?.attributes.url && (
              <div className='fr-card__header fr-col-md-4'>
                <div className='fr-card__img'>
                  <img
                    className='fr-p-3w'
                    src={data.image_de_la_carte.data.attributes.url}
                    alt=''
                    layout='responsive'
                    width={600}
                    height={400}
                    objectFit='contain'
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
