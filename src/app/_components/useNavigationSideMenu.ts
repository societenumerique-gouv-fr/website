import { useEffect, useMemo, useState } from 'react';
import type { SideMenuProps } from '@codegouvfr/react-dsfr/SideMenu';

export const isBrowser = typeof document !== 'undefined';

export const isDefinedAndNotNull = <T>(value: T | null | undefined): value is T => value !== null && value !== undefined;

const getIdFromItem = (item: SideMenuProps.Item): string | null =>
  'linkProps' in item ? (item.linkProps?.href?.toString().slice(1) ?? null) : null;

/**
 * This will use all the link items with an href starting with # to compute the active item
 */
export const useNavigationSideMenu = ({
  contentId,
  items,
  intersectionThreshold = 0.1
}: {
  contentId: string;
  items: SideMenuProps.Item[];
  intersectionThreshold?: number;
}) => {
  const [contentElement, setContentElement] = useState<HTMLElement | null>(
    isBrowser ? document.getElementById(contentId) : null
  );

  // Need a use effect to get the element after first render
  useEffect(() => {
    setContentElement(document.getElementById(contentId));
  }, [contentId]);

  const navigableItemIds = useMemo(() => items.map(getIdFromItem).filter(isDefinedAndNotNull), [items]);

  // Used to not rettriger the observer with same id list
  const navigableItemsMemoKey = useMemo(() => navigableItemIds.join('-'), [navigableItemIds]);

  const [activeId, setActiveId] = useState<string | null>(navigableItemIds[0] ?? null);

  useEffect(
    () => {
      const hasIOSupport = !!window.IntersectionObserver;

      if (!hasIOSupport) {
        return;
      }

      const elements = navigableItemIds
        // No id means the empty '#' anchor, which is the top of the page, so we use the body
        .map((id) => (id === '' ? document.body : document.getElementById(id)))
        .filter(isDefinedAndNotNull);

      if (elements.length === 0) {
        return;
      }

      const visibleElements = new Map(navigableItemIds.map((id) => [id, false]));

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entryChange of entries) {
            visibleElements.set(entryChange.target.id, entryChange.isIntersecting);
          }

          // @ts-expect-error can iterate on set entries
          for (const [id, isVisible] of visibleElements.entries()) {
            if (isVisible) {
              setActiveId(id);
              break;
            }
          }
        },
        {
          threshold: intersectionThreshold
        }
      );
      for (const element of elements) {
        observer.observe(element);
      }
      return () => observer.disconnect();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contentElement, navigableItemsMemoKey, intersectionThreshold]
  );

  return { activeId, activeHref: `#${activeId}` };
};
