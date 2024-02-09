import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FaGoogle } from 'react-icons/fa'; // Import the Google icon
// No need to import CSS file if it's not used

const clientId = '862857909482-1gu20u6oqbeohcdesj3g0np071hshlir.apps.googleusercontent.com';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: theme.spacing(2),
    },
    description: {
        fontSize: '1.2rem',
        marginBottom: theme.spacing(4),
    },
    googleLoginButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(1.5, 3),
        fontSize: '1.2rem',
        borderRadius: '5px',
        backgroundColor: '#4285f4',
        color: '#fff',
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: '#357ae8',
        },
    },
    googleIcon: {
        marginRight: theme.spacing(1),
    },
}));

function Login() {
    const classes = useStyles();
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);
            // Send the access token to your backend
            try {
                const response = await fetch('http://localhost:8000/api/google/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        accessToken: tokenResponse.access_token
                    })
                });

                if (response.status === 200) {
                    // Redirect to weather page upon successful authentication
                    navigate('/weather');
                } else {
                    throw new Error('Failed to authenticate with Google');
                }
            } catch (error) {
                console.error('Error authenticating with Google:', error);
            }
        },
    });

    return (
        <div className={classes.root}>
            <Typography variant="h2" className={classes.heading}>
                Welcome to Our App
            </Typography>
            <Typography variant="body1" className={classes.description}>
                Please log in with your Google account to continue.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                className={classes.googleLoginButton}
                onClick={googleLogin}
                startIcon={<FaGoogle className={classes.googleIcon} />}
            >
                Login with Google
            </Button>
        </div>
    );
}

export default Login;
