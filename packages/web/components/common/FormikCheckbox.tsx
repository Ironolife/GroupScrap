import FormControl from '@material-ui/core/FormControl';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useField } from 'formik';
import { VFC } from 'react';

type FormikCheckboxProps = CheckboxProps & {
  label: string;
  name: string;
};

const FormikCheckbox: VFC<FormikCheckboxProps> = ({ name, label, ...rest }) => {
  const [field, meta] = useField<boolean>(name);

  return (
    <FormControl error={meta.touched && !!meta.error}>
      <FormControlLabel
        control={<Checkbox checked={field.value} {...field} {...rest} />}
        label={label}
      />
      {meta.touched && meta.error && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormikCheckbox;
