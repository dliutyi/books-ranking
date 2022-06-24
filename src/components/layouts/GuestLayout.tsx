import { Button, Grid, Typography } from '@mui/material';
import React, {PropsWithChildren, useContext, useState} from 'react';
import LoginDialog from '../dialogs/LoginDialog';
import RegistrationDialog from '../dialogs/RegistrationDialog';

const GuestLayout : React.FC<PropsWithChildren> = ({children}) => {
    const [ isSignInOpen, setSignInOpen ] = useState(false);
    const [ isSignUpOpen, setSignUpOpen ] = useState(false);

    return (
        <Grid container flexDirection="column" minHeight="100%">
            <Grid item flex="1 0 auto">
                <Grid container px={5} py={2} spacing={2} justifyContent="end">
                    <Grid item><Button variant='outlined' onClick={() => setSignInOpen(true)}>Sign In</Button></Grid>
                    <Grid item><Button variant='text' onClick={() => setSignUpOpen(true)}>Sign Up</Button></Grid>
                </Grid>
                {children}
            </Grid>
            <Grid item flexShrink={0} py={2}>
                <Typography textAlign="center" variant='body2'>Books Ranking - © 2022</Typography>
            </Grid>
            <LoginDialog isOpen={isSignInOpen} onClose={() => setSignInOpen(false)} />
            <RegistrationDialog isOpen={isSignUpOpen} onClose={() => setSignUpOpen(false)} />
        </Grid>
)}

export default GuestLayout;