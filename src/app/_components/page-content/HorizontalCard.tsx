// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Card from '@codegouvfr/react-dsfr/Card';
import Tag from '@codegouvfr/react-dsfr/Tag';
import React from 'react';

const marginsBottom = {
  défaut: 'fr-mb-1w',
  px8: 'fr-mb-3v',
  px16: 'fr-mb-3w',
  px32: 'fr-mb-6w',
  px48: 'fr-mb-9w',
  px64: 'fr-mb-12w'
};

export const HorizontalCard = ({ data, rows, displayText = true }) => (
  <>
    {data.type == 'carte-horizontale' && (
      <div
        className={`${rows === 1 ? `fr-grid-row fr-grid-row--gutters ${marginsBottom[data.espacement_bas]}` : `fr-col-md-${12 / rows} fr-col ${marginsBottom[data.espacement_bas]}}`}`}
        style={{ marginBottom: marginsBottom[data.espacement_bas] }}>
        <div className={`${rows === 1 ? 'fr-col-md-6 fr-mx-auto' : `fr-h-100`}`}>
          <Card
            start={
              data.labels.length > 0 && (
                <ul className='fr-tags-group fr-mb-1w'>
                  {data.labels.map((l) => (
                    <li key={l.titre_du_label}>
                      <Tag className='fr-tag--blue-france' small>
                        {l.titre_du_label}
                      </Tag>
                    </li>
                  ))}
                </ul>
              )
            }
            desc={
              <>
                <strong>{data.texte_en_valeur}</strong> {data.texte}
              </>
            }
            horizontal
            imageComponent={
              data.image.data?.attributes.url ? (
                <img
                  className='fr-p-3w'
                  style={{ width: '100%', objectFit: 'contain' }}
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data.image.data.attributes.url}`}
                  alt=''
                />
              ) : undefined
            }
            enlargeLink
            linkProps={{
              href: data.lien,
              target: data?.lien.includes('https://') ? '_blank' : undefined
            }}
            title={data.titre}
          />
        </div>
      </div>
    )}

    {data.type != 'carte-horizontale' && (
      <Card
        className='fr-mb-2w'
        start={
          <Tag className='fr-mb-1w fr-tag--blue-france fr-text--capitalize' small>
            {data.type}
          </Tag>
        }
        title={data.titre_de_la_carte}
        desc={displayText ? data.texte_de_la_carte : undefined}
        enlargeLink
        linkProps={{ href: `/${data.nom_de_page}` }}
        endDetail='Découvrir la ressource'
      />
    )}
  </>
);
