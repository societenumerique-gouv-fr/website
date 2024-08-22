'use client';

import { useEffect, useState } from 'react';
import { marginsBottom } from '../structs';

type QuoteProps = {
  data: {
    titre: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      } | null;
    };
    espacement_bas: keyof typeof marginsBottom;
    citation: string;
    auteur: string;
    contexte: string;
  };
};

export const Quote = ({ data }: QuoteProps) => {
  const [position, setPosition] = useState<string>('ml-quote');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (data.image.data) {
      setImageUrl(`${process.env.NEXT_PUBLIC_STRAPI_URL}${data.image.data.attributes.url}`);
    }
  }, [data.image]);

  useEffect(() => {
    setPosition(imageUrl ? 'ml-auto' : 'ml-quote');
  }, [imageUrl]);

  return (
    <figure
      className={`${position} fr-quote fr-quote--column margin-quote`}
      style={{ maxWidth: !imageUrl ? '1000px' : '840px', marginBottom: marginsBottom[data.espacement_bas] || '0px' }}>
      {' '}
      <blockquote cite=''>
        {imageUrl && (
          <div className='fr-quote__image'>
            <img src={imageUrl} className='fr-responsive-img' alt='' />
          </div>
        )}
        <p>{data.citation}</p>
      </blockquote>
      <figcaption>
        <p className='fr-quote__author'>{data.auteur}</p>
        <ul className='fr-quote__source'>
          <li>{data.contexte}</li>
        </ul>
      </figcaption>
    </figure>
  );
};
