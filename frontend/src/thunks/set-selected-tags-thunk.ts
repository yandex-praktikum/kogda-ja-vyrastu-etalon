import { Tag } from '../services/api/tags';
import { setSelectedTags } from '../store';
import { AppThunk } from '../store/store.types';
import getPublicFeedThunk from './get-public-feed-thunk';

const setSelectedTagsThunk: AppThunk = (tags: Tag[]) => (dispatch) => {
  dispatch(getPublicFeedThunk({ tags: tags.map((tag) => tag.label), offset: 0 }));

  dispatch(setSelectedTags(tags));
};

export default setSelectedTagsThunk;
