import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { VFC } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import MuiThemeProvider from '../components/MuiThemeProvider';
import ReactQueryProvider from '../components/ReactQueryProvider';
import store from '../store/store';
import AuthProvider from '../components/AuthProvider';
import Sidebar from '../components/Sidebar';
import IdsProvider from '../components/IdsProvider';

const MyApp: VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <StoreProvider store={store}>
      <ReactQueryProvider>
        <MuiThemeProvider>
          <AuthProvider>
            <IdsProvider>
              <Sidebar />
              <Component {...pageProps} />
            </IdsProvider>
          </AuthProvider>
        </MuiThemeProvider>
      </ReactQueryProvider>
    </StoreProvider>
  );
};

export default MyApp;
