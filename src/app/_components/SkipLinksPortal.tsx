'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import SkipLinks from '@codegouvfr/react-dsfr/SkipLinks';

interface SkipLinksPortalProps {
  links: { label: string; anchor: string }[];
  elementId?: string;
}

const SkipLinksPortal: React.FC<SkipLinksPortalProps> = ({ links, elementId = 'skip-links' }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? createPortal(<SkipLinks links={links} />, document.getElementById(elementId) ?? document.body) : null;
};

export default SkipLinksPortal;
