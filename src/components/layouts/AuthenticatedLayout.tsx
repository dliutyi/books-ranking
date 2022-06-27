import {
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  Typography,
  ListItemText,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Avatar,
  styled,
} from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import HeaderLogo from "../../pictures/headerLogo.png";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountCircle from "@mui/icons-material/AccountCircle";

const ListItemWidthPadding = styled(ListItemText)(({ theme }) => ({
  paddingRight: "75px",
}));

const AuthenticatedLayout: React.FC = () => {
  const [unfoldMenu, setUnfoldMenu] = useState(false);
  const auth = getAuth();

  const handleLogOut = async () => {
    await signOut(auth);
  };

  const MenuItems = [
    {
      id: 1,
      title: "Home",
      href: "/",
      action: null,
      icon: HomeRoundedIcon,
    },
    {
      id: 2,
      title: "Books",
      href: "/books",
      action: null,
      icon: LibraryBooksRoundedIcon,
    },
    {
      id: 3,
      title: "Account",
      href: "/account",
      action: null,
      icon: SettingsApplicationsRoundedIcon,
    },
    {
      id: 4,
      title: "Log out",
      href: null,
      action: handleLogOut,
      icon: LogoutRoundedIcon,
    },
  ];

  const MenuDividers = [0, 2, 4];

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
            <IconButton size="large" onClick={() => setUnfoldMenu(true)}>
              <MenuIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Outlet />
      </Grid>
      <Grid item flexShrink={0} py={2}>
        <Typography textAlign="center" variant="body2">
          Books Ranking - © 2022
        </Typography>
      </Grid>
      <SwipeableDrawer
        anchor="right"
        open={unfoldMenu}
        onClose={() => setUnfoldMenu(false)}
        onOpen={() => setUnfoldMenu(true)}
        elevation={5}
      >
        <Grid px={3} py={5}>
          <Grid
            container
            flexDirection="column"
            alignItems="center"
            spacing={1}
            mb={3}
          >
            <Grid item>
              <Avatar>
                <AccountCircle />
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                {auth.currentUser?.displayName ?? auth.currentUser?.email ?? ""}
              </Typography>
            </Grid>
          </Grid>
          {MenuDividers.map((sliceFrom, index) => (
            <React.Fragment key={index}>
              <List>
                {MenuItems.slice(sliceFrom, MenuDividers[index + 1]).map(
                  (item) => (
                    <ListItem key={item.id} disablePadding>
                      {item.href ? (
                        <ListItemButton component={Link} to={item.href}>
                          <ListItemIcon>
                            <item.icon />
                          </ListItemIcon>
                          <ListItemWidthPadding primary={item.title} />
                        </ListItemButton>
                      ) : (
                        <ListItemButton onClick={item.action!}>
                          <ListItemIcon>
                            <item.icon />
                          </ListItemIcon>
                          <ListItemWidthPadding primary={item.title} />
                        </ListItemButton>
                      )}
                    </ListItem>
                  )
                )}
              </List>
              {index < MenuDividers.length - 2 && <Divider />}
            </React.Fragment>
          ))}
        </Grid>
      </SwipeableDrawer>
    </Grid>
  );
};

export default AuthenticatedLayout;
