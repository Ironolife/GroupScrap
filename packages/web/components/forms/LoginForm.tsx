import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { VFC } from 'react';
import { useMutation } from 'react-query';
import { login, LoginFormValues } from '../../api/api';
import { setAuth } from '../../store/reducers/auth.reducer';
import { useAppDispatch } from '../../store/store';
import FormikTextField from '../common/FormikTextField';
import MuiButton from '../common/MuiButton';

const LoginForm: VFC = () => {
  const router = useRouter();

  const loginMutation = useMutation(login);
  const dispatch = useAppDispatch();

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const onSubmit = (
    formValues: LoginFormValues,
    { resetForm }: FormikHelpers<LoginFormValues>
  ) => {
    loginMutation.mutate(formValues, {
      onSuccess: () => {
        dispatch(setAuth({ isReady: true, isAuth: true }));
        router.replace('/search');
      },
      onError: () => {
        resetForm();
      },
    });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} autoComplete='on'>
      <Form className='flex flex-col space-y-8'>
        <span className='self-center font-medium text-2xl'>Login</span>
        <div className='flex flex-col space-y-4'>
          <FormikTextField
            name='email'
            label='Email'
            variant='outlined'
            autoComplete='email'
            required
          />
          <FormikTextField
            name='password'
            label='Password'
            variant='outlined'
            autoComplete='current-password'
            type='password'
            required
          />
        </div>
        {loginMutation.isError && (
          <span className='text-red-500 text-center'>Login unsuccessful.</span>
        )}
        <MuiButton
          className='h-14'
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          loading={loginMutation.isLoading}
        >
          Login
        </MuiButton>
      </Form>
    </Formik>
  );
};

export default LoginForm;
