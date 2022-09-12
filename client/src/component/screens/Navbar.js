import React, { useState, useContext } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  MenuItem,
  Menu,
  Button,
  Drawer,
  List,
  ListItem,
  Avatar,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { Link } from "react-router-dom";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom'
import { GlobalContext } from './../../GlobalContext';
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";

const pages = ["Menu", "Offers"];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const drawerWidth = 250;

function Navbar() {
  const context = useContext(GlobalContext);
  const data = useContext(GlobalContext);
  const [user] = data.authApi.userData;
  const [anchorNav, setAnchorNav] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [isLogged,setIsLogged] = context.authApi.isLogged;
  const [isAdmin,setIsAdmin] = context.authApi.isAdmin;
  const [isUser,setIsUser] = context.authApi.isUser;
  const [cart] = context.authApi.cart

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  /* login and signup handler*/
  const handleOpenMenu = (event) => {
    setAnchorNav(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorNav(null);
  };


  const logoutUser = async () => {
    if(window.confirm(`Are u sure to logout`)){
      await axios.get('/api/v1/auth/logout');
    localStorage.clear();
    if(isAdmin){
      setIsAdmin(false);
    }
    if(isUser){
      setIsUser(false);
    }
    setIsLogged(false);
    toast.success("logout success")
    navigate('/');
    window.location.reload();
    }else {
      toast.warning("logout terminated")
    }
  }

  
  /* common route */
  const commonRoute = () =>{
    return (
      <>
        <IconButton
          sx={{ fontSize: 25, mr: 0.5}}
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenMenu}
          color="inherit"
        >
          
          <Avatar src={user.image.url} sx={{ width: 45, height: 45 }} alt="P"/>
        </IconButton>       
        
        <Menu id="menu-appbar"
              anchorEl={anchorNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorNav)}
              onClose={handleCloseMenu} sx={{
                display: "block",
              }}
            >              
              <MenuItem onClick={handleCloseMenu}>
                <Typography component={Link} to={`/profile`} color="black" sx={{ textDecoration: "none" }}>
                  Profile
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>                
                {
                  isAdmin ? <NavLink style={{ textDecoration: "none",color:'black' }} to={`/admin/dashboard`}>Admin dashboard</NavLink> : null
                }

              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>                
                  {
                    isAdmin ? <NavLink style={{ textDecoration: "none",color:'black' }} to={`/admin/allOrders`}>All Orders</NavLink>
                              :
                              <NavLink style={{ textDecoration: "none",color:'black' }} to={`/orders`}>Orders</NavLink>
                  }
              </MenuItem>              
              <Divider/>
              <MenuItem onClick={handleCloseMenu}>
                <Typography onClick={logoutUser} color="black" sx={{ textDecoration: "none" }}>
                  Logout
                </Typography>
              </MenuItem>

        </Menu>
      </>
    )
  }

  return (
    
    <React.Fragment>
      <AppBar position="sticky" sx={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
        <Toolbar>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{flexGrow: 1,display: "flex",justifyContent: { xs: "center", md: "flex-start" }}}>
            <Typography component={Link} to={`/`} variant="h6" sx={{ textDecoration: "none", color: "white" }}>
            {isAdmin ? "Admin Dashboard" : "Spicy Burger"}
            </Typography>            
          </Box>

          <Box sx={{ display: { xs: "none", md:'flex'}, marginLeft:{md:-50, lg:-90}, flexGrow: 1 }}>
            <Button component={Link} to={`/Menu`} color="inherit" sx={{ m: 1 }}>
              Menu
            </Button>
            <Button component={Link} to={`/Offers`} color="inherit" sx={{ m: 1 }}>
              Offers
            </Button>  
          </Box>

          <Box>            
            {
                isLogged ? commonRoute() : (            
                  <Box display='flex'>
                  <MenuItem >
                      <Typography component={Link} to={`/login`} color="white" sx={{ textDecoration: "none" }}>
                        Login
                      </Typography>
                    </MenuItem>
                    <MenuItem >
                      <Typography component={Link} to={`/register`} color="white" sx={{ textDecoration: "none" }}>
                        Register
                      </Typography>
                    </MenuItem>
                    <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: "black" , borderRightWidth: 5 }}/>
                    </Box>
                )
              }
          </Box>

          <Box>            
            {
              isAdmin ? null : (
                <IconButton aria-label="cart" sx={{ fontSize: 15 }}>
              <NavLink to={`/product/cart`}>
              <Badge badgeContent={cart.length > 0 ? cart.length : null} color="secondary">
                <ShoppingCartIcon color="primary"/>
              </Badge>
              </NavLink>
            </IconButton>
              )
            }
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer component */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box"
          },
        }}
        variant="temporary"
        anchor="left"
        onClose={() => {
          handleDrawerClose();
        }}
        open={open}
      >
        <DrawerHeader sx={{backgroundColor: "rgba(0,0,0,0.4)"}}>
          <Typography component={Link} to={`/`} onClick={handleDrawerClose} variant="h6" sx={{ textDecoration: "none", flexGrow: 1, color:'white'}}>Spicy Burger</Typography>
          <IconButton onClick={handleDrawerClose}>
            <CloseSharpIcon color="warning"/>
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          {pages.map((link, index) => {
            return (
              <ListItem button component={Link} to={`/${link}`} key={index}>
                <ListItemText primary={link} onClick={handleDrawerClose} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </React.Fragment>
  );
}

export default Navbar;
