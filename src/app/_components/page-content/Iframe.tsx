'use-client';

import { marginsBottom } from '../structs';

type IframeProps = {
  data: {
    id: string;
    position: 'Centre' | string;
    espacement_bas: keyof typeof marginsBottom;
    taille_verticale: string;
    taille_horizontale: string;
    bords: 'Arrondis' | string;
    source: string;
  };
  rows: number;
};

export const Iframe = ({ data, rows }: IframeProps) => {
  const justifyContent = data.position === 'Centre' ? 'center' : 'flex-start';
  const marginBottom = marginsBottom[data.espacement_bas] || '0px';
  return (
    <>
      {rows == 1 && (
        <div style={{ display: 'flex', justifyContent, marginBottom }}>
          <iframe
            key={data.id}
            className={`${data.taille_verticale} ${data.taille_horizontale}`}
            style={{ borderRadius: data.bords == 'Arrondis' ? '10px' : '0px' }}
            src={data.source}
          />
        </div>
      )}
    </>
  );
};
