import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment, TextField } from '@mui/material';
import React, { ChangeEventHandler, useState } from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

interface Props {
    isOpen: boolean,
    onClose: () => void,
}

const LoginDialog : React.FC<Props> = ({isOpen, onClose}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailChanged = (e: any) => setEmail(e.target.value);
    const onPasswordChanged = (e: any) => setPassword(e.target.value);

    const onSubmit = async () => {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential.user);
    }

    return (
        <Dialog
            fullWidth
            open={isOpen}
            onClose={onClose}
        >
            <DialogTitle textAlign="center" variant='h5' mt={2}>Login</DialogTitle>
            <DialogContent>
                <Grid container flexDirection="column" spacing={2} mt={1} px={3}>
                    <Grid item>
                        <TextField 
                            required
                            fullWidth
                            id="email"
                            type="email"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={onEmailChanged}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><PersonRoundedIcon /></InputAdornment>,
                                }}
                            />
                    </Grid>
                    <Grid item>
                        <TextField 
                            required
                            fullWidth
                            id="password"
                            type="password"
                            label="Password"
                            variant="outlined"
                            value={password}
                            onChange={onPasswordChanged}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><KeyRoundedIcon /></InputAdornment>,
                                }}
                            />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid container mb={5} px={3} spacing={2}>
                    <Grid item container spacing={1}>
                        <Grid item xs={10}>
                            <Button fullWidth onClick={onSubmit} variant="outlined">Sign In</Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button fullWidth onClick={onClose} variant="text">Close</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
)}

export default LoginDialog;