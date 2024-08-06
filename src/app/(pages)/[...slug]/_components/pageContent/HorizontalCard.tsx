// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Card from '@codegouvfr/react-dsfr/Card';
import Tag from '@codegouvfr/react-dsfr/Tag';
import React, { useEffect, useState } from 'react';

export const HorizontalCard = ({ data, rows, displayText = true }) => {
  const maxCharacters = 256;
  const [type, setType] = useState(null);
  const [slug, setSlug] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [labels, setLabels] = useState([]);
  const [cacheText, setCacheText] = useState('');
  const [text, setText] = useState('');
  const [widthScreen, setWidthScreen] = useState(null);

  const marginsBottom = {
    défaut: 'fr-mb-1w',
    px8: 'fr-mb-3v',
    px16: 'fr-mb-3w',
    px32: 'fr-mb-6w',
    px48: 'fr-mb-9w',
    px64: 'fr-mb-12w'
  };

  useEffect(() => {
    setType(data.type[0].toUpperCase() + data.type.slice(1).split('-').join(' '));
    switch (data.type) {
      case 'rapport-stratégique':
        setSlug(
          (!displayText ? 'nos-ressources/rapports-strategiques/' : '') +
            data.titre_de_la_carte
              .split(' ')
              .join('-')
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
        );
        break;
      case 'etude':
        setSlug(
          (!displayText ? 'nos-ressources/etudes/' : '') +
            data.titre_de_la_carte
              .split(' ')
              .join('-')
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
        );
        break;
      case 'carte-horizontale':
        if (data.image.data != null) {
          setImageUrl(data.image.data.attributes.url);
        }
        break;
    }

    if (data.labels != null) setLabels(data.labels);
  }, [data]);

  useEffect(() => {
    if (data.texte_en_valeur != null && data.texte != null) {
      if (data.texte_en_valeur.length + data.texte.length >= maxCharacters) {
        const toSlice = Math.abs(data.texte_en_valeur.length + data.texte.length - maxCharacters);
        setText(data.texte.slice(0, -toSlice) + '...');
        setCacheText(data.texte.slice(0, -toSlice) + '...');
      }
    }
    if (data.texte_en_valeur == null && data.texte != null) {
      if (data.texte.length >= maxCharacters) {
        const toSlice = data.texte.length - maxCharacters;
        setText(data.texte.slice(0, -toSlice) + '...');
        setCacheText(data.texte.slice(0, -toSlice) + '...');
      }
    }
  }, [maxCharacters]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidthScreen(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    });
  }, []);

  useEffect(() => {
    if (widthScreen) {
      if (widthScreen < 570) {
        if (text.length > 100) {
          setText((prevText) => {
            return prevText.slice(0, 50) + '...';
          });
        }
      } else {
        setText(cacheText);
      }
    }
  }, [widthScreen]);

  return (
    <>
      {data.type != 'carte-horizontale' && (
        <Card
          start={
            <Tag className='fr-mb-1w' small linkProps={{ href: '/' }}>
              {type}
            </Tag>
          }
          title={data.titre_de_la_carte}
          desc={displayText ? data.texte_de_la_carte : undefined}
          enlargeLink
          linkProps={{ href: slug }}
          endDetail='Découvrir la ressource'
        />
      )}

      {data.type == 'carte-horizontale' && (
        <div
          className={`${rows === 1 ? `fr-grid-row fr-grid-row--gutters ${marginsBottom[data.espacement_bas]}` : `fr-col-md-${12 / rows} fr-col ${marginsBottom[data.espacement_bas]}}`}`}
          style={{ marginBottom: marginsBottom[data.espacement_bas] }}>
          <div className={`${rows === 1 ? 'fr-col-md-6 fr-mx-auto' : `fr-h-100`}`}>
            <Card
              start={
                labels.length > 0 && (
                  <ul className='fr-badges-group fr-mb-1w'>
                    {labels.map((l) => (
                      <li key={l.titre_du_label}>
                        <Tag small linkProps={{ href: '/' }}>
                          {l.titre_du_label}
                        </Tag>
                      </li>
                    ))}
                  </ul>
                )
              }
              desc={data.texte}
              horizontal
              imageAlt=''
              imageComponent={
                imageUrl && (
                  <img
                    className='fr-p-3w'
                    style={{ width: '100%', 'object-fit': 'contain' }}
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`}
                    alt=''
                  />
                )
              }
              enlargeLink
              linkProps={{
                href: data.lien,
                target: data?.lien.includes('https://') ? '_blank' : undefined
              }}
              title={data.texte_en_valeur}
            />
          </div>
        </div>
      )}
    </>
  );
};
