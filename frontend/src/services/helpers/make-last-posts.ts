import { TArticle, TArticles } from '../types';

const comparePublishDatesInArticle = (
  first : TArticle,
  second : TArticle,
) : number => {
  const firstDate = +new Date(first.createdAt);
  const secondDate = +new Date(second.createdAt);
  const delta = secondDate - firstDate;
  return Math.sign(delta);
};

const makeTopLikes = (
  articles: TArticles,
  qty : number,
) : TArticles => articles.sort(comparePublishDatesInArticle).slice(qty);

export default makeTopLikes;
