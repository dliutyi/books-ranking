import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { NotificationContext } from "../contexts/NotificationContext";
import { UserContext } from "../contexts/UserContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationDialog: React.FC<Props> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChanged = (e: any) => setEmail(e.target.value);
  const onNicknameChanged = (e: any) => setNickname(e.target.value);
  const onPasswordChanged = (e: any) => setPassword(e.target.value);

  const auth = getAuth();
  const { updateUser } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);

  const onSubmit = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser!, { displayName: nickname });
      console.log(auth.currentUser);
      updateUser({ displayName: nickname });
    } catch (e: unknown) {
      if (e instanceof Error) {
        setNotification({
          value: e.message,
          type: "error",
        });
      }
    }
  };

  return (
    <Dialog fullWidth open={isOpen} onClose={onClose}>
      <DialogTitle textAlign="center" variant="h5" mt={2}>
        Login
      </DialogTitle>
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
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailRoundedIcon />
                  </InputAdornment>
                ),
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
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonRoundedIcon />
                  </InputAdornment>
                ),
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
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container mb={5} px={3} spacing={2}>
          <Grid item container spacing={1}>
            <Grid item xs={10}>
              <Button fullWidth onClick={onSubmit} variant="outlined">
                Sign In
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button fullWidth onClick={onClose} variant="text">
                Close
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default RegistrationDialog;
