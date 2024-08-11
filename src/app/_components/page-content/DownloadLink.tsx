// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { marginsBottom } from '../structs';

export const DownloadLink = ({ data, rows }) =>
  data && (
    <>
      {rows === 1 && (
        <div
          key={data.id}
          style={{
            display: 'flex',
            justifyContent: data.position === 'Centre' ? 'center' : data.position === 'Gauche' ? '' : 'flex-end'
          }}>
          {data.Lien_telechargement && data.Lien_telechargement.length > 1 && (
            <div className={`download-container`} style={{ marginBottom: marginsBottom[data.espacement_bas] }}>
              {data.titre_de_la_liste && <h4>{data.titre_de_la_liste}</h4>}
              <ul>
                {data.Lien_telechargement.map((lien, index) => (
                  <li key={index}>
                    <a
                      href={lien.media_a_telecharger.data !== null ? lien.media_a_telecharger.data.attributes.url : null}
                      className={`fr-link--download fr-link ${lien.actif == 'Non' ? 'disable-download-link' : ''}`}
                      data-fr-assess-file='arraybuffer'
                      hrefLang='fr'
                      download
                      target='_blank'
                      id={`link-${index}`}>
                      {lien.texte_du_lien}
                      <span className='fr-link__detail'> </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data.Lien_telechargement && data.Lien_telechargement.length === 1 && (
            <div key={data.id} style={{ padding: '16px 48px 16px 32px' }}>
              <a
                className='fr-link--download fr-link'
                target='_blank'
                id={`link-${data.id}`}
                href={
                  data.Lien_telechargement[0].media_a_telecharger.data !== null
                    ? data.Lien_telechargement[0].media_a_telecharger.data.attributes.url
                    : null
                }>
                {data.Lien_telechargement[0].texte_du_lien}
                <span className='fr-link__detail' />
              </a>
            </div>
          )}
        </div>
      )}

      {rows > 1 && (
        <div key={data.id} style={{}}>
          {data.Lien_telechargement && data.Lien_telechargement.length > 1 && (
            <div className={`download-container`}>
              {data.titre_de_la_liste && <h4>{data.titre_de_la_liste}</h4>}
              <ul>
                {data.Lien_telechargement.map((lien, index) => (
                  <li key={index}>
                    <a
                      className='fr-link--download fr-link'
                      data-fr-assess-file='bytes'
                      hrefLang='fr'
                      download={lien.media_a_telecharger.data.attributes.name}
                      id={`link-${index}`}
                      href={lien.media_a_telecharger.data != null ? lien.media_a_telecharger.data.attributes.url : null}>
                      {lien.texte_du_lien}
                      <span className='fr-link__detail'> </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data.Lien_telechargement && data.Lien_telechargement.length === 1 && (
            <div key={data.id} style={{ padding: '16px 48px 16px 32px' }}>
              <a
                className='fr-link--download fr-link'
                data-fr-assess-file='bytes'
                hrefLang='fr'
                download={data.Lien_telechargement[0].media_a_telecharger.data.attributes.name}
                id={`link-${data.id}`}
                href={
                  data.Lien_telechargement[0].media_a_telecharger.data !== null
                    ? data.Lien_telechargement[0].media_a_telecharger.data.attributes.url
                    : null
                }>
                {data.Lien_telechargement[0].texte_du_lien}
                <span className='fr-link__detail'> </span>
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
