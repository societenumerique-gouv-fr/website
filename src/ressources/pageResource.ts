export type PageResource = {
  id: string;
  attributes: {
    nom_de_page: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    Composants: unknown[];
  };
};
