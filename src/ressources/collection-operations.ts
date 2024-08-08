export const toAttributes = ({ attributes }: { attributes: unknown }) => attributes;

export const byPubicationDate = (
  { attributes: { publishedAt: publishedAt1 } }: { attributes: { publishedAt: Date } },
  { attributes: { publishedAt: publishedAt2 } }: { attributes: { publishedAt: Date } }
) => new Date(publishedAt1).getTime() - new Date(publishedAt2).getTime();
