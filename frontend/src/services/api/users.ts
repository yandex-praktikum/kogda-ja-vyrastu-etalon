import createInstance from './createInstance';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export interface User {
  id: string;
  email: string;

  roles: Role[];

  username: string;

  nickname: string | null;

  bio: string | null;

  image: string | null;

  isCurrentUserSubscribed?: boolean;
}

const usersAPI = createInstance('/users');
export interface CreateUserDto {
  username: string;
  email: string;
  password: string;

  nickname?: string;
}
export const post = (createUserDto: CreateUserDto) => usersAPI
  .post<User>('', createUserDto)
  .then(({ data }) => data);

export interface UpdateUserDto {
  nickname?: string;

  bio?: string;

  email?: string;

  image?: string;

  password?: string;

  username?: string;
}

export const patch = (id: string, updateUserDto: UpdateUserDto) => usersAPI.patch<User>(`/${id}`, updateUserDto).then(({ data }) => data);

export const getCurrentUser = () => usersAPI.get<User>('/me').then(({ data }) => data);

export const getByUsername = (username: string) => usersAPI.get<User>(`/username/${username}`).then(({ data }) => data);
