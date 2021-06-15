import { FC, useEffect } from 'react';
import { useMutation } from 'react-query';
import { getStatus } from '../api/api';
import { setAuth } from '../store/reducers/auth.reducer';
import { useAppDispatch } from '../store/store';

const AuthProvider: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const getStatusMutation = useMutation(getStatus);

  useEffect(() => {
    getStatusMutation.mutate(undefined, {
      onSuccess: () => {
        dispatch(setAuth({ isReady: true, isAuth: true }));
      },
      onError: () => {
        dispatch(setAuth({ isReady: true, isAuth: false }));
      },
    });
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
