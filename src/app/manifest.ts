import fs from 'fs';
import { MetadataRoute } from 'next';
import path from 'path';

const iconsDirectory = path.join(process.cwd(), 'public/favicons');
const listFilesInDirectory = (dir: string): string[] => fs.readdirSync(dir).map((file) => path.join('/favicons', file));

const sizeFromFineName = (src: string): { sizes?: string } => {
  const sizes: string | undefined = src.match(/\d+x\d+/)?.[0];
  return sizes ? { sizes } : {};
};

const webManifest = (): MetadataRoute.Manifest => ({
  name: 'Société Numérique',
  description:
    'Le Programme Société Numérique de l’Agence Nationale de la Cohésion des Territoires œuvre en faveur d’un numérique d’intérêt général en offrant à tous et toutes les clés d’appropriation du numérique.',
  start_url: '/',
  display: 'standalone',
  background_color: '#ffffff',
  theme_color: '#000091',
  icons: listFilesInDirectory(iconsDirectory).map((src: string) => ({
    src,
    ...sizeFromFineName(src),
    type: 'image/png'
  }))
});

export default webManifest;
