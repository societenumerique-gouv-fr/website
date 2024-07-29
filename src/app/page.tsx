import type { Metadata } from 'next';

type Article = {
  id: string;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Accueil - Société Numérique',
  description:
    'Le Programme Société Numérique de l’Agence Nationale de la Cohésion des Territoires œuvre en faveur d’un numérique d’intérêt général en offrant à tous et toutes les clés d’appropriation du numérique.'
};

const getArticles = async (): Promise<{ data: Article[] }> => {
  const response = await fetch(`${process.env.STRAPI_API_URL}/articles`);

  if (!response.ok) {
    throw new Error('Impossible de récupérer les articles');
  }

  return response.json();
};

const HomePage = async () => {
  const { data: articles }: { data: Article[] } = await getArticles();
  return (
    <main>
      <h1>Articles</h1>
      {articles.map((article: Article) => (
        <article key={article.id}>
          <h2>{article.attributes.title}</h2>
          <p>{article.attributes.description}</p>
        </article>
      ))}
    </main>
  );
};

export default HomePage;
