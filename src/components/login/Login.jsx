import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container, IconButton, InputAdornment } from '@mui/material';
import { useAuth } from '../../context/UserContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import LoginGoogle from './LoginGoogle';

function Login() {
  const { signin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    await signin(data);
    reset();
  };

  return (
    <Container component="main" sx={{ mt: 5, bgcolor: 'white', p: 10, borderRadius: 1 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Typography variant="body2" align="left" sx={{ mt: 2 }}>
            Forgot your password?{' '}
            <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
              <span style={{ color: 'blue' }}>Click here</span>
            </Link>
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Box sx={{ flexGrow: 1, height: '1px', bgcolor: 'grey.500' }} />
            <Typography sx={{ mx: 2 }}>o</Typography>
            <Box sx={{ flexGrow: 1, height: '1px', bgcolor: 'grey.500' }} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <LoginGoogle />
          </Box>
          <Typography variant="body2" sx={{ mt: 3}}>
            Don't have an account yet?{' '}
            <Link to="/register" style={{ textDecoration: 'none', color: 'blue' }}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
