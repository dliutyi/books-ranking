import React from 'react';
import { createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material';
import RouterLayout from './components/layouts/RouterLayout';
import { BrowserRouter } from 'react-router-dom';
import "./firebase/Initialization";
import { UserProvider } from './components/contexts/UserContext';
import { NotificationProvider } from './components/contexts/NotificationContext';

let theme = createTheme({});
theme = responsiveFontSizes(theme);

const App : React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <UserProvider>
          <BrowserRouter>
            <RouterLayout />
          </BrowserRouter>
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
