import createInstance from './createInstance';

const favouritesAPI = createInstance('/articles');

export const addArticleToFavourites = (article: number) => favouritesAPI.post(`/${article}/favourites`);

export const removeArticleFromFavourites = (article: number) => favouritesAPI.delete(`/${article}/favourites`);
