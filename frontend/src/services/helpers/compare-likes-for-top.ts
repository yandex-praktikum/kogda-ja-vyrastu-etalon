import { Article } from '../api/articles';

const compareLikesForTop = (
  first : Article,
  second : Article,
) : number => second.favoredCount - first.favoredCount;

export default compareLikesForTop;
