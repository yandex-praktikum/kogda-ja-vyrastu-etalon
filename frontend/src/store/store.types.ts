import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import store from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<TReturn = void> = ActionCreator<
ThunkAction<TReturn, RootState, unknown, Action>
>;
