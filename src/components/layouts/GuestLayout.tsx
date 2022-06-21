import { Button, Grid, Typography } from '@mui/material';
import React, {PropsWithChildren} from 'react';

const GuestLayout : React.FC<PropsWithChildren> = ({children}) => {
    return (
        <Grid container flexDirection="column" minHeight="100%">
            <Grid item flex="1 0 auto">
                <Grid container px={5} py={2} spacing={2} justifyContent="end">
                    <Grid item><Button variant='outlined'>Sign In</Button></Grid>
                    <Grid item><Button variant='text'>Sign Up</Button></Grid>
                </Grid>
                {children}
            </Grid>
            <Grid item flexShrink={0} py={2}>
                <Typography textAlign="center" variant='body2'>Books Ranking - © 2022</Typography>
            </Grid>
        </Grid>
)}

export default GuestLayout;