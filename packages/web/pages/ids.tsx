import { VFC } from 'react';
import IdForm from '../components/forms/IdForm';
import IdTable from '../components/IdTable';

const Ids: VFC = () => {
  return (
    <main className='max-w-5xl mx-auto px-4 py-24 space-y-8'>
      <IdForm />
      <IdTable />
    </main>
  );
};

export default Ids;
