import { fetchData } from '../functions/fetcher';

export const getNavigationItems = async () => await fetchData(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/header-navigation`);
