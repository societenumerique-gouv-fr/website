'use client';

import Link from 'next/link';
import { marginsBottom } from '../structs';

type EspacementBas = 'default' | 'px8' | 'px16' | 'px32' | 'px48' | 'px64';

type BlocFieldSimple = {
  id: string;
  page_cible: string;
  texte_en_valeur: string;
  texte: string;
};

type DataProps = {
  espacement_bas: EspacementBas;
  titre: string;
  Bloc_simple: BlocFieldSimple[];
};

type BlocFieldsProps = {
  data: DataProps;
};

export const BlocFields = ({ data }: BlocFieldsProps) => {
  const marginBottomValue = marginsBottom[data.espacement_bas] || '0px';

  return (
    <div className='flexrow-container'>
      <div className='champ-de-blocs' style={{ marginBottom: marginBottomValue }}>
        <h3 style={{ marginBottom: '44px' }}>{data.titre}</h3>
        <div className='grid2' style={{ marginBottom: '8px' }}>
          {data.Bloc_simple.map((b) => (
            <div key={b.id} className='bloc-simple'>
              {b.page_cible ? (
                <Link href={b.page_cible} target={b.page_cible && b.page_cible.includes('https://') ? '_blank' : undefined}>
                  <span className='blue-text'>{b.texte_en_valeur} </span>
                  {b.texte}
                </Link>
              ) : (
                <>
                  <span className='blue-text'>{b.texte_en_valeur} </span>
                  {b.texte}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
