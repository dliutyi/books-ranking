import { Button, Grid, Typography } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import React from 'react';

interface Props {
    children: JSX.Element;
  };

const AuthenticatedLayout : React.FC<Props> = ({children}) => {
  const auth = getAuth();

  const handleLogOut = async () => {
    await signOut(auth);
  }

  return (
    <Grid container flexDirection="column" minHeight="100%">
      <Grid item flex="1 0 auto">
          <Grid container px={5} py={2} spacing={2} justifyContent="end">
              <Grid item><Button variant='outlined' onClick={handleLogOut}>Log out</Button></Grid>
          </Grid>
          {children}
      </Grid>
      <Grid item flexShrink={0} py={2}>
          <Typography textAlign="center" variant='body2'>Books Ranking - © 2022</Typography>
      </Grid>
    </Grid>
)}

export default AuthenticatedLayout;