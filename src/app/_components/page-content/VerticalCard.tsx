'use client';

import Link from 'next/link';
import { labelColors, marginsBottom } from '../structs';

type Label = {
  titre_du_label: string;
};

type ImageData = {
  attributes: {
    url: string;
  };
};

export type CardData = {
  id: string;
  type: 'carte-verticale' | 'autre';
  espacement_bas: string;
  label: 'Evènement' | string;
  nom_de_page: string;
  titre_de_la_carte: string;
  image: {
    data?: ImageData;
  };
  labels: Label[];
  lien: string;
  titre_du_lien: string;
  texte_en_valeur: string;
  texte: string;
  position?: 'Centre' | string;
};

type VerticalCardProps = {
  data: {
    attributes: CardData;
  };
  rows: number;
  height?: string;
  width?: string;
  fontsizeLabel?: string;
  text?: string;
};

export const VerticalCard: React.FC<VerticalCardProps> = ({ data, rows, height, width, fontsizeLabel, text }) => (
  <>
    {data.attributes.type !== 'carte-verticale' && (
      <div key={data.attributes.id}>
        <div
          className='fr-card fr-enlarge-link'
          style={{ height: '430px', marginBottom: marginsBottom[data.attributes.espacement_bas] }}>
          <div className='fr-card__body card-img'>
            <div className='fr-card__content'>
              <p className={data.attributes.label === 'Evènement' ? 'fr-tag jaune' : 'fr-tag rose'}>{data.attributes.label}</p>
              <h3 className='fr-card__title mt1'>
                <Link href={`/${data.attributes.nom_de_page}`} className='grey-75'>
                  {data.attributes.titre_de_la_carte}
                </Link>
              </h3>
            </div>
          </div>
          {data.attributes.image.data?.attributes.url && (
            <div className='fr-card__header' style={{ height: '200px', overflow: 'hidden' }}>
              <img className='fr-responsive-img' src={data.attributes.image.data.attributes.url} alt='' loading='lazy' />
            </div>
          )}
        </div>
      </div>
    )}
    {data.attributes.type === 'carte-verticale' && (
      <div
        key={data.attributes.id}
        className='mt2 mb2'
        style={{
          display: 'flex',
          justifyContent: rows > 1 ? 'center' : data.attributes.position === 'Centre' ? 'center' : '',
          marginBottom: marginsBottom[data.attributes.espacement_bas]
        }}>
        <div className='fr-card fr-enlarge-link'>
          <div
            className='fr-card__body card-img mb3'
            style={{
              height: height && rows === 1 ? height : '',
              width: width && rows === 1 ? width : ''
            }}>
            <div className='fr-card__content' style={{ paddingLeft: '16px', paddingRight: '16px', paddingTop: '0px' }}>
              <div>
                {data.attributes.labels.length > 0 &&
                  data.attributes.labels.map((label) => (
                    <span
                      key={label.titre_du_label}
                      className={`card-label ${labelColors['Violet']}`}
                      style={{ fontSize: fontsizeLabel, color: 'rgb(0,0,185)' }}>
                      {label.titre_du_label}
                    </span>
                  ))}
              </div>
              <h4 className='mt1'>
                <Link
                  href={data.attributes.lien}
                  target={data.attributes.lien.includes('https://') ? '_blank' : undefined}
                  style={{ color: '#000091' }}>
                  {data.attributes.titre_du_lien}
                </Link>
              </h4>
              <p>
                <strong>{data.attributes.texte_en_valeur}</strong> {text?.length > 0 ? text : data.attributes.texte}
              </p>
              <i className='ri-arrow-right-line vertical-card-arrow'></i>
            </div>
          </div>
          {data.attributes.image.data?.attributes.url && (
            <div className='fr-card__header' style={{ height: '200px', overflow: 'hidden' }}>
              <img
                className='fr-responsive-img'
                src={data.attributes.image.data.attributes.url}
                alt=''
                loading='lazy'
                style={{ width: width && rows === 1 ? width : '' }}
              />
            </div>
          )}
        </div>
      </div>
    )}
  </>
);
