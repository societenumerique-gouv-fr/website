// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client';

import { useEffect, useState } from 'react';

export const AnchorNavigator = ({ data }) => {
  const [navClass, setNavClass] = useState('fixed-navigation');

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 162 && window.scrollY <= document.body.scrollHeight - 750) {
        setNavClass('fixed-navigation fixed-nav');
      } else if (window.scrollY > document.body.scrollHeight - 750) {
        setNavClass('fixed-navigation ty450');
      } else {
        setNavClass('fixed-navigation');
      }
    });
  }, []);

  return (
    <div className={navClass}>
      {data.ancre.map((a) => {
        return (
          <a key={a.titre} href={'#' + a.ancre}>
            <div className='anchor'>{a.titre}</div>
          </a>
        );
      })}
    </div>
  );
};
