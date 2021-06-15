import { FC, useEffect, VFC } from 'react';
import { setIds } from '../store/reducers/ids.reducer';
import { useAppDispatch } from '../store/store';
import { getIdsCookie } from '../utils/IdsCookie';

const IdsProvider: FC = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const ids = getIdsCookie();
    if (ids) {
      dispatch(setIds(ids));
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default IdsProvider;
