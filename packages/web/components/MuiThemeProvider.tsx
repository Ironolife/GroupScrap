import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { FC } from 'react';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  palette: {
    type: 'dark',
    action: {
      disabledBackground: undefined,
      disabled: undefined,
    },
  },
});

const MuiThemeProvider: FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
