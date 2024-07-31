// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { marginsBottom } from '../structs';

export const BannerTitle = ({ data }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setImageUrl(null);
  }, [router.pathname]);

  useEffect(() => {
    if (data.image != null && data.image.data != null) {
      setImageUrl(process.env.NEXT_PUBLIC_STRAPI_URL + data.image.data.attributes.url);
    }
  }, [data]);

  return (
    <div key={data.key} className='bannertitle-container' style={{ marginBottom: marginsBottom[data.espacement_bas] }}>
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
          <img
            className='banner-image ml-auto mr-40'
            style={{ maxWidth: '250px', transform: 'translate(15%, -82%)' }}
            src={imageUrl}
          />
        )}
      </div>
    </div>
  );
};
