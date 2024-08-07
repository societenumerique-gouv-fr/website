// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useState } from 'react';
import axios from 'axios';
import { labelColors, marginsBottom } from '../structs';

export const DownloadCard = ({ data, rows }) => {
  const [localData, setLocalData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [size, setSize] = useState(null);
  const [filename, setFilename] = useState('');

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  useEffect(() => {
    if (localData) {
      if (localData.image_de_la_carte.data != null) {
        setImageUrl(process.env.NEXT_PUBLIC_STRAPI_URL + localData.image_de_la_carte.data.attributes.url);
      }
      if (localData.type_de_carte == 'Tuile') {
        if (rows == 1) {
          switch (localData.taille) {
            case 'Petit':
              setSize('fr-col-sm-3');
              break;
            case 'Grand':
              setSize('fr-col-md-4');
              break;
          }
        } else {
          if (rows == 2) {
            setSize('mh250 mw400');
          }
          if (rows == 3) {
            setSize('mh250 mw400');
          }
        }
      }
      if (localData.type_de_carte == 'Classique') {
        if (rows == 1) {
          switch (localData.taille) {
            case 'Petit':
              setSize('fr-col-sm-5');
              break;
            case 'Grand':
              setSize('fr-col-lg-6');
              break;
          }
        } else {
          if (rows == 2) {
            setSize('mh300 mw400');
          }
          if (rows == 3) {
            setSize('mh300 mw400');
          }
        }
      }

      if (localData.media_a_telecharger.data != null) {
        const fname = localData.media_a_telecharger.data.attributes.url.split('/');
        setFilename(fname[2]);
      }
    }
  }, [localData]);

  const onDownload = async (url, fileName) => {
    const remoteFile = await axios({
      method: 'get',
      url: url,
      responseType: 'arraybuffer',
      headers: {
        Authorization: ''
      }
    });
    if (remoteFile) {
      forceFileDownload(remoteFile, `${fileName}`);
    }
  };

  const forceFileDownload = (response, fileName) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      {localData && (
        <>
          {localData.type_de_carte == 'Tuile' && (
            <div
              key={localData.id}
              style={
                rows == 1
                  ? {
                      display: 'flex',
                      justifyContent:
                        localData.position === 'Centre' ? 'center' : localData.position === 'Gauche' ? '' : 'flex-end'
                    }
                  : {}
              }>
              <div
                className={`fr-tile fr-tile--download ${size} fr-enlarge-link mb2`}
                id='tile-6735'
                style={{ marginBottom: marginsBottom[data.espacement_bas] }}>
                <div className='fr-tile__body'>
                  <div className='fr-tile__content'>
                    <h3 className='fr-tile__title'>
                      <a
                        href={
                          localData.media_a_telecharger.data !== null
                            ? process.env.NEXT_PUBLIC_STRAPI_URL + localData.media_a_telecharger.data.attributes.url
                            : localData.telechargement_externe
                        }
                        download
                        target='_blank'
                        data-fr-assess-file='arraybuffer'
                        hrefLang='fr'
                        onClick={(e) => {
                          e.preventDefault();
                          onDownload(
                            process.env.NEXT_PUBLIC_STRAPI_URL + localData.media_a_telecharger.data.attributes.url,
                            filename
                          );
                        }}>
                        {localData.titre_de_la_carte}
                      </a>
                    </h3>
                    <p className='fr-card__desc'>
                      {localData.label && (
                        <span
                          className={`card-label ${labelColors[localData.label.couleur_du_label]}`}
                          style={{ fontSize: '14px', display: 'block', marginTop: '0px', marginBottom: '16px' }}>
                          {localData.label.titre_du_label}
                        </span>
                      )}
                      {localData.description_de_la_carte}
                    </p>
                    <p className='fr-tile__detail'>Détail (optionel)</p>
                  </div>
                </div>
                {imageUrl && (
                  <div className='fr-tile__header'>
                    <div className='fr-tile__pictogram'>
                      <img src={imageUrl} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {localData.type_de_carte == 'Classique' && (
            <div
              key={localData.id}
              style={
                rows == 1
                  ? {
                      display: 'flex',
                      justifyContent:
                        localData.position === 'Centre' ? 'center' : localData.position === 'Gauche' ? '' : 'flex-end'
                    }
                  : {}
              }>
              <div
                className={`fr-card fr-enlarge-link fr-card--horizontal fr-card--horizontal-half ${size} mb2`}
                style={{ marginBottom: marginsBottom[data.espacement_bas] }}>
                <div className='fr-card__body'>
                  <div className='fr-card__content'>
                    <h3 className='fr-card__title blue-text'>{localData.titre_de_la_carte}</h3>
                    <a
                      href={
                        localData.media_a_telecharger.data !== null
                          ? process.env.NEXT_PUBLIC_STRAPI_URL + localData.media_a_telecharger.data.attributes.url
                          : localData.telechargement_externe
                      }
                      download
                      target='_blank'
                      data-fr-assess-file='bytes'
                      hrefLang='fr'
                      onClick={(e) => {
                        e.preventDefault();
                        onDownload(
                          process.env.NEXT_PUBLIC_STRAPI_URL + localData.media_a_telecharger.data.attributes.url,
                          filename
                        );
                      }}></a>
                    <p className='fr-card__desc'>{localData.description_de_la_carte}</p>
                    <div className='fr-card__start'>
                      {localData.label && (
                        <span
                          className={`card-label ${labelColors[localData.label.couleur_du_label]}`}
                          style={{ fontSize: '14px', display: 'block', marginTop: '0px', marginBottom: '16px' }}>
                          {localData.label.titre_du_label}
                        </span>
                      )}
                    </div>
                    <div className='fr-card__end'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        style={{ width: '25px', position: 'absolute', right: '24px', bottom: '24px' }}
                        viewBox='0 0 24 24'>
                        <path
                          d='M3 19H21V21H3V19ZM13 13.1716L19.0711 7.1005L20.4853 8.51472L12 17L3.51472 8.51472L4.92893 7.1005L11 13.1716V2H13V13.1716Z'
                          fill='#000091'></path>
                      </svg>
                    </div>
                  </div>
                </div>
                {imageUrl && (
                  <div className='fr-card__header fr-col-md-4'>
                    <div className='fr-card__img'>
                      <img className='fr-responsive-img' src={imageUrl} alt='' />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
