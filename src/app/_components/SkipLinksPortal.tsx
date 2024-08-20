'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import SkipLinks from '@codegouvfr/react-dsfr/SkipLinks';

type SkipLinksPortalProps = {
  links: { label: string; anchor: string }[];
  elementId?: string;
};

const SkipLinksPortal: React.FC<SkipLinksPortalProps> = ({ links, elementId = 'skip-links' }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const portalTarget = document.getElementById(elementId) ?? document.body;

  return isMounted ? createPortal(<SkipLinks links={links} />, portalTarget) : null;
};

export default SkipLinksPortal;
