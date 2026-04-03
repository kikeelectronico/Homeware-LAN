import React from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const AppWithTheme = () => {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(() => {
    const light = {
      background: {
        default: '#eee',
        paper: '#fff',
      },
      text: {
        primary: '#333333',
        secondary: '#777',
      },
    };

    const dark = {
      background: {
        default: '#10151c',
        paper: '#18202b',
      },
      text: {
        primary: '#e6e9ef',
        secondary: '#9aa4b2',
      },
    };

    return createTheme({
      palette: {
        mode: prefersDark ? 'dark' : 'light',
        primary: {
          main: '#1c8adb',
          contrastText: '#ffffff',
        },
        ...(prefersDark ? dark : light),
      },
      components: {
        MuiInputBase: {
          styleOverrides: {
            input: {
              color: prefersDark ? dark.text.secondary : light.text.secondary,
            },
          },
        },
      },
    });
  }, [prefersDark]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <AppWithTheme />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
