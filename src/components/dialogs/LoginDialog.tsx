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
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NotificationContext } from "../contexts/NotificationContext";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LoginDialog: React.FC<Props> = ({ isOpen, onClose }) => {
  const auth = getAuth();
  const { setNotification } = useContext(NotificationContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
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
                {...formik.getFieldProps("email")}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
      </Box>
    </Dialog>
  );
};

export default LoginDialog;
