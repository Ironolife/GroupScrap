import { Form, Formik, FormikHelpers } from 'formik';
import { VFC } from 'react';
import FormikTextField from '../common/FormikTextField';
import MuiButton from '../common/MuiButton';

type SearchFormProps = {
  onSubmit: (
    formValues: { searchString: string },
    helpers: FormikHelpers<{ searchString: string }>
  ) => void;
};

const SearchForm: VFC<SearchFormProps> = ({ onSubmit }) => {
  const initialValues = {
    searchString: '',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form className='flex space-x-4'>
          <FormikTextField
            className='flex-1'
            name='searchString'
            label='Search'
            variant='outlined'
            required
          />
          <MuiButton
            className='w-24'
            variant='contained'
            color='primary'
            size='large'
            type='submit'
            loading={isSubmitting}
          >
            Search
          </MuiButton>
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;
