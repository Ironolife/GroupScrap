import { ComponentType, VFC } from 'react';
import { useSelector } from 'react-redux';
import Redirect from '../components/Redirect';
import { RootState } from '../store/store';

const withAuth =
  (Component: ComponentType): VFC =>
  () => {
    const { isAuth, isReady } = useSelector((state: RootState) => state.auth);

    if (!isReady) return null;
    if (!isAuth) return <Redirect href='/auth' />;
    return <Component />;
  };

export default withAuth;
