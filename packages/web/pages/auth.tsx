import { VFC } from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../components/forms/LoginForm';
import Redirect from '../components/Redirect';
import { RootState } from '../store/store';

const Auth: VFC = () => {
  const { isAuth, isReady } = useSelector((state: RootState) => state.auth);
  if (!isReady) return null;
  if (isAuth) return <Redirect href='/search' />;

  return (
    <main className='max-w-lg mx-auto px-4 py-24'>
      <LoginForm />
    </main>
  );
};

export default Auth;
