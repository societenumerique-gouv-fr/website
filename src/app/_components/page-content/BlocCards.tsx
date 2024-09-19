'use client';

import { marginsBottom } from '../structs';
import { ReactNode, useEffect, useState } from 'react';
import { CardData, VerticalCard } from './VerticalCard';
import { HorizontalCard } from './HorizontalCard';

type BlocCardArticle = {
  id: number;
  image?: {
    data?: {
      attributes: {
        url: string;
      };
    };
  };
  type: string;
  titre_de_la_carte: string;
  taille: 'Petit' | 'Moyen' | 'Grand';
  texte_en_valeur?: string;
  texte?: string;
  label?: string;
  labels: Array<{
    titre_du_label: string;
  }>;
  espacement_bas: keyof typeof marginsBottom;
  position?: string;
  lien: string;
  titre_du_lien: string;
};

type BlocCardsProps = {
  articles: BlocCardArticle[];
  type: 'breve' | 'rapport-strategique' | 'etude' | null;
};

export const BlocCards = ({ articles, type }: BlocCardsProps) => {
  const [subArticles, setSubArticles] = useState<BlocCardArticle[][]>([]);
  const [cursor, setCursor] = useState<number>(1);
  const [pagination, setPagination] = useState<ReactNode | null>(null);
  const [articleType, setArticleType] = useState<BlocCardsProps['type']>(null);

  const offset = 7;

  const subDivideArticles = () => {
    const all: BlocCardArticle[][] = [];
    let sub: BlocCardArticle[] = [];
    const multiple = type == 'breve' ? 9 : 4;

    articles.map((art, index) => {
      if (index % multiple == 0) {
        all.push(sub);
        sub = [];
      }
      sub.push(art);
    });
    all.push(sub);
    setSubArticles(all.splice(1));
  };

  const updatePagination = () => {
    const tmpPagination: ReactNode[] = [];

    tmpPagination.push(
      <>
        <li>
          <a className='fr-pagination__link fr-pagination__link--first' role='link' href='#' onClick={() => setCursor(1)}>
            Première page
          </a>
        </li>
        <li>
          <button
            className='fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label'
            disabled={cursor === 1 ? true : undefined}
            onClick={() => {
              setCursor(cursor > 1 ? cursor - 1 : cursor);
            }}>
            Précédent
          </button>
        </li>
      </>
    );

    if (subArticles.length <= offset) {
      for (let i = 1; i < subArticles.length + 1; i++) {
        tmpPagination.push(
          <li>
            <a
              className='fr-pagination__link'
              href='#'
              aria-current={cursor === i ? true : undefined}
              onClick={() => setCursor(i)}>
              {i}
            </a>
          </li>
        );
      }
    } else if (subArticles.length > offset) {
      if (cursor < offset) {
        for (let i = 1; i < offset + 1; i++) {
          tmpPagination.push(
            <li>
              <a
                className='fr-pagination__link'
                href='#'
                aria-current={cursor === i ? true : undefined}
                onClick={() => setCursor(i)}>
                {i}
              </a>
            </li>
          );
        }
      }

      if (cursor >= offset && cursor < subArticles.length - 1) {
        tmpPagination.push(
          <button className='fr-pagination__link fr-displayed-lg' disabled={true} style={{ cursor: 'default' }}>
            …
          </button>
        );

        for (let i = cursor - 1; i < cursor + 2; i++) {
          tmpPagination.push(
            <li>
              <a
                className='fr-pagination__link'
                href='#'
                aria-current={cursor === i ? true : undefined}
                onClick={() => setCursor(i)}>
                {i}
              </a>
            </li>
          );
        }

        tmpPagination.push(
          <button className='fr-pagination__link fr-displayed-lg' disabled={true} style={{ cursor: 'default' }}>
            …
          </button>
        );
      }

      if (subArticles.length - cursor < 2) {
        tmpPagination.push(
          <button className='fr-pagination__link fr-displayed-lg' disabled={true} style={{ cursor: 'default' }}>
            …
          </button>
        );

        const gap = subArticles.length - cursor == 1 ? 2 : 1;

        for (let i = cursor - 1; i < cursor + gap; i++) {
          tmpPagination.push(
            <li>
              <a
                className='fr-pagination__link fr-displayed-lg'
                href='#'
                onClick={() => setCursor(i)}
                aria-current={cursor === i ? true : undefined}>
                {i}
              </a>
            </li>
          );
        }
      }
    }

    tmpPagination.push(
      <>
        <li>
          <button
            className='fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label'
            disabled={cursor === subArticles.length ? true : undefined}
            onClick={() => {
              setCursor(cursor < subArticles.length ? cursor + 1 : cursor);
            }}>
            Suivant
          </button>
        </li>
        <li>
          <a className='fr-pagination__link fr-pagination__link--last' href='#' onClick={() => setCursor(subArticles.length)}>
            Dernière page
          </a>
        </li>
      </>
    );
    setPagination(tmpPagination);
  };

  useEffect(() => {
    subDivideArticles();
  }, [articles]);
  useEffect(() => {
    updatePagination();
  }, [subArticles]);
  useEffect(() => {
    updatePagination();
  }, [cursor]);

  useEffect(() => {
    if (type != null) {
      setArticleType(type);
      setCursor(1);
    }
  }, [type]);

  return (
    <>
      <div className='fr-mb-4w'>
        <div className='fr-grid-row fr-grid-row--gutters'>
          {/* breves */}
          {articleType == 'breve' &&
            subArticles[cursor - 1] &&
            subArticles[cursor - 1].map((article) => (
              <div key={article.titre_de_la_carte} className='fr-col-lg-4 fr-col-md-6 fr-col-12'>
                <VerticalCard data={article as unknown as CardData} rows={0} />
              </div>
            ))}
        </div>
      </div>

      {/* publications stratégiques */}
      {articleType == 'rapport-strategique' &&
        subArticles[cursor - 1] &&
        subArticles[cursor - 1].map((article) => <HorizontalCard key={article.titre_de_la_carte} data={article} rows={1} />)}
      {/* rapports de recherches */}
      {articleType == 'etude' && subArticles[cursor - 1] && (
        <div className='fr-grid-row fr-grid-row--gutters fr-my-2w'>
          {subArticles[cursor - 1].map((article) => (
            <div key={article.titre_de_la_carte} className='fr-col-lg-6 fr-col-12'>
              <HorizontalCard key={article.titre_de_la_carte} data={article} rows={1} />
            </div>
          ))}
        </div>
      )}

      <div className='fr-flex'>
        <nav role='navigation' className='fr-pagination fr-mx-auto' aria-label='Pagination'>
          <ul className='fr-pagination__list'>{pagination}</ul>
        </nav>
      </div>
    </>
  );
};
