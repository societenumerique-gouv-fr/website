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
  type: 'carte-verticale' | 'breve' | 'etude';
  espacement_bas: keyof typeof marginsBottom;
  label?: 'Evènement' | string;
  nom_de_page?: string;
  titre_de_la_carte?: string;
  texte_de_la_carte?: string;
  publishedAt?: Date;
  createdAt?: Date;
  image?: {
    data: ImageData | null;
  };
  labels: Label[];
  lien: string;
  titre_du_lien: string;
  texte_en_valeur: string | null;
  texte: 'Moyen' | null;
  position?: 'Centre' | string;
};

type VerticalCardProps = {
  data: CardData;
  rows: number;
  height?: string;
  width?: string;
  fontsizeLabel?: string;
  text?: string;
};

export const VerticalCard = ({ data, rows, height, width, fontsizeLabel, text }: VerticalCardProps) => (
  <>
    {data.type !== 'carte-verticale' && (
      <div key={data.id}>
        <div
          className='fr-card fr-enlarge-link'
          style={{
            height: '430px',
            marginBottom: marginsBottom[data.espacement_bas] || '0px'
          }}>
          <div className='fr-card__body card-img'>
            <div className='fr-card__content'>
              {data.label && <p className={data.label === 'Evènement' ? 'fr-tag jaune' : 'fr-tag rose'}>{data.label}</p>}
              {data.type === 'etude' && <p className='fr-tag rose'>Étude</p>}
              <h3 className='fr-card__title mt1'>
                <Link href={`/${data.nom_de_page}`} className='grey-75'>
                  {data.titre_de_la_carte}
                </Link>
              </h3>
            </div>
          </div>
          {data.image?.data?.attributes.url && (
            <div className='fr-card__header' style={{ height: '200px', overflow: 'hidden' }}>
              <img className='fr-responsive-img' src={data.image.data.attributes.url} alt='' loading='lazy' />
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
          justifyContent: rows > 1 ? 'center' : data.position === 'Centre' ? 'center' : '',
          marginBottom: marginsBottom[data.espacement_bas] || '0px'
        }}>
        <div className='fr-card fr-enlarge-link'>
          <div
            className='fr-card__body card-img mb3'
            style={{
              height: height && rows === 1 ? height : '',
              width: width && rows === 1 ? width : ''
            }}>
            <div
              className='fr-card__content'
              style={{
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '0px'
              }}>
              <div>
                {data.labels.length > 0 &&
                  data.labels.map((label) => (
                    <span
                      key={label.titre_du_label}
                      className={`card-label ${labelColors['Violet']}`}
                      style={{
                        fontSize: fontsizeLabel,
                        color: 'rgb(0,0,185)'
                      }}>
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
                <strong>{data.texte_en_valeur}</strong> {text && text.length > 0 ? text : data.texte}
              </p>
              <i className='ri-arrow-right-line vertical-card-arrow'></i>
            </div>
          </div>
          {data.image?.data?.attributes.url && (
            <div className='fr-card__header' style={{ height: '200px', overflow: 'hidden' }}>
              <img
                className='fr-responsive-img'
                src={data.image.data.attributes.url}
                alt=''
                loading='lazy'
                style={{
                  width: width && rows === 1 ? width : ''
                }}
              />
            </div>
          )}
        </div>
      </div>
    )}
  </>
);
