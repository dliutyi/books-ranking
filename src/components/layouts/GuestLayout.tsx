import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import LoginDialog from "../dialogs/LoginDialog";
import RegistrationDialog from "../dialogs/RegistrationDialog";
import HeaderLogo from "../../pictures/headerLogo.png";

const GuestLayout: React.FC = () => {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  return (
    <Grid container flexDirection="column" minHeight="100%">
      <Grid item flex="1 0 auto">
        <Grid
          container
          px={5}
          py={2}
          justifyContent="space-between"
          alignContent="center"
          alignItems="center"
        >
          <Grid item xs={8}>
            <img alt="BR | Books Ranking" height={40} src={HeaderLogo} />
          </Grid>
          <Grid item xs={4} container justifyContent="end" spacing={2}>
            <Grid item>
              <Button variant="outlined" onClick={() => setSignInOpen(true)}>
                Sign In
              </Button>
            </Grid>
            <Grid item>
              <Button variant="text" onClick={() => setSignUpOpen(true)}>
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Outlet />
      </Grid>
      <Grid item flexShrink={0} py={2}>
        <Typography textAlign="center" variant="body2">
          Books Ranking - © 2022
        </Typography>
      </Grid>
      <LoginDialog isOpen={isSignInOpen} onClose={() => setSignInOpen(false)} />
      <RegistrationDialog
        isOpen={isSignUpOpen}
        onClose={() => setSignUpOpen(false)}
      />
    </Grid>
  );
};

export default GuestLayout;
