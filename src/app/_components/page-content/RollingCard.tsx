'use client';

import Link from 'next/link';
import ReactMarkDown from 'react-markdown';
import { marginsBottom } from '../structs';

type BlocDeroulant = {
  texte_du_label?: string;
  texte: string;
};

type RollingCardData = {
  espacement_bas: keyof typeof marginsBottom;
  texte: string;
  bloc_deroulant: BlocDeroulant[];
  texte_du_bouton?: string;
  lien_du_bouton?: string;
};

type RollingCardProps = {
  data: RollingCardData;
};

export const RollingCard: React.FC<RollingCardProps> = ({ data }) => {
  const toggleCollapse = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget as HTMLElement;
    const svgElement = target.getElementsByTagName('svg')[0] as SVGElement;

    if (!(e.target instanceof HTMLElement && e.target.classList.contains('fr-btn'))) {
      if (target.classList.contains('closed')) {
        // OUVERTURE
        svgElement.classList.remove('rollingcard-arrow-close');
        target.classList.remove('closed');
        svgElement.classList.add('rollingcard-arrow-open');
        target.classList.add('opened');

        const contentElement = target.querySelector('.rollingcard-content') as HTMLElement;
        if (contentElement && contentElement.classList.contains('hidden')) {
          contentElement.classList.remove('hidden');
        }
        contentElement?.classList.remove('rollingcard-content-close');
        contentElement?.classList.add('rollingcard-content-open');
      } else if (target.classList.contains('opened')) {
        // FERMETURE
        svgElement.classList.remove('rollingcard-arrow-open');
        target.classList.remove('opened');
        svgElement.classList.add('rollingcard-arrow-close');
        target.classList.add('closed');

        const contentElement = target.querySelector('.rollingcard-content') as HTMLElement;
        contentElement?.classList.remove('rollingcard-content-open');
        contentElement?.classList.add('rollingcard-content-close');
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        className='rollingcard-container closed'
        style={{ marginBottom: marginsBottom[data.espacement_bas] || undefined }}
        onClick={toggleCollapse}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          className='rollingcard-arrow-close'
          style={{ position: 'absolute', width: '30px', right: '30px', top: '50px' }}>
          <path
            d='M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z'
            fill='rgb(0,0,145)'></path>
        </svg>
        <div style={{ marginRight: '60px', marginTop: '15px' }}>
          <ReactMarkDown>{data.texte}</ReactMarkDown>
        </div>
        <div className='rollingcard-content hidden'>
          <div className='rollingcard-separator'></div>
          {data.bloc_deroulant.map((bloc, index) => (
            <div key={index} className='rollingcard-bloc'>
              {bloc.texte_du_label && (
                <div className='rollingcard-bloc-label'>
                  <strong>{bloc.texte_du_label}</strong>
                </div>
              )}
              <div className='rollingcard-bloc-text'>
                <ReactMarkDown>{bloc.texte}</ReactMarkDown>
              </div>
            </div>
          ))}
        </div>
        {data.texte_du_bouton && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <Link href={data.lien_du_bouton || '#'} className='fr-btn'>
              {data.texte_du_bouton}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
