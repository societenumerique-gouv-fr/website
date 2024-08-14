'use client';

import Link from 'next/link';
import { labelColors, marginsBottom } from '../structs';

const height = '300px';
const width = '300px';
const fontsizeLabel = '14px';
const text = '';

type VerticalCardProps = {
  data: {
    id: number;
    image?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
    type: string;
    titre_de_la_carte: string;
    taille: 'Petit' | 'Moyen' | 'Grand';
    texte_en_valeur?: string;
    texte?: string;
    label?: string;
    labels: Array<{
      titre_du_label: string;
    }>;
    espacement_bas: keyof typeof marginsBottom;
    position?: string;
    lien: string;
    titre_du_lien: string;
  };
  rows: number;
};

export const VerticalCard = ({ data, rows }: VerticalCardProps) => {
  const marginBottom = marginsBottom[data.espacement_bas] || '0px';
  const justifyContent = rows > 1 ? 'center' : data.position === 'Centre' ? 'center' : 'flex-start';
  const cardHeight = rows === 1 ? height : undefined;
  const cardWidth = rows === 1 ? width : undefined;
  const imageUrl = data.image?.data?.attributes.url;
  const label = data.label || '';
  const textValue = data.texte_en_valeur || '';
  const cardText = text.length > 0 ? text : data.texte || '';

  return (
    <>
      {data.type !== 'carte-verticale' && (
        <div key={data.id}>
          <div className='fr-card fr-enlarge-link' style={{ height: '430px', marginBottom }}>
            <div className='fr-card__body card-img'>
              <div className='fr-card__content'>
                <p className={label === 'Evènement' ? 'fr-tag jaune' : 'fr-tag rose'}>{label}</p>
                <h3 className='fr-card__title mt1'>
                  <Link href={`/${data.titre_de_la_carte}`} className='grey-75'>
                    {data.titre_de_la_carte}
                  </Link>
                </h3>
              </div>
            </div>
            {imageUrl && (
              <div className='fr-card__header' style={{ height: '200px', overflow: 'hidden' }}>
                <img className='fr-responsive-img' src={imageUrl} alt='' loading='lazy' />
              </div>
            )}
          </div>
        </div>
      )}
      {data.type === 'carte-verticale' && (
        <div
          key={data.id}
          className='mt2 mb2'
          style={{
            display: 'flex',
            justifyContent,
            marginBottom
          }}>
          <div className='fr-card fr-enlarge-link'>
            <div
              className='fr-card__body card-img mb3'
              style={{
                height: cardHeight,
                width: cardWidth
              }}>
              <div className='fr-card__content' style={{ paddingLeft: '16px', paddingRight: '16px', paddingTop: '0px' }}>
                <div>
                  {data.labels.length > 0 &&
                    data.labels.map((label) => (
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
                    href={data.lien}
                    target={data.lien.includes('https://') ? '_blank' : undefined}
                    style={{ color: '#000091' }}>
                    {data.titre_du_lien}
                  </Link>
                </h4>
                <p>
                  <strong>{textValue}</strong> {cardText}
                </p>
                <i className='ri-arrow-right-line vertical-card-arrow'></i>
              </div>
            </div>
            {imageUrl && (
              <div className='fr-card__header' style={{ height: '200px', overflow: 'hidden' }}>
                <img className='fr-responsive-img' src={imageUrl} alt='' loading='lazy' style={{ width: cardWidth }} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
