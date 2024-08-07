export type RapportDeRechercheResource = {
  id: string;
  attributes: {
    titre_de_la_carte: string;
    texte_de_la_carte: string;
    nom_de_page: string;
    type: 'etude';
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    composants: unknown[];
  };
};
