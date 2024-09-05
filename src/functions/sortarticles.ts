'use client';

type ArticleAttributes = {
  updatedAt: string;
};

type Article = {
  attributes: ArticleAttributes;
};

type Category = {
  data: Article[];
};

export const sortArticles = (articles: Category[], exclude: number[]): ArticleAttributes[] => {
  let datesList: string[] = [];
  const mostRecentArticles: ArticleAttributes[] = [];

  articles.forEach((category, index) => {
    category.data.forEach((data) => {
      if (!exclude.includes(index)) {
        datesList.push(data.attributes.updatedAt);
      }
    });
  });

  datesList = datesList.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  for (let i = 0; i < datesList.length; i++) {
    articles.forEach((category) => {
      category.data.forEach((data) => {
        if (data.attributes.updatedAt === datesList[i]) {
          mostRecentArticles.push(data.attributes);
        }
      });
    });
  }

  return mostRecentArticles;
};
