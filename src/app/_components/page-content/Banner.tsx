// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client';

import { useState } from 'react';
import { fetchData } from '@/functions/fetcher';

export const Banner = () => {
  const [title, setTitle] = useState('');
  const [titleSize, setTitleSize] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [titleColor, setTitleColor] = useState(null);

  const colors = {
    Blanc: '#FFFFFF',
    Noir: '#000000',
    Bleu: '#000091',
    Rouge: '#c9191e'
  };

  ///PAGES///
  const loadData = async () => {
    try {
      const resp = await fetchData(process.env.NEXT_PUBLIC_STRAPI_URL + '/api/banniere');
      setTitle(resp.data.attributes.titre);
      setTitleSize(resp.data.attributes.taille_du_titre);
      setImageUrl(process.env.NEXT_PUBLIC_STRAPI_URL + resp.data.attributes.image.data.attributes.url);
      setTitleColor(resp.data.attributes.couleur_du_titre);
    } catch (e) {
      console.log('Erreur', e);
    }
  };

  loadData();

  return (
    <>
      <div className='banner' style={{ backgroundImage: `url(${imageUrl})`, marginBottom: '32px' }}>
        {titleSize === 'h1' && (
          <h1 className='banner-title' style={{ color: colors[titleColor] }}>
            {title}
          </h1>
        )}
        {titleSize === 'h2' && (
          <h2 className='banner-title' style={{ color: colors[titleColor] }}>
            {title}
          </h2>
        )}
        {titleSize === 'h3' && (
          <h3 className='banner-title' style={{ color: colors[titleColor] }}>
            {title}
          </h3>
        )}
        {titleSize === 'h4' && (
          <h4 className='banner-title' style={{ color: colors[titleColor] }}>
            {title}
          </h4>
        )}
        {titleSize === 'h5' && (
          <h5 className='banner-title' style={{ color: colors[titleColor] }}>
            {title}
          </h5>
        )}
        {titleSize === 'h6' && (
          <h6 className='banner-title' style={{ color: colors[titleColor] }}>
            {title}
          </h6>
        )}
      </div>
    </>
  );
};
