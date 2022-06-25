import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <Grid
      container
      height="100vh"
      width="100vw"
      spacing={3}
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
      textAlign="center"
    >
      <Grid item>
        <Typography variant="h1">404</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h4">Oops! Page Not Found</Typography>
      </Grid>
      <Grid item>
        <Button component={Link} to="/">
          Go Home
        </Button>
      </Grid>
    </Grid>
  );
};

export default NotFoundPage;
