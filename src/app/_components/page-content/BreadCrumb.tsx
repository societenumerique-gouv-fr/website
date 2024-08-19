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
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.id}>
                  {crumb.href ? (
                    <Link className='fr-breadcrumb__link' href={crumb.href}>
                      {crumb.label}
                    </Link>
                  ) : (
                    <a className='fr-breadcrumb__link' aria-current='page'>
                      {crumb.label}
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </nav>
      )}
    </>
  );
};
