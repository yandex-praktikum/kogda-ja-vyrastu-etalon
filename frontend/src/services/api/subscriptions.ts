import createInstance from './createInstance';

const subscriptionsAPI = createInstance('/users/subscriptions');

export const subscribeToUser = (userId: string) => subscriptionsAPI.post(`/user/${userId}`);

export const unsubscribeFromUser = (userId: string) => subscriptionsAPI.delete(`/user/${userId}`);
