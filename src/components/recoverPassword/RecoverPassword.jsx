import React, { useState } from "react";
import { Container, Button, TextField, Typography, Box, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import instance from '../../api/axios';

const RecoverPassword = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
        setIsLoading(true);
        await instance.post('/sendmail/forgot-password', data);
        navigate("/login");
        reset();
    } catch (error) {
        console.error(error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5, bgcolor: 'white', p: 10, borderRadius: 1 }}>
      <Typography component="h1" variant="h5" textAlign="center" gutterBottom>
        Recover Password
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          margin="normal"
          label="Full Name"
          type="text"
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ''}
          {...register("name", {
            required: "Full name is required",
            pattern: {
              value: /^[A-Z][a-z]+(?: [A-Z][a-z]+)?$/,
              message: "Full name must start with an uppercase letter"
            }
          })}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
        />
        {isLoading && <CircularProgress sx={{ display: 'block', margin: 'auto' }} />}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default RecoverPassword;
