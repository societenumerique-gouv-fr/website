export type BreveResource = {
  id: string;
  attributes: {
    titre_de_la_carte: string;
    nom_de_page: string;
    label: string;
    type: 'breve';
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    image: unknown;
    composants: unknown[];
  };
};
