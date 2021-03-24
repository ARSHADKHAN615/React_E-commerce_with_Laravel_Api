import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "./Header.css";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink, useHistory } from 'react-router-dom';


import { AppBar, withStyles, MenuItem, ListItemText, Menu, ListItemIcon, Button } from '@material-ui/core';
import { AccountCircle, ExitToApp } from '@material-ui/icons';


const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));




function Header() {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const username = JSON.parse(localStorage.getItem("user-info"));
    // console.log(username);
    function logout() {
        localStorage.clear();
        history.push("/login")
    }

    return (
        <>
            <AppBar position="static">
                <Navbar collapseOnSelect expand="lg" bg="primary" >
                    <Navbar.Brand><NavLink to="/">React-Bootstrap</NavLink></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-md-auto w-50 justify-content-lg-between align-items-md-center">

                            {
                                localStorage.getItem("user-info") ?
                                    <>
                                        <NavLink exact activeClassName="active" to="/add">Add Product</NavLink>
                                        <NavLink to="/update">Update Product</NavLink>
                                    </> :
                                    <>
                                        <NavLink to="/login">Login</NavLink>
                                        <NavLink to="/register">Register</NavLink>
                                    </>

                            }

                            <Button
                                onClick={handleClick}
                                color="inherit"
                                size="large"
                                variant="outlined"
                                startIcon={<AccountCircle />}
                            >
                                {
                                    username ? username.name : "user"
                                }
                            </Button>
                            <StyledMenu
                                id="customized-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <StyledMenuItem onClick={() => logout()}>
                                    <ListItemIcon>
                                        <ExitToApp fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </StyledMenuItem>
                            </StyledMenu>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </AppBar>










            {/* <AppBar position="static">
                <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-md-auto w-50 justify-content-lg-between">
                            <li className="nav-item">
                                <NavLink exact activeClassName="active" to="/add">Add Product</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/update">Update Product</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/register">Register</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </AppBar> */}
        </>
    )
}

export default Header
