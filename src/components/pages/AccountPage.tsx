import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Avatar,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { AccountCircle } from "@mui/icons-material";
import { getAuth } from "firebase/auth";

const validationSchema = yup.object({
  password: yup.string().required("Password is required"),
  newPassword: yup
    .string()
    .min(6, "Password should be of minimum 6 characters")
    .required("New password is required"),
});

const AccountPage: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const auth = getAuth();

  const formik = useFormik({
    isInitialValid: false,
    initialValues: {
      password: "",
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {},
  });

  useEffect(() => {
    setNickname(auth.currentUser!.displayName!);
    setEmail(auth.currentUser!.email!);
  }, [auth.currentUser]);

  return (
    <Grid container mt={5}>
      <Grid item xs={3} />
      <Grid item xs={6} container spacing={7}>
        <Grid
          container
          item
          xs={4}
          spacing={1}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Grid item>
            <Avatar variant="rounded" sx={{ height: "100px", width: "100px" }}>
              <AccountCircle fontSize="large" />
            </Avatar>
          </Grid>
          <Grid item>
            <Button>Change avatar</Button>
          </Grid>
        </Grid>
        <Grid
          component="form"
          noValidate
          item
          container
          xs={8}
          flexDirection="column"
          spacing={5}
        >
          <Grid item>
            <Typography variant="h4" textAlign="center">
              Profile
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              disabled
              fullWidth
              id="nickname"
              type="text"
              label="Nickname"
              variant="outlined"
              value={nickname}
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
              disabled
              fullWidth
              id="email"
              type="email"
              label="Email"
              variant="outlined"
              value={email}
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
              fullWidth
              id="password"
              type="password"
              label="Password"
              variant="outlined"
              placeholder="************"
              {...formik.getFieldProps("password")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              id="newPassword"
              type="password"
              label="New password"
              variant="outlined"
              {...formik.getFieldProps("newPassword")}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid container item spacing={3}>
            <Grid item>
              <Button
                type="submit"
                variant="outlined"
                disabled={formik.isSubmitting || !formik.isValid}
              >
                Update password
              </Button>
            </Grid>
            {(formik.getFieldProps("password").value ||
              formik.getFieldProps("newPassword").value ||
              Boolean(formik.errors.newPassword)) && (
              <Grid item>
                <Button type="reset" onClick={() => formik.resetForm()}>
                  Cancel
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AccountPage;
