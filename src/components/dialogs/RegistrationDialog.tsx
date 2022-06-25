import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
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
import * as yup from "yup";
import { useFormik } from "formik";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  nickname: yup
    .string()
    .min(3, "Nickname should be of minimum 3 characters")
    .required("Nickname is required"),
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters")
    .required("Password is required"),
});

const RegistrationDialog: React.FC<Props> = ({ isOpen, onClose }) => {
  const auth = getAuth();
  const { updateUser } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      nickname: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        await updateProfile(auth.currentUser!, {
          displayName: values.nickname,
        });
        console.log(auth.currentUser);
        updateUser({ displayName: values.nickname });
      } catch (e: unknown) {
        if (e instanceof Error) {
          setNotification({
            value: e.message,
            type: "error",
          });
        }
      }
    },
  });

  return (
    <Dialog fullWidth open={isOpen} onClose={onClose}>
      <Box
        component="form"
        noValidate
        onSubmit={(e: any) => {
          e.preventDefault();
          formik.submitForm();
        }}
      >
        <DialogTitle textAlign="center" variant="h5" mt={2}>
          Registration
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
                {...formik.getFieldProps("email")}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
                {...formik.getFieldProps("nickname")}
                error={
                  formik.touched.nickname && Boolean(formik.errors.nickname)
                }
                helperText={formik.touched.nickname && formik.errors.nickname}
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
                {...formik.getFieldProps("password")}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
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
                <Button
                  type="submit"
                  fullWidth
                  disabled={formik.isSubmitting || !formik.isValid}
                  variant="outlined"
                >
                  Sign Up
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
      </Box>
    </Dialog>
  );
};

export default RegistrationDialog;
