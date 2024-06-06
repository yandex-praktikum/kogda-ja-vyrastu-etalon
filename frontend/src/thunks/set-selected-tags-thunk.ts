import { Tag } from '../services/api/tags';
import { AppThunk } from '../store/store.types';
import { setSelectedTags } from '../store';
import getPublicFeedThunk from './get-public-feed-thunk';

const setSelectedTagsThunk: AppThunk = (tags: Tag[]) => (dispatch) => {
  dispatch(getPublicFeedThunk({ tags: tags.map((tag) => tag.label) }));

  dispatch(setSelectedTags(tags));
};

export default setSelectedTagsThunk;
