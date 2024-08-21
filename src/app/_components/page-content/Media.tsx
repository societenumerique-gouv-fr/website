'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { marginsBottom } from '../structs';

type MediaProps = {
  data: {
    id: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      } | null;
    };
    lien_video: string | null;
    description: string;
    lien_du_label: string | null;
    titre_du_label: string;
    afficher_transcription: 'Oui' | 'Non';
    taille: 'Petit' | 'Moyen' | 'Grand';
    espacement_bas: keyof typeof marginsBottom;
    transcription_ouverte: boolean;
    position: 'Centre' | string;
    transcription: string;
  };
};

export const Media = ({ data }: MediaProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [width, setWidth] = useState<string | null>(null);

  useEffect(() => {
    if (!data.image?.data && !data.lien_video) {
      setImageUrl(process.env.NEXT_PUBLIC_STRAPI_URL + '/uploads/placeholder_16x9_e6d60ccc52.png');
    } else if (data.image?.data) {
      setImageUrl(data.image.data.attributes.url);
    }
    if (data.lien_video) {
      setVideoUrl(data.lien_video.replace('watch?v=', 'embed/'));
    }

    switch (data.taille) {
      case 'Petit':
        setWidth('media-img500px');
        break;
      case 'Moyen':
        setWidth('media-img700px');
        break;
      case 'Grand':
        setWidth('media-img900px');
        break;
      default:
        setWidth(null);
    }
  }, [data]);
  const marginBottom = marginsBottom[data.espacement_bas] || '0px';
  return (
    <div className='mt2' style={{ marginLeft: '20px', marginBottom }}>
      <figure role='group' className={`fr-content-media`} style={{ margin: data.position === 'Centre' ? '0 auto' : '' }}>
        {videoUrl ? (
          <iframe
            title="Titre de l'iframe"
            className='fr-responsive-vid fr-ratio-4x3'
            src={videoUrl}
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen></iframe>
        ) : (
          imageUrl && (
            <div>
              <img src={imageUrl} className={width || ''} alt='Image du média' />
            </div>
          )
        )}
        <figcaption className={`fr-content-media__caption ${width || ''}`} style={{ marginLeft: '50px' }}>
          {data.lien_du_label && (
            <Link
              href={data.lien_du_label}
              target={data.lien_du_label.includes('https://') ? '_blank' : undefined}
              className='fr-link'>
              {data.titre_du_label}
            </Link>
          )}
        </figcaption>
        {data.afficher_transcription === 'Oui' && (
          <div className={`fr-transcription ${width || ''}`}>
            <button
              className='fr-transcription__btn'
              aria-expanded={data.transcription_ouverte ? 'true' : 'false'}
              aria-controls={`fr-transcription__collapse-transcription-${data.id}`}>
              Transcription
            </button>
            <div className='fr-collapse' id={`fr-transcription__collapse-transcription-${data.id}`}>
              <dialog
                id='fr-transcription__modal-transcription-471'
                className='fr-modal'
                role='dialog'
                aria-labelledby={`fr-transcription__modal-transcription-${data.id}-title`}>
                <div className='fr-container fr-container--fluid fr-container-md'>
                  <div className='fr-grid-row fr-grid-row--center'>
                    <div className='fr-col-12 fr-col-md-10 fr-col-lg-8'>
                      <div className='fr-modal__body'>
                        <div className='fr-modal__header'>
                          <button
                            className='fr-btn--close fr-btn'
                            aria-controls={`fr-transcription__modal-transcription-${data.id}`}
                            title='Fermer'>
                            Fermer
                          </button>
                        </div>
                        <div className='fr-modal__content'>
                          <h1 id='fr-transcription__modal-transcription-471-title' className='fr-modal__title'>
                            Titre de la vidéo
                          </h1>
                          {data.transcription}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        )}
      </figure>
    </div>
  );
};
