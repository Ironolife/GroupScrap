import { Form, Formik, FormikHelpers } from 'formik';
import { VFC } from 'react';
import { useSelector } from 'react-redux';
import { Id, setIds } from '../../store/reducers/ids.reducer';
import { RootState, useAppDispatch } from '../../store/store';
import { setIdsCookie } from '../../utils/IdsCookie';
import FormikSelect from '../common/FormikSelect';
import FormikTextField from '../common/FormikTextField';
import MuiButton from '../common/MuiButton';

const IdForm: VFC = () => {
  const dispatch = useAppDispatch();
  const ids = useSelector((state: RootState) => state.ids);

  const initialValues: Id = {
    type: 'page',
    value: '',
  };

  const onSubmit = (formValues: Id, { resetForm }: FormikHelpers<Id>) => {
    if (!ids.find(({ value }) => value === formValues.value)) {
      const newIds = [...ids, formValues];

      dispatch(setIds(newIds));
      setIdsCookie(newIds);
    }
    resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className='flex space-x-4'>
        <FormikTextField
          className='flex-1'
          name='value'
          label='Id'
          variant='outlined'
          required
        />
        <FormikSelect
          className='w-36 flex-shrink-0'
          name='type'
          label='Type'
          variant='outlined'
          options={[
            { label: 'Page', value: 'page' },
            { label: 'Group', value: 'group' },
          ]}
          required
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
          }}
        />
        <MuiButton
          className='w-24'
          variant='contained'
          color='primary'
          size='large'
          type='submit'
        >
          Add
        </MuiButton>
      </Form>
    </Formik>
  );
};

export default IdForm;
