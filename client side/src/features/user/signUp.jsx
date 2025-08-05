import '../../css/signUp.css';
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useNavigate, Outlet } from "react-router-dom";
import {
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    TextField,
    InputAdornment,
    Typography,
    Link,
    IconButton,
    createTheme,
    Select,
    MenuItem,
    Container,

} from '@mui/material';
import CircularProgress from '@mui/joy/CircularProgress'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import { orange } from '@mui/material/colors';
import { ThemeProvider } from '@emotion/react';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

import { useDispatch } from 'react-redux';
import { fetchSignUp } from './userSlice';
import { fetchHealthFunds } from './healthFundSlice';

const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    phone: yup.string().matches(/^0\d{8,9}$/, "Phone must start with 0 and have 9 or 10 digits in total"),
    name: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])/, 'Name must be just letters and starts with a capital letter'),
    healthFundId: yup.string().required("Health fund must be required")
});

const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { control, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            healthFundId: "", // ערך ברירת מחדל
        },
        resolver: yupResolver(schema),
    });

    const [healthFunds, setHealthFunds] = useState([{ id: 1, name: 'Maccabi' }, { id: 2, name: 'Klalit' }, { id: 3, name: 'Meuchedet' }, { id: 4, name: "Leumit" }]); // Define healthFunds state
    const theme = createTheme({
        palette: {
            primary: { main: orange[800] },
            background: {
                default: 'transparent',
                paper: 'white',
            },
            text: {
                primary: orange[800],
                secondary: 'rgb(0, 0, 0)',
                border: '2px'
            },
        },
        typography: { fontFamily: 'sans-serif' },
    });

    const [showPassword, setShowPassword] = React.useState(false);
    const [flag, setFlag] = useState(false)
    useEffect(() => {
        const fetchHealthFunds = async () => {
            try {
                const response = await fetch('https://localhost:7104/api/HealthFund/get'); // כתובת אמיתית של ה-API
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setHealthFunds(data);
            } catch (error) {
                console.error('Error fetching health funds:', error);
            }
        };
        fetchHealthFunds();
    }, []);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => { event.preventDefault(); };

    const onSubmit = async (event) => {

        try {
            const selectedFund = healthFunds.find(f => f.name === event.healthFundId);
            const fundID = selectedFund.code
            const updatedEvent = {
                ...event,
                healthFundId: fundID, // שמור את ה-id ולא את השם
            };
            console.log("updatedEvent",updatedEvent);
            
            const response = await dispatch(fetchSignUp(updatedEvent)).unwrap()


            switch (response.status) {
                case 201:
                    navigate('/packages')
                    break;
                case 400:

                    setFlag(true)

                    break;
            }
        } catch (err) {
            console.log(err);
            navigate('/packages')
        }
    };

    return (
        <>
            <Container className='signin-body' style={{ paddingTop: '45px', paddingBottom: '45px' }}>
                <div className="signin-wapper" style={{ height: '636px', width: '340px' }}>

                    <ThemeProvider theme={theme}>
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                            <h2 style={{ marginBottom: 8 }}>Sign Up</h2>
                            <Typography align="center" sx={{ color: 'black', marginBottom: 2 }}>
                                Welcome to our GYM! <br /> Please enter your details.
                            </Typography>
                            <TextField
                                id="name"
                                label="Name"
                                name="name"
                                type="text"
                                size="small"
                                required
                                fullWidth
                                variant="outlined"

                                error={false}
                                sx={{ marginTop: 0.5 }}
                                {...register("name")}
                                helperText={errors.name ? errors.name.message : ""}

                            />
                            <TextField
                                id="email"
                                label="Email"
                                name="email"
                                type="text"
                                size="small"
                                required
                                fullWidth
                                {...register("email")}
                                error={false}
                                helperText={errors.email ? errors.email.message : ""}
                                variant="outlined"
                                sx={{ marginTop: 2 }}
                            />
                            <TextField
                                label="Phone"
                                name="phone"
                                type="text"
                                size="small"
                                required
                                fullWidth
                                variant="outlined"
                                sx={{ marginTop: 2 }}
                                error={false}
                                {...register("phone")}
                                helperText={errors.phone ? errors.phone.message : ""}
                            />
                            <FormControl fullWidth sx={{ marginTop: 2 }}>
                                <InputLabel id="HealthInsurance">Health Fund</InputLabel>
                                <Controller
                                    name="healthFundId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="healthInsurance"
                                            id="healthInsurance"
                                            label="health Fund"
                                            error={!!errors.healthFundId}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {healthFunds.map((fund,index) => (
                                                <MenuItem key={`${fund.id}-${index}`} value={fund.name}>
                                                    {fund.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                {errors.healthFundId && (
                                    <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.healthFundId.message}</p>
                                )}
                            </FormControl>
                            <FormControl sx={{ my: 2 }} fullWidth variant="outlined" required>
                                <InputLabel size="small" htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    {...register("password")}
                                    error={!!errors.password}
                                    size="small"

                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}

                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                size="small">
                                                {showPassword ? (<VisibilityOff fontSize="inherit" />) : (<Visibility fontSize="inherit" />)}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"

                                />
                                <p>{errors.password ? errors.password.message : ""}</p>
                            </FormControl>

                            <Button className="signin-btn" type="submit" variant="outlined" size="small"
                                disableElevation fullWidth sx={[{ my: 2 }, { color: 'white', backgroundColor: orange[800] }]}
                            >Sign Up
                            </Button>

                            <span style={{ marginRight: 8, paddingBottom: 8 }}>Have already an account?</span>
                            <Link
                                href="/Sign-in"
                                style={{ color: orange[800] }}>
                                Sign In
                            </Link>
                            <Outlet />
                        </form>
                    </ThemeProvider >

                    {flag &&
                        <Typography sx={[{ backgroundColor: orange[800] }, { borderRadius: "5px" }, { color: 'white' }, { my: 1 }, { fontSize: '17px' }]}>
                            A user with these details already exists.
                        </Typography>
                    }


                </div>
            </Container>
        </>

    );
};

export default SignUp;



