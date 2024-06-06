import { Article } from '../api/articles';

const compareCreatedDatesForTop = (
  first : Article,
  second : Article,
) : number => +new Date(second.createdAt) - +new Date(first.createdAt);

export default compareCreatedDatesForTop;
