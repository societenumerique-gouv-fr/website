'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { marginsBottom, position } from '../structs';

type LinkData = {
  id: string;
  taille: 'Petit' | 'Moyen' | 'Grand';
  page_cible: string;
  texte: string;
  espacement_bas: keyof typeof marginsBottom;
  position: keyof typeof position;
};

type NavLinkProps = {
  data: LinkData;
  rows: number;
};

export const NavLink: React.FC<NavLinkProps> = ({ data, rows }) => {
  const [linkData, setLinkData] = useState<LinkData | null>(null);
  const [size, setSize] = useState<string>('');

  useEffect(() => {
    setLinkData(data);
    switch (data.taille) {
      case 'Petit':
      case 'Moyen':
        setSize('ma classe fr-link fr-link--sm');
        break;
      case 'Grand':
        setSize('ma classe fr-link fr-link--lg');
        break;
    }
  }, [data]);

  if (!linkData) return null;

  return (
    <>
      {rows === 1 && (
        <div
          key={linkData.id}
          className={`${position[linkData.position] === 'left' || position[linkData.position] === 'right' ? position[linkData.position] : 'center'}`}
          style={{ marginBottom: marginsBottom[data.espacement_bas] ?? undefined }}>
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
