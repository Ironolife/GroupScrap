import Select, { SelectProps } from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { VFC } from 'react';
import { useField } from 'formik';

type Option = {
  label: string;
  value: string;
};

type FormikSelectProps = SelectProps & {
  name: string;
  options: Option[];
};

const FormikSelect: VFC<FormikSelectProps> = ({
  name,
  options,
  label,
  variant,
  required,
  fullWidth,
  ...rest
}) => {
  const [field, meta] = useField<string>(name);

  return (
    <FormControl
      required={required}
      variant={variant}
      error={meta.touched && !!meta.error}
      fullWidth={fullWidth}
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        label={`${label}${required ? ' *' : ''}`}
        required={required}
        {...field}
        {...rest}
      >
        {options.map(({ label, value }) => (
          <MenuItem key={label} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {meta.touched && meta.error && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormikSelect;
