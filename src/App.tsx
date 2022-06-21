import React from 'react';
import { createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material';
import WelcomePage from './components/pages/Welcome';
import RouterLayout from './components/layouts/RouterLayout';
import { BrowserRouter } from 'react-router-dom';

let theme = createTheme({});
theme = responsiveFontSizes(theme);

const App : React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <RouterLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
