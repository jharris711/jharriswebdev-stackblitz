import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { theme } from '../../theme';

function Wrapper({ children }) {
  return (
    <Provider store={store}>
      <CssBaseline />
      {/* @ts-ignore */}
      <ThemeProvider id="main-theme-provider" theme={theme}>
        {children}
      </ThemeProvider>
    </Provider>
  );
}

export default Wrapper;
