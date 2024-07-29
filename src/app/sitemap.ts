import { MetadataRoute } from 'next';
import { urlFromEnv } from './_utils';

// todo: finish sitemap after website migration

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: urlFromEnv(),
    lastModified: new Date()
  }
];

export default sitemap;
