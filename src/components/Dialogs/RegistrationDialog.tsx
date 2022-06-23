import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

interface Props {
    isOpen: boolean,
    onClose: () => void,
}

const RegistrationDialog : React.FC<Props> = ({isOpen, onClose}) => {
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");

    const onEmailChanged = (e: any) => setEmail(e.target.value);
    const onFullnameChanged = (e: any) => setFullname(e.target.value);
    const onNicknameChanged = (e: any) => setNickname(e.target.value);
    const onPasswordChanged = (e: any) => setPassword(e.target.value);

    const onSubmit = async () => {
        alert("To be implemented soon");
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
                                startAdornment: <InputAdornment position="start"><EmailRoundedIcon /></InputAdornment>,
                                }}
                            />
                    </Grid>
                    <Grid item>
                        <TextField 
                            required
                            fullWidth
                            id="fullname"
                            type="text"
                            label="Full name"
                            variant="outlined"
                            value={fullname}
                            onChange={onFullnameChanged}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><PersonRoundedIcon /></InputAdornment>,
                                }}
                            />
                    </Grid>
                    <Grid item>
                        <TextField 
                            required
                            fullWidth
                            id="nickname"
                            type="text"
                            label="Nickname"
                            variant="outlined"
                            value={nickname}
                            onChange={onNicknameChanged}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><EditRoundedIcon /></InputAdornment>,
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

export default RegistrationDialog;