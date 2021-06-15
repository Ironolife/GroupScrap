import Cookie from 'js-cookie';
import { Id } from '../store/reducers/ids.reducer';

const COOKIE_NAME = 'groupscrap:ids';
const COOKIE_MAX_AGE = 1825; // 5 year

export const setIdsCookie = (ids: Id[]) => {
  const cookie = JSON.stringify(ids);

  Cookie.set(COOKIE_NAME, cookie, {
    expires: COOKIE_MAX_AGE,
    sameSite: 'Lax',
    secure: true,
  });
};

export const getIdsCookie = () => {
  const cookie = Cookie.get(COOKIE_NAME);

  if (!cookie) return null;

  return JSON.parse(cookie) as Id[];
};
