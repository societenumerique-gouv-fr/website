'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { marginsBottom } from '../structs';

type AccordionData = {
  id: string;
  titre: string;
  contenu: string;
  espacement_bas: keyof typeof marginsBottom;
};

type AccordionProps = {
  data: AccordionData;
  rows: number;
};

export const Accordion = ({ data, rows }: AccordionProps) => {
  const [accordionData, setAccordionData] = useState<AccordionData | null>(null);

  useEffect(() => {
    setAccordionData(data);
  }, [data]);

  return (
    <>
      {rows === 1 && accordionData && (
        <div
          className='mb2'
          style={{
            marginBottom: marginsBottom[accordionData.espacement_bas] ?? undefined // Fallback to undefined if null
          }}>
          <section className='fr-accordion fr-col-lg-8' style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <h3 className='fr-accordion__title'>
              <button className='fr-accordion__btn' aria-expanded='false' aria-controls={`accordion-${accordionData.id}`}>
                {accordionData.titre}
              </button>
            </h3>
            <div className='fr-collapse' id={`accordion-${accordionData.id}`}>
              <ReactMarkdown>{accordionData.contenu}</ReactMarkdown>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
