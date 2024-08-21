'use client';

import { useState, useEffect } from 'react';
import { fetchData } from '@/functions/fetcher';

type BannerData = {
  titre: string;
  taille_du_titre: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  image: {
    data?: {
      attributes: {
        url: string;
      };
    };
  };
  couleur_du_titre: keyof typeof colors | null;
};

type Colors = {
  [key: string]: string;
};

const colors: Colors = {
  Blanc: '#FFFFFF',
  Noir: '#000000',
  Bleu: '#000091',
  Rouge: '#c9191e'
};

export const Banner = () => {
  const [title, setTitle] = useState<string>('');
  const [titleSize, setTitleSize] = useState<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>('h1');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [titleColor, setTitleColor] = useState<keyof typeof colors | null>(null);

  const loadData = async () => {
    try {
      const response = await fetchData(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/banniere`);
      const data = await response.json(); // Typage après récupération
      const bannerData: BannerData = data.data.attributes;

      setTitle(bannerData.titre);
      setTitleSize(bannerData.taille_du_titre);
      setImageUrl(bannerData.image.data?.attributes.url || '');
      setTitleColor(bannerData.couleur_du_titre);
    } catch (e) {
      console.log('Erreur', e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className='banner' style={{ backgroundImage: `url(${imageUrl})`, marginBottom: '32px' }}>
      {titleSize === 'h1' && (
        <h1 className='banner-title' style={{ color: colors[titleColor!] }}>
          {title}
        </h1>
      )}
      {titleSize === 'h2' && (
        <h2 className='banner-title' style={{ color: colors[titleColor!] }}>
          {title}
        </h2>
      )}
      {titleSize === 'h3' && (
        <h3 className='banner-title' style={{ color: colors[titleColor!] }}>
          {title}
        </h3>
      )}
      {titleSize === 'h4' && (
        <h4 className='banner-title' style={{ color: colors[titleColor!] }}>
          {title}
        </h4>
      )}
      {titleSize === 'h5' && (
        <h5 className='banner-title' style={{ color: colors[titleColor!] }}>
          {title}
        </h5>
      )}
      {titleSize === 'h6' && (
        <h6 className='banner-title' style={{ color: colors[titleColor!] }}>
          {title}
        </h6>
      )}
    </div>
  );
};
