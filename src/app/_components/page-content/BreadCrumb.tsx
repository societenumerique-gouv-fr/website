'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BreadcrumbItem, NavbarNavigationItems, toBreadcrumbItems } from '@/presenters/navbar/navigation-item';

export const BreadCrumb = ({
  navbarNavigationItems,
  breadCrumbItems
}: {
  navbarNavigationItems?: NavbarNavigationItems;
  breadCrumbItems: BreadcrumbItem[];
}) => {
  const breadcrumbItems = [...breadCrumbItems, ...toBreadcrumbItems(usePathname())(navbarNavigationItems)];

  return (
    <>
      {breadcrumbItems.length > 0 && (
        <nav role='navigation' className='fr-breadcrumb' aria-label='vous êtes ici :'>
          <button className='fr-breadcrumb__button' aria-expanded='false' aria-controls='breadcrumb'>
            Voir le fil d’Ariane
          </button>
          <div className='fr-collapse' id='breadcrumb'>
            <ol className='fr-breadcrumb__list'>
              <li>
                <Link className='fr-breadcrumb__link' href='/'>
                  Accueil
                </Link>
              </li>
              {breadcrumbItems.map((breadcrumbItem) => {
                return (
                  <li key={breadcrumbItem.href}>
                    {breadcrumbItem.href ? (
                      <Link className='fr-breadcrumb__link' href={breadcrumbItem.href}>
                        {breadcrumbItem.label}
                      </Link>
                    ) : (
                      <a className='fr-breadcrumb__link' aria-current='page'>
                        {breadcrumbItem.label}
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
