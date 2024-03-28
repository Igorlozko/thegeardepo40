import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Lock, Menu } from '@mui/icons-material';
import { useValue } from '../context/ContextProvider';
import UserIcons from './user/UserIcons';
import FilterSearch from './filtersearch/FilterSearch';
import Logo2 from './Logo2.png'; 
import { Link } from 'react-router-dom';
import TuneIcon from '@mui/icons-material/Tune';
import LoginIcon from '@mui/icons-material/Login';

const NavBar = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none', }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <IconButton size="small" color="primary" onClick={()=>setIsOpen(true)}>
              <TuneIcon sx={{mr:1}} /> Filters
            </IconButton>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Link to="/">
                <img src={Logo2} alt="Logo2" style={{ height: 50 }} />
              </Link>
            </Box>
            {!currentUser ? (
              <Button
                color="primary"
                startIcon={<LoginIcon />}
                onClick={() => dispatch({ type: 'OPEN_LOGIN' })}
                sx={{ ml: 'auto' }} 
              >
                Login
              </Button>
            ) : (
              <UserIcons />
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <FilterSearch {...{isOpen, setIsOpen}}/>
    </>
  );
};

export default NavBar;
