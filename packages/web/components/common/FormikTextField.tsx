import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { useField } from 'formik';
import { VFC } from 'react';

type FormikTextFieldProps = TextFieldProps & {
  name: string;
};

const FormikTextField: VFC<FormikTextFieldProps> = ({ name, ...rest }) => {
  const [field, meta] = useField<string>(name);

  return (
    <TextField
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      {...field}
      {...rest}
    />
  );
};

export default FormikTextField;
