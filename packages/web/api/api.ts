import axios from 'axios';
import store from '../store/store';
import onError from './onError';

export type LoginFormValues = {
  email: string;
  password: string;
};

export const login = async ({
  email,
  password,
}: LoginFormValues): Promise<void> => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      email,
      password,
    })
    .then(() => {})
    .catch(onError);
};

export const logout = async (): Promise<void> => {
  return axios
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/logout`)
    .then(() => {})
    .catch(onError);
};

export const getStatus = async (): Promise<void> => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/status`)
    .then(() => {})
    .catch(onError);
};

type Post = {
  href: string;
  content?: string;
};

export type SearchResponse = ({ id: string } & (
  | { name: string; posts: Post[] }
  | { name?: never; posts?: never }
))[];

export const search = async (searchString: string): Promise<SearchResponse> => {
  const ids = store.getState().ids;

  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/search`, {
      searchString,
      ids,
    })
    .then((res) => res.data)
    .catch(onError);
};
