import React from 'react';
import { createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material';
import RouterLayout from './components/layouts/RouterLayout';
import { BrowserRouter } from 'react-router-dom';
import "./firebase/Initialization";
import { UserProvider } from './components/Contexts/UserContext';

let theme = createTheme({});
theme = responsiveFontSizes(theme);

const App : React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <BrowserRouter>
          <RouterLayout />
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
