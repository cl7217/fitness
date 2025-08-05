import "../../css/signIn.css"
import * as React from 'react';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useNavigate, Outlet } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { orange } from '@mui/material/colors';
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Link,
  IconButton,
  Typography,
  createTheme,
  ThemeProvider,
  Container,
} from '@mui/material';
import CircularProgress from '@mui/joy/CircularProgress'
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fetchSignIn } from "./userSlice";

// Define validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Setup react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const onSubmit = async () => {
    // console.log("formData",formData);
    try {
      const response = await dispatch(fetchSignIn(formData)).unwrap();
      // console.log("response",response);
      switch (response.status) {
        case 200:
          navigate('/packages');
          break;
        case 404:
          setLoginError("Invalid email or password.")
          break;
        default:
          
      }
    } catch (err) {
      setLoginError("Invalid email or password.");
    }
  };

  return (
    <Container className="signin-body">
      <div className="signin-wapper" style={{ height: '546px', width: '320px' }}>
        <ThemeProvider theme={createTheme({
          palette: {
            primary: {
              main: orange[800],
            },
            background: {
              default: 'transparent',
              paper: 'transparent',
            },
            text: {
              primary: orange[800],
              secondary: 'rgb(0, 0, 0)',
            },
          },
          typography: {
            fontFamily: 'sans-serif',
          },
        })}>
          <img
            src="/התעמ.png"
            alt="לוגו"
            style={{
              width: '156px',
              height: '104px',
              objectFit: 'cover',
              marginBottom: '10px',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          />
          <h2 className="signin-h2" style={{ marginBottom: 20, fontFamily: 'sans-serif' }}>Sign In</h2>
          <Typography align="center" sx={{ color: 'black', marginBottom: 2 }}>
            Welcome user! Please enter your details.
          </Typography>
          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* email */}
            <TextField
              id="email"
              label="Email"
              name="email"
              type="text"
              size="small"

              fullWidth
              variant="outlined"
              {...register("email")}
              error={false}
              helperText={errors.email ? errors.email.message : ""}
              onChange={handleChange}
            />
            {/* password */}
            <FormControl sx={{ my: 2 }} fullWidth variant="outlined" error={false}>
              <InputLabel size="small" htmlFor="outlined-adornment-password"> Password </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                size="small"
                label="Password"
                {...register("password")}
                onChange={handleChange}
                error={!!errors.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? (<VisibilityOff fontSize="inherit" />) : (<Visibility fontSize="inherit" />)}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <p>{errors.password ? errors.password.message : ""}</p>
            </FormControl>
            {loginError && (
              <Typography
                variant="body2"
                color="error"
                align="center"
                sx={{ mt: 1 }}
              >
                {loginError}
              </Typography>
            )}
            {/* sign in */}
            <Button
              className="signin-btn"
              type="submit"
              variant="outlined"
              color="secondary"
              size="small"
              disableElevation
              sx={{
                my: 3,
                backgroundColor: orange[800],
                color: 'white',
              }}
              fullWidth
            > Sign In </Button>
            {/* link to signUp */}
            <Typography align="center" sx={{ paddingBottom: 8 }}>
              Don't have an account?
              <br />
              <Link
                href="/sign-up"
                style={{ color: orange[800] }}
              >
                Create account
              </Link>
            </Typography>

          </form>
        </ThemeProvider>
      </div>
    </Container>
  )
}

export default SignIn;