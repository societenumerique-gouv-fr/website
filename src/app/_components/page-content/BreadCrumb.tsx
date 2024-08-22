'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type DataBreadCrumb = {
  id: string;
  label: string;
  href?: string;
};

const getFormatedText = (name: string): string => {
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

export const BreadCrumb = () => {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<DataBreadCrumb[]>([]);

  useEffect(() => {
    const pathArray = pathname.replace(/^\/|\/$/, '').split('/');
    const breadcrumbsData: DataBreadCrumb[] = pathArray.map((path, index) => ({
      id: `${index}`,
      label: getFormatedText(path),
      href: index < pathArray.length - 1 ? `/${pathArray.slice(0, index + 1).join('/')}` : undefined
    }));
    setBreadcrumbs(breadcrumbsData);
  }, [pathname]);

  const isRapportsStrategiques = breadcrumbs.length > 0 && breadcrumbs[0].label === 'Rapports stratégiques';
  const isMedia = breadcrumbs.length > 0 && breadcrumbs[0].label === 'Notre média';
  const isReview = breadcrumbs.length > 0 && breadcrumbs[0].label === 'Notre revue';
  const isBreves = breadcrumbs.length > 0 && breadcrumbs[0].label === 'Brèves';
  const isEtudes = breadcrumbs.length > 0 && breadcrumbs[0].label === 'Études';

  return (
    <>
      {breadcrumbs.length > 0 && breadcrumbs[0].label !== 'Accueil' && (
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
              {(isEtudes || isReview || isMedia || isRapportsStrategiques) && (
                <li>
                  <Link className='fr-breadcrumb__link' href='/nos-ressources'>
                    Nos Ressources
                  </Link>
                </li>
              )}
              {isBreves && (
                <li>
                  <Link className='fr-breadcrumb__link' href='/actualites'>
                    Actualités
                  </Link>
                </li>
              )}
              {breadcrumbs.map((breadcrumb) => {
                const currName = breadcrumb.label[0]?.toUpperCase() + breadcrumb.label.slice(1);
                return (
                  <li key={breadcrumb.id}>
                    {breadcrumb.href ? (
                      <Link className='fr-breadcrumb__link' href={breadcrumb.href}>
                        {currName}
                      </Link>
                    ) : (
                      <a className='fr-breadcrumb__link' aria-current='page'>
                        {currName}
                      </a>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </nav>
      )}
    </>
  );
};
