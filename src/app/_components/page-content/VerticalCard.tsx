// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Link from 'next/link';
import { labelColors, marginsBottom } from '../structs';

export const VerticalCard = ({ data, rows }) => (
  <>
    {data.attributes.type != 'carte-verticale' && (
      <div key={data.attributes.id}>
        <div
          className='fr-card fr-enlarge-link'
          style={{ height: '430px', marginBottom: marginsBottom[data.attributes.espacement_bas] }}>
          <div className='fr-card__body card-img'>
            <div className='fr-card__content'>
              <p className={data.attributes.label == 'Evènement' ? 'fr-tag jaune' : 'fr-tag rose'}>{data.attributes.label}</p>
              <h3 className='fr-card__title mt1'>
                <Link href={`/${data.attributes.nom_de_page}`} className='grey-75'>
                  {' '}
                  {data.attributes.titre_de_la_carte}{' '}
                </Link>
              </h3>
            </div>
          </div>
          {data.attributes.image.data?.attributes.url && (
            <div className='fr-card__header'>
              <img
                className='fr-responsive-img'
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data.attributes.image.data.attributes.url}`}
                alt=''
                loading='lazy'
                style={{ minHeight: '200px' }}
              />
            </div>
          )}
        </div>
      </div>
    )}
    {data.attributes.type == 'carte-verticale' && (
      <div
        key={data.attributes.id}
        className='mt2 mb2'
        style={{
          display: 'flex',
          justifyContent: rows > 1 ? 'center' : data.attributes.position == 'Centre' ? 'center' : '',
          marginBottom: marginsBottom[data.attributes.espacement_bas]
        }}>
        <div className='fr-card fr-enlarge-link'>
          <div
            className='fr-card__body card-img mb3'
            style={{
              height: height && rows == 1 ? height : '',
              width: width && rows == 1 ? width : ''
            }}>
            <div className='fr-card__content' style={{ paddingLeft: '16px', paddingRight: '16px', paddingTop: '0px' }}>
              <div>
                {data.attributes.labels.length > 0 &&
                  data.attributes.labels.map((label) => {
                    return (
                      <span
                        key={label.titre_du_label}
                        className={`card-label ${labelColors['Violet']}`}
                        style={{ fontSize: fontsizeLabel, color: 'rgb(0,0,185)' }}>
                        {label.titre_du_label}
                      </span>
                    );
                  })}
              </div>
              <h4 className='mt1'>
                <Link
                  href={data.attributes.lien}
                  target={data.attributes.lien && data.attributes.lien.includes('https://') ? '_blank' : undefined}
                  style={{ color: '#000091' }}>
                  {data.attributes.titre_du_lien}
                </Link>
              </h4>
              <p>
                <strong>{data.attributes.texte_en_valeur}</strong> {text.length > 0 ? text : data.attributes.texte}
              </p>
              <i className='ri-arrow-right-line vertical-card-arrow'></i>
            </div>
          </div>
          {data.attributes.image.data.attributes.url && (
            <div className='fr-card__header'>
              <img
                className='fr-responsive-img'
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data.attributes.image.data.attributes.url}`}
                alt=''
                loading='lazy'
                style={{ minHeight: '200px', width: width && rows == 1 ? width : '' }}
              />
            </div>
          )}
        </div>
      </div>
    )}
  </>
);
