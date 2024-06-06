import createInstance from './createInstance';

export interface Tag {
  id: number;

  label: string;

  createdAt: Date;
}

const tagsAPI = createInstance('/tags');
export interface TagsQueryFilter {
  sort?: 'recent' | 'popular';

  offset?: number;

  limit?: number;
}

export const getAll = (params: TagsQueryFilter = {}) => tagsAPI.get<Tag[]>('', { params }).then(({ data }) => data);
