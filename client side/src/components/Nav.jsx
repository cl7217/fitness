import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import { orange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signOut } from '../features/user/userSlice'; // ודא שזה הנתיב הנכון אל הסלייס שלך

const pages = ['Purchase history', 'Active Rentals', 'Lessons', 'Packages', 'Sign In'];
const settings = ['Profile', 'Account', 'Dashboard', 'signOut'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const { name } = useSelector((state) => state.user.currentUser);

 
   const acronym = name ? name[0].toUpperCase() : null;


  // Custom theme for professional typography
  const theme = createTheme({
    typography: {
      fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
      h6: {
        fontWeight: 600,
        letterSpacing: '0.5px',
      },
      h5: {
        fontWeight: 600,
        letterSpacing: '0.5px',
      },
    },
    palette: {
      primary: {
        main: orange[800],
      },
    },
  });

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

  const handleNavClick = (page) => {
    handleCloseNavMenu();
    switch (page) {
      case 'Lessons':
        navigate('/lessons');
        break;
      case 'Packages':
        navigate('/packages');
        break;
      case 'Sign In':
        navigate('/sign-in');
        break;
      case 'Purchase history':
        navigate('/history-purchase');
        break;
      case 'Active Rentals':
        navigate('/rentals');
        break;
      default:
        break;
    }
  };
  const dispatch = useDispatch();

  const handleSettingClick = (setting) => {
    handleCloseUserMenu();

    switch (setting) {
      case 'signOut':
        dispatch(signOut());
        localStorage.removeItem('token'); // אם אתה משתמש בטוקן
        navigate('/sign-in');
        break;
      case 'Profile':
        navigate('/profile');
        break;
      case 'Dashboard':
        navigate('/dashboard');
        break;
      case 'Account':
        navigate('/account');
        break;
      default:
        break;
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="absolute"
        sx={{
          backgroundColor: 'linear-gradient(135deg, #f57c00 0%, #e65100 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
        elevation={0}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: '70px', px: 2 }}>
            {/* לוגו בצד שמאל */}
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                marginRight: 'auto',
              }}>
                <img src="/התעמ.png" alt="לוגו" style={{ width: '80%', height: '80%', objectFit: 'cover' }} />
              </div>
            </Box>

            {/* תפריטים במרכז - רק ב-md ומעלה */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleNavClick(page)}
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    fontWeight: 500,
                    fontSize: '15px',
                    textTransform: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-1px)'
                    }
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* אייקון התפריט במובייל */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, justifyContent: 'flex-start' }}>
              <IconButton
                size="large"
                aria-label="menu"
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
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleNavClick(page)}>
                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* פרופיל בצד ימין */}
            <Box sx={{ flexGrow: 0, ml: 2 }}>
              <Tooltip title="Open Settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0,
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.05)' }
                  }}
                >
                  {acronym ? (
                    <Avatar
                      sx={{
                        bgcolor: 'rgba(255, 152, 0, 0.9)', // צבע כתום-צהוב
                        width: 42,
                        height: 42,
                        fontWeight: 600,
                        fontSize: 16,
                        color: 'white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                      }}
                    >
                      {acronym}
                    </Avatar>
                  ) : (
                    <Avatar
                      sx={{
                        bgcolor: 'rgba(255, 152, 0, 0.9)',
                        width: 42,
                        height: 42,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        color: 'white',
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                  )}
                </IconButton>




              </Tooltip>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>

        </Container>
      </AppBar>
    </ThemeProvider >
  );
}
export default ResponsiveAppBar;
