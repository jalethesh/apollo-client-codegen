import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Drawer from '@mui/material/Drawer';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import ListItemLink from './ListItemLink';
import UpComponent from '../../components/UpComponents';
import RoleController from './RoleController';
import { currencyFormatter } from '../../helpers/currencyFormatter';
import { useGetUserQuery } from '../../types/graphql';
import axios from 'axios';
import client from '../../graphql';
import { userDataVar, userEffectiveRoleVar } from '../../graphql';
import { GET_REAL_ITEM_MEDIAS, GET_USER } from '../../graphql/queries';
import { Link } from 'react-router-dom';

const drawerWidth = 270;

interface NavbarProps {
  children: React.ReactNode;
  changeTheme: () => void;
}

interface RoleProps {
  [securityRole: string]: string;
}

const EffectiveRole: RoleProps = {
  undefined: 'nologin',
  guest: 'owner',
  administrator: 'admin',
};

export default function Navbar(props: NavbarProps) {
  const { children, changeTheme } = props;

  const {
    data: dataUser,
    loading: loadingNames,
    error: errorNames,
  } = useGetUserQuery();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const [state, setState] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const logout_endpoint = process.env.REACT_APP_JUZAM2_URI + `/users/logout`;

  const handleLogout = () => {
    axios
      .get(logout_endpoint, { withCredentials: true })
      .then(async (res: any) => {
        // then print response status
        await client.refetchQueries({
          include: ['all'],
        });
        // @ts-ignore
        window.location = process.env.REACT_APP_URI;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState(open);
    };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const list = (
    <List onClick={toggleDrawer(!state)} onKeyDown={toggleDrawer(!state)}>
      <Divider sx={{ mt: '20px' }} />
      <ListItemLink to="/" primary="Home" icon={<HomeIcon />} />
      <Divider />
      <ListItemLink to="/market" primary="Buy" icon={<ShoppingCartIcon />} />
      <Divider />
      <ListItemLink to="/collect" primary="Collect" icon={<GroupWorkIcon />} />
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <MonetizationOnIcon />
        </ListItemIcon>
        <ListItemText>Sell</ListItemText>
      </ListItem>
      <Divider />
      <ListItemLink
        to={`/user/${dataUser?.user?.databaseId}`}
        primary="Profile"
        icon={<ContactMailIcon />}
      />
      <Divider />
      <ListItemLink
        to="/trade"
        primary="Transactions"
        icon={<AdminPanelSettingsIcon />}
      />
    </List>
  );

  // user information component on navbar
  const creditText = dataUser?.user?.username
    ? dataUser?.user?.username +
      "'s credit: " +
      currencyFormatter({ value: dataUser?.user?.credit as number })
    : '';

  useEffect(() => {
    userDataVar(dataUser?.user);
    userEffectiveRoleVar(EffectiveRole[dataUser?.user?.securityRole as string]);
  }, [dataUser]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          bgcolor: 'purple',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            sx={{ mr: 2 }}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(!state)}
          >
            {state ? <CloseIcon /> : <MenuIcon />}
          </IconButton>

          <img
            width="40"
            height="40"
            src={'/crystal-ball_1f52e.png'}
            alt={'mystical ball'}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link to="/">Purplemana</Link>
          </Typography>
          {dataUser?.user?.securityRole === 'administrator' && (
            <RoleController />
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Typography>{creditText}</Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={'left'}
        open={state}
        onClose={toggleDrawer(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: { xs: 180, sm: drawerWidth },
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>{list}</Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          bgcolor: 'background.default',
          p: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <Toolbar id="back-to-top-anchor" />
        {children}
        <UpComponent />
      </Box>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
