import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../images/logo/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../actions/auth';
import { useState } from 'react';
import AuthForm from '../AuthForm/AuthForm'
import { Link, useNavigate } from 'react-router-dom';
import useStyles from './styles'
import { ROLE } from '../../constants/roles';

const settings = [{ name: 'Profile', link: '/user/profile' }, { name: 'Admin', link: '/admin' }, { name: 'Logout', action: 'logout' }];
const pages = [{ name: 'Home', link: '/' }, { name: 'Search', link: '/search' }]
const pagesUser = [{ name: 'My Pets', link: '/user/mypets' }]

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { currentUserAuth } = useSelector(state => state.userStatus)
    const navigate = useNavigate()

    const classes = useStyles()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const dispatch = useDispatch()

    const logout = () => {
        handleCloseUserMenu()
        handleCloseNavMenu();
        dispatch(logOut(setOpenModal, navigate))
    }

    const [sidePokeball, setSidePokeball] = useState(true)
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);



    return (
        <>
            <AppBar position="static" className={classes.appBar}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            <img onMouseLeave={() => (setSidePokeball((prev) => !prev))} className={sidePokeball ? classes.imageRight : classes.imageLeft} src={logo} alt="PokeHouse" height="80" width="80" />

                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    color: "#000",
                                    display: { xs: 'flex', md: 'none' }
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link}
                                        to={page.link}>
                                        <Typography className={classes.linkXs}>{page.name}</Typography>
                                    </MenuItem>
                                ))}

                                {currentUserAuth && pagesUser.map((page) => (
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link}
                                        to={page.link}>
                                        <Typography className={classes.linkXs}>{page.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            <img src={logo} alt="PokeHouse" height="80" width="80" />
                        </Typography>
                        <Box sx={{
                            flexGrow: 1, display: { xs: 'none', md: 'flex' }
                        }}>
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.name}
                                    onClick={handleCloseNavMenu}
                                    sx={{ display: 'block' }}
                                    component={Link}
                                    to={page.link}
                                >
                                    <Typography className={classes.linkMd}>{page.name}</Typography>
                                </MenuItem>
                            ))}
                            {currentUserAuth && pagesUser.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link} to={page.link}>
                                    <Typography className={classes.linkMd}>{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title={currentUserAuth ? "Open settings" : "Sign In"}>
                                {currentUserAuth ? (
                                    <div className={classes.settings}>
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt={currentUserAuth.firstName} src={currentUserAuth.picture} />
                                        </IconButton>
                                    </div>
                                ) : (
                                    <Button sx={{ backgroundColor: "#fff", color: "#000" }} variant="contained" onClick={handleOpenModal}> Sign In </Button>
                                )}
                            </Tooltip>
                            {currentUserAuth && <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => {
                                    if (setting.name === 'Admin') {
                                        if (currentUserAuth?.role === ROLE.ADMIN) {
                                            return (
                                                <MenuItem key={setting.name} onClick={handleCloseNavMenu} >
                                                    {setting.link && <Button className={classes.linkMd} component={Link} to={setting.link}  >{setting.name} </Button>}
                                                    {setting.action && <Button className={classes.linkMd} onClick={setting.action}>{setting.name}</Button>}
                                                </MenuItem>
                                            )
                                        }
                                    } else {
                                        return (
                                            <MenuItem key={setting.name} onClick={handleCloseNavMenu} >
                                                {setting.link && <Button className={classes.linkMd} component={Link} to={setting.link}  >{setting.name} </Button>}
                                                {setting.action === 'logout' && <Button className={classes.linkMd} onClick={logout}>{setting.name}</Button>}
                                            </MenuItem>
                                        )
                                    }
                                })}
                            </Menu>}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {openModal && <AuthForm openModal={openModal} setOpenModal={setOpenModal} />}
        </>
    );
};
export default Header;
