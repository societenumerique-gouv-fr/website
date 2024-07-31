// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { marginsBottom } from '../structs';

export const Accordion = ({ data, rows }) => {
  const [accordionData, setAccordionData] = useState([]);

  useEffect(() => {
    setAccordionData(data);
  }, [data]);

  return (
    <>
      {rows == 1 && (
        <div className='mb2' style={{ marginBottom: marginsBottom[data.espacement_bas] }}>
          <section className='fr-accordion fr-col-lg-8' style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <h3 className='fr-accordion__title'>
              <button className='fr-accordion__btn' aria-expanded='false' aria-controls={`accordion-${data.id}`}>
                {accordionData.titre}
              </button>
            </h3>
            <div className='fr-collapse' id={`accordion-${data.id}`}>
              <ReactMarkdown>{accordionData.contenu}</ReactMarkdown>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
