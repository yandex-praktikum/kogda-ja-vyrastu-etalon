import createInstance from './createInstance';

const subscriptionsAPI = createInstance('/users/subscriptions');

export const subscribeToUser = (userId: number) => subscriptionsAPI.post(`/user/${userId}`);

export const unsubscribeFromUser = (userId: number) => subscriptionsAPI.delete(`/user/${userId}`);
