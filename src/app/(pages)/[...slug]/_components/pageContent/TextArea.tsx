// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { marginsBottom, position } from '../structs';

export const TextArea = ({ data, row }) => {
  const tabulations = {
    Aucune: '0%',
    Petite: '8%',
    Moyenne: '16%',
    Grande: '24%'
  };

  const components = {
    a: ({ ...props }) => (
      <Link href={props.href} target={props.href.includes('https') ? '_blank' : undefined}>
        {props.children}
      </Link>
    )
  };

  return (
    <div style={{ marginLeft: data.position == 'Centre' ? '10%' : null, marginBottom: marginsBottom[data.espacement_bas] }}>
      <div
        className={`textarea ${position[data.position] == 'left' ? '' : 'ml40'}`}
        style={{
          marginLeft: row != null ? '0' : '',
          wordBreak: 'break-word',
          marginLeft: tabulations[data.tabulation],
          marginRight: tabulations[data.tabulation]
        }}>
        <ReactMarkdown components={components}>{data.texte}</ReactMarkdown>
      </div>
    </div>
  );
};
