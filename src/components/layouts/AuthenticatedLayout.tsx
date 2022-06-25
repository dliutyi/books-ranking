import { Button, Grid, Typography } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { Outlet } from "react-router-dom";
import HeaderLogo from "../../pictures/headerLogo.png";

const AuthenticatedLayout: React.FC = () => {
  const auth = getAuth();

  const handleLogOut = async () => {
    await signOut(auth);
  };

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
          <Grid item>
            <img alt="BR | Books Ranking" height={40} src={HeaderLogo} />
          </Grid>
          {/* <Grid item>
            <Typography variant="h6">
              {auth.currentUser?.displayName ?? auth.currentUser?.email ?? ""}
            </Typography>
          </Grid> */}
          <Grid item>
            <Button variant="outlined" onClick={handleLogOut}>
              Log out
            </Button>
          </Grid>
        </Grid>
        <Outlet />
      </Grid>
      <Grid item flexShrink={0} py={2}>
        <Typography textAlign="center" variant="body2">
          Books Ranking - © 2022
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AuthenticatedLayout;
