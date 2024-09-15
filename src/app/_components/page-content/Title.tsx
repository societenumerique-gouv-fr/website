'use client';

import Link from 'next/link';
import { marginsBottom, position } from '../structs';

type TitleProps = {
  data: {
    titre: string;
    taille: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    espacement_bas: keyof typeof marginsBottom;
    position: 'Gauche' | 'Centre' | 'Droite';
    page_cible?: string;
    titre_du_lien?: string;
  };
};

export const Title = ({ data }: TitleProps) => {
  const positionClass = position[data.position as keyof typeof position] || 'center';

  return (
    <div
      className={`${positionClass === 'left' || positionClass === 'right' ? positionClass : 'center'}`}
      style={{
        marginTop: '16px',
        marginBottom: marginsBottom[data.espacement_bas] || '0px'
      }}>
      {data.taille === 'h1' && <h1>{data.titre}</h1>}
      {data.taille === 'h2' && <h2>{data.titre}</h2>}
      {data.taille === 'h3' && <h3>{data.titre}</h3>}
      {data.taille === 'h4' && <h4>{data.titre}</h4>}
      {data.taille === 'h5' && <h5>{data.titre}</h5>}
      {data.taille === 'h6' && <h6>{data.titre}</h6>}

      {data.position === 'Gauche' && data.page_cible && (
        <Link
          href={data.page_cible}
          style={{ marginRight: '24px' }}
          className={`fr-link fr-link--sm hover-title-link title-link`}
          target={data.page_cible.includes('https://') ? '_blank' : undefined}>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {data.titre_du_lien}
            <svg
              style={{ width: '20px', marginLeft: '4px' }}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='svg-icon'>
              <path
                d='M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z'
                fill='rgb(0, 0, 145)'></path>
            </svg>
          </span>
        </Link>
      )}
    </div>
  );
};
