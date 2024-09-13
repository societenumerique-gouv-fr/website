import { marginsBottom } from '../structs';

type Taille = 'Petit' | 'Moyen' | 'Grand';

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
    lien_video?: string;
    description?: string;
    afficher_transcription: 'Oui' | 'Non';
    taille: Taille;
    espacement_bas: keyof typeof marginsBottom;
    transcription_ouverte: boolean;
    position: 'Centre' | string;
    transcription: string;
  };
};

const widthMap: Record<Taille, number> = {
  Petit: 500,
  Moyen: 700,
  Grand: 900
};

export const Media = ({ data }: MediaProps) => {
  const marginBottom = marginsBottom[data.espacement_bas] || '0px';

  return (
    <div className='mt2' style={{ marginLeft: '20px', marginBottom }}>
      <figure role='group' className={`fr-content-media`} style={{ margin: data.position === 'Centre' ? '0 auto' : '' }}>
        {data.lien_video ? (
          <div style={{ width: `${widthMap[data.taille]}px` }}>
            <iframe
              title="Titre de l'iframe"
              className='fr-responsive-vid fr-ratio-4x3'
              src={data.lien_video.replace('watch?v=', 'embed/').replace(/&.+/, '')}
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen></iframe>
            {data.description && <p className='fr-mt-2w'>{data.description}</p>}
          </div>
        ) : (
          data.image.data?.attributes.url && (
            <div>
              <img src={data.image.data.attributes.url} style={{ width: `${widthMap[data.taille]}px` }} alt='' />
            </div>
          )
        )}
        {data.afficher_transcription === 'Oui' && (
          <div className='fr-transcription' style={{ width: `${widthMap[data.taille]}px` }}>
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
