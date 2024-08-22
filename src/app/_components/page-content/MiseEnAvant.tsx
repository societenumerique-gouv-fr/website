'use client';

import Link from 'next/link';
import { marginsBottom } from '../structs';

type MiseEnAvantProps = {
  data: {
    pictogramme_remixicon: string;
    afficher_pictogramme: string;
    espacement_bas: keyof typeof marginsBottom;
    titre_du_bouton: string;
    texte: string;
    titre: string;
    lien_du_bouton: string;
  };
};

export const MiseEnAvant = ({ data }: MiseEnAvantProps) => {
  const marginBottomValue = marginsBottom[data.espacement_bas] || '0px';

  const giveMePath = (svg_coords: string) => {
    const start_path = svg_coords.indexOf('<path d="') + 9;
    const end_path = svg_coords.indexOf('"></path>');
    return svg_coords.slice(start_path, end_path);
  };

  return (
    <div className={`fr-callout`} style={{ marginTop: '32px', marginBottom: marginBottomValue }}>
      {' '}
      {data.afficher_pictogramme && data.pictogramme_remixicon && (
        <div style={{ width: '25px', position: 'absolute', top: '16px', left: '16px' }}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path d={giveMePath(data.pictogramme_remixicon)}></path>
          </svg>
        </div>
      )}
      <h3 className='fr-callout__title mt1'>{data.titre}</h3>
      <p className='fr-callout__text'>{data.texte}</p>
      {data.titre_du_bouton && (
        <Link
          href={data.lien_du_bouton}
          target={data.lien_du_bouton.includes('https://') ? '_blank' : undefined}
          className='fr-btn'>
          {data.titre_du_bouton}
        </Link>
      )}
    </div>
  );
};
