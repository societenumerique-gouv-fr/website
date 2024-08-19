'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { marginsBottom } from '../structs';

type MarginBottomKeys = keyof typeof marginsBottom;

type BannerTitleProps = {
  data: {
    key: string;
    espacement_bas: MarginBottomKeys;
    titre: string;
    texte: string;
    image?: {
      data?: {
        attributes: {
          url: string;
        };
      } | null;
    } | null;
  };
};

export const BannerTitle = ({ data }: BannerTitleProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setImageUrl(null);
  }, [router.pathname]);

  useEffect(() => {
    if (data.image?.data) {
      setImageUrl(`${process.env.NEXT_PUBLIC_STRAPI_URL}${data.image.data.attributes.url}`);
    }
  }, [data]);

  const marginBottom = marginsBottom[data.espacement_bas] || '0';

  return (
    <div key={data.key} className='bannertitle-container' style={{ marginBottom }}>
      <h2
        style={{
          color: 'rgb(0, 0, 145)',
          textDecoration: 'underline',
          textUnderlineOffset: '0.50em',
          textDecorationThickness: '4px',
          paddingTop: '3rem'
        }}>
        {data.titre}
      </h2>

      <div className='inline'>
        <p style={{ maxWidth: '550px', margin: '0 auto', fontSize: '20px', lineHeight: '1.3', paddingTop: '1rem' }}>
          {data.texte}
        </p>
        {imageUrl && (
          <div className='banner-image-container'>
            <Image
              className='banner-image'
              src={imageUrl}
              alt={data.titre || 'Banner image'}
              width={250}
              height={150}
              style={{ maxWidth: '250px', transform: 'translate(15%, -82%)' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
