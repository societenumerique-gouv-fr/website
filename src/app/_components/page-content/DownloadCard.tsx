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
        className='fr-card fr-enlarge-link fr-card--download fr-card--horizontal fr-card--horizontal-half mb2'
        style={{ marginBottom: marginBottomValue }}>
        <div className='fr-card__body'>
          <div className='fr-card__content'>
            <h3 className='fr-card__title'>
              <a
                href={
                  data.media_a_telecharger.data
                    ? data.media_a_telecharger.data.attributes.url
                    : data.telechargement_externe || '#'
                }
                target='_blank'
                hrefLang='fr'>
                {data.titre_de_la_carte}
              </a>
            </h3>
            {data.description_de_la_carte && <p className='fr-card__desc'>{data.description_de_la_carte}</p>}
            {data.label && (
              <div className='fr-card__start'>
                <span
                  className={`card-label ${colorClass}`}
                  style={{ fontSize: '14px', display: 'block', marginTop: '0px', marginBottom: '16px' }}>
                  {data.label.titre_du_label}
                </span>
              </div>
            )}
          </div>
        </div>
        {data.image_de_la_carte.data?.attributes.url && (
          <div className='fr-card__header fr-col-md-4'>
            <div className='fr-card__img'>
              <img
                className='fr-p-3w'
                style={{ width: '100%', objectFit: 'contain' }}
                src={data.image_de_la_carte.data.attributes.url}
                alt=''
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
