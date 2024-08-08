// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const BreadCrumb = () => {
  const pathname = usePathname();
  const [pathnameArray, setPathnameArrayArray] = useState<string[]>([]);

  useEffect(() => {
    setPathnameArrayArray(pathname.replace(/^\/|\/$/, '').split('/'));
  }, [pathname]);

  const getFormatedText = (name: string) => {
    console.log(name);

    switch (name) {
      case 'Actualites':
        return 'Actualités';
      case 'Breves':
        return 'Brèves';
      case 'Rapports strategiques':
        return 'Rapports stratégiques';
      case 'Etudes':
        return 'Études';
      case 'Notre media':
        return 'Notre média';
      default:
        return decodeURI(name);
    }
  };

  const isRapportsStrategiques = pathnameArray && pathnameArray.length > 0 && pathnameArray[0] === 'rapports-strategiques';
  const isMedia = pathnameArray && pathnameArray.length > 0 && pathnameArray[0] === 'notre-media';
  const isReview = pathnameArray && pathnameArray.length > 0 && pathnameArray[0] === 'notre-revue';
  const isBreves = pathnameArray && pathnameArray.length > 0 && pathnameArray[0] === 'breves';
  const isEtudes = pathnameArray && pathnameArray.length > 0 && pathnameArray[0] === 'etudes';

  return (
    <>
      {pathnameArray && pathnameArray.length > 0 && pathnameArray[0] != 'accueil' && (
        <nav role='navigation' className='fr-breadcrumb' aria-label='vous êtes ici :'>
          <button className='fr-breadcrumb__button' aria-expanded='false' aria-controls='breadcrumb-1'>
            Voir le fil d’Ariane
          </button>
          <div className='fr-collapse' id='breadcrumb-1'>
            <ol className='fr-breadcrumb__list'>
              <li>
                <Link className='fr-breadcrumb__link' href='/'>
                  Accueil
                </Link>
              </li>
              {isEtudes ||
                isReview ||
                isMedia ||
                (isRapportsStrategiques && (
                  <li>
                    <Link className='fr-breadcrumb__link' href='/nos-ressources'>
                      Nos Ressources
                    </Link>
                  </li>
                ))}
              {isBreves && (
                <li>
                  <Link className='fr-breadcrumb__link' href='/actualites'>
                    Actualités
                  </Link>
                </li>
              )}
              {pathnameArray.map((path, index) => {
                const currName = path[0]?.toUpperCase() + path.split('-').join(' ').slice(1);
                return (
                  <>
                    {index < pathnameArray.length - 1 && (
                      <li>
                        <Link
                          key={path.id}
                          className='fr-breadcrumb__link'
                          href={`/${pathnameArray.slice(0, index + 1).join('/')}`}>
                          {getFormatedText(currName)}
                        </Link>
                      </li>
                    )}
                    {index == pathnameArray.length - 1 && (
                      <li>
                        <a className='fr-breadcrumb__link' aria-current='page'>
                          {getFormatedText(currName)}
                        </a>
                      </li>
                    )}
                  </>
                );
              })}
            </ol>
          </div>
        </nav>
      )}
    </>
  );
};
