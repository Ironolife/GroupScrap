import { FormikHelpers } from 'formik';
import { VFC } from 'react';
import { useMutation } from 'react-query';
import { search } from '../api/api';
import SearchForm from '../components/forms/SearchForm';
import ResultsList from '../components/ResultsList';
import withAuth from '../utils/withAuth';

const Search: VFC = () => {
  const searchMutation = useMutation(search);

  const onSubmit = (
    { searchString }: { searchString: string },
    { setSubmitting, resetForm }: FormikHelpers<{ searchString: string }>
  ) => {
    searchMutation.mutate(searchString, {
      onSettled: () => {
        setSubmitting(false);
        resetForm();
      },
    });
  };

  return (
    <main className='max-w-5xl mx-auto px-4 py-24 space-y-8'>
      <SearchForm onSubmit={onSubmit} />
      {searchMutation.error && (
        <div className='text-red-500 text-center'>Unknown error occurred</div>
      )}
      {searchMutation.data && <ResultsList results={searchMutation.data} />}
    </main>
  );
};

export default withAuth(Search);
