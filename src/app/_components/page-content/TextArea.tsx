import React from 'react';
import Link from 'next/link';
import ReactMarkdown, { Components } from 'react-markdown';
import { marginsBottom, position } from '../structs';

type TextAreaProps = {
  data: {
    position: 'Gauche' | 'Centre' | 'Droite';
    espacement_bas: keyof typeof marginsBottom;
    tabulation: keyof typeof tabulations;
    texte: string;
  };
  row: number;
};

const tabulations: Record<'Aucune' | 'Petite' | 'Moyenne' | 'Grande', string> = {
  Aucune: '0%',
  Petite: '8%',
  Moyenne: '16%',
  Grande: '24%'
};

const components: Components = {
  a: ({ href, children, ...props }) => {
    if (!href) {
      return <span {...props}>{children}</span>;
    }

    return (
      <Link href={href} passHref>
        <a target={href.includes('https') ? '_blank' : undefined} {...props}>
          {children}
        </a>
      </Link>
    );
  }
};

export const TextArea = ({ data, row }: TextAreaProps) => {
  const positionClass = position[data.position as keyof typeof position] || '';

  return (
    <div
      style={{
        marginLeft: data.position === 'Centre' ? '10%' : undefined,
        marginBottom: marginsBottom[data.espacement_bas] || '0px'
      }}>
      <div
        className={`textarea ${positionClass === 'left' ? '' : 'ml40'}`}
        style={{
          marginLeft: row != null ? '0' : tabulations[data.tabulation] || '0%',
          marginRight: tabulations[data.tabulation] || '0%',
          wordBreak: 'break-word'
        }}>
        <ReactMarkdown components={components}>{data.texte}</ReactMarkdown>
      </div>
    </div>
  );
};
