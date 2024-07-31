// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { marginsBottom, position } from '../structs';

export const NavLink = ({ data, rows }) => {
  const [linkData, setLinkData] = useState([]);
  const [size, setSize] = useState([]);

  useEffect(() => {
    setLinkData(data);
    switch (data.taille) {
      case 'Petit':
        setSize('ma classe fr-link fr-link--sm');
        break;

      case 'Moyen':
        setSize('ma classe fr-link fr-link--sm');
        break;

      case 'Grand':
        setSize('ma classe fr-link fr-link--lg');
        break;
    }
  }, [data]);
  return (
    <>
      {rows == 1 && (
        <div
          key={linkData.id}
          className={`${position[linkData.position] === 'left' || position[linkData.position] === 'right' ? position[linkData.position] : 'center'}`}
          style={{ marginBottom: marginsBottom[data.espacement_bas] }}>
          <Link
            href={linkData.page_cible}
            className={`${size}`}
            target={linkData.page_cible && linkData.page_cible.includes('https://') ? '_blank' : undefined}>
            {linkData.texte}
          </Link>
        </div>
      )}
      {rows > 1 && (
        <div key={linkData.id}>
          <Link
            href={linkData.page_cible}
            className={`${size}`}
            target={linkData.page_cible && linkData.page_cible.includes('https://') ? '_blank' : undefined}>
            {linkData.texte}
          </Link>
        </div>
      )}
    </>
  );
};
