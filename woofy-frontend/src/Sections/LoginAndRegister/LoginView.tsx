import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from "../../provider/AuthProvider";
import { useRouter } from "../../routes/hooks";
import woofyLogo from '/assets/logo.png';
import backgroundImage from '/assets/Sign-in-backgroung.jpg';

export default function SignInComponent() {
    const theme = createTheme();
    const router = useRouter();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const rememberMe = (document.getElementById('remember') as HTMLInputElement).checked; // Get the value of the "Remember me" checkbox
        login({
            email: data.get('email') as string,
            password: data.get('password') as string,
        }, rememberMe);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 3,
                maxWidth: '100%',
                overflow: 'hidden',
            }}
        >
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
                    <CssBaseline />
                    <Box
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: { xs: 2, sm: 3, md: 4 },
                            borderRadius: 2,
                            maxWidth: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.6)', // Added background for better readability
                            boxShadow: 3, // Added shadow for better readability
                        }}
                    >
                        <Avatar src={woofyLogo} sx={{ width: 80, height: 80, mt: 2 }} />
                        <Typography
                            component="h1"
                            sx={{
                                fontSize: { xs: '28px', sm: '32px', md: '36px' },
                                lineHeight: '120%',
                                fontFamily: 'Inter',
                                fontWeight: 'bold',
                                color: 'black',
                                textAlign: 'center',
                                mt: 2,
                                mb: 2,
                            }}
                        >
                            Sign in
                        </Typography>
                        <Typography
                            component="h2"
                            sx={{
                                fontSize: { xs: '14px', sm: '16px' },
                                lineHeight: '120%',
                                fontFamily: 'Inter',
                                fontWeight: 'regular',
                                color: 'black',
                                textAlign: 'center',
                                mb: 2,
                            }}
                        >
                            Welcome back! Sign in here.
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        autoComplete="current-password"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleClickShowPassword}>
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <FormControlLabel
                                control={<Checkbox id="remember" value="remember" color="primary" />}
                                label="Remember me"
                                sx={{ mt: 2 }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 2.5,
                                    mb: 3,
                                    borderRadius: '30px',
                                    backgroundColor: '#006CBF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    py: { xs: 1, sm: 1.5, md: 2 },
                                    px: { xs: 2, sm: 3, md: 4 },
                                    fontSize: { xs: '14px', sm: '16px', md: '18px' },
                                    fontFamily: 'Inter',
                                    fontWeight: '600',
                                    color: 'white',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: 'cornflowerblue',
                                    },
                                }}
                            >
                                Sign In
                            </Button>
                            <Grid container justifyContent="center" sx={{ mt: 2 }}>
                                <Grid item>
                                    <Typography
                                        component="span"
                                        sx={{
                                            fontFamily: 'Inter',
                                            fontSize: { xs: '14px', sm: '16px' },
                                            fontWeight: '500',
                                            color: 'black',
                                            textDecoration: 'none',
                                            display: 'inline',
                                        }}
                                    >
                                        Don't have an account?
                                    </Typography>
                                    {' '}
                                    <Link
                                        href="/sign-up"
                                        variant="body2"
                                        sx={{
                                            fontFamily: 'Inter',
                                            fontSize: { xs: '14px', sm: '16px' },
                                            fontWeight: 'bold',
                                            color: '#006CBF',
                                            textDecoration: 'none',
                                            display: 'inline',
                                            ml: 1,
                                        }}
                                    >
                                        Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </Box>
    );
}
