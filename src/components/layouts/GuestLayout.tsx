import { Button, Grid, Typography } from '@mui/material';
import React, {PropsWithChildren, useState} from 'react';
import BasicDialog from '../Dialogs/BasicDialog';

const GuestLayout : React.FC<PropsWithChildren> = ({children}) => {
    const signInFields = [
        {id: "email", type: "email", label: "Email"}, 
        {id: "password", type: "password", label: "Password"}];

    const signUpFields = [
        {id: "email", type: "email", label: "Email"}, 
        {id: "fullname", type: "text", label: "Full name"}, 
        {id: "nickname", type: "text", label: "Nickname"}, 
        {id: "password", type: "password", label: "Password"}];

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
            <BasicDialog caption="Sign In" isOpen={isSignInOpen} onClose={() => setSignInOpen(false)} onSubmit={() => {}} fields={signInFields} />
            <BasicDialog caption="Sign Up" isOpen={isSignUpOpen} onClose={() => setSignUpOpen(false)} onSubmit={() => {}} fields={signUpFields} />
        </Grid>
)}

export default GuestLayout;