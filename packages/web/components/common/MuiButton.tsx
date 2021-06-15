import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { FC } from 'react';

const CustomButton = withStyles({
  root: {
    '&:disabled': {
      backgroundColor: undefined,
      color: undefined,
      opacity: 0.5,
    },
  },
})(Button);

type MuiButtonProps = ButtonProps & {
  loading?: boolean;
};

const MuiButton: FC<MuiButtonProps> = ({
  loading,
  disabled,
  children,
  ...rest
}) => {
  return (
    <CustomButton disabled={loading || disabled} {...rest}>
      <span className={loading ? 'invisible' : 'visible'}>{children}</span>
      {loading && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <CircularProgress size={18} color='inherit' />
        </div>
      )}
    </CustomButton>
  );
};

export default MuiButton;
