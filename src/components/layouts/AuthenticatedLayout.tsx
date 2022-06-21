import { Grid } from '@mui/material';
import React from 'react';


interface Props {
    children: JSX.Element;
  };

const AuthenticatedLayout : React.FC<Props> = ({children}) => {
    return <Grid>{children}</Grid>
}

export default AuthenticatedLayout;