import { IComparator, TArticles } from '../types';
import { Article } from '../api/articles';

const makeTopFeed = (
  articles: Article[],
  compareFunction: IComparator,
  qty: number,
) : Article[] => articles.slice().sort(compareFunction).slice(0, qty ?? 5);

export default makeTopFeed;
