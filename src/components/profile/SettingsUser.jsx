import React, { useState } from "react";
import { Container, Button, TextField, Typography, Box, CircularProgress, IconButton, InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import instance from '../../api/axios'

const SettingsUser = () => {
  const { user, logout ,updatePassword, errors: updateErrors } = useAuth();
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmitPassword = handleSubmit(async (data) => {
    setIsLoading(true);
    await updatePassword(data);
    setIsLoading(false);
    reset();
  });

  const handleDeleteAccount = async () => {
    try {
      await instance.delete(`/user/delete/${user._id}`);
      logout();
      window.location.reload();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5, bgcolor: 'white', p: 10, borderRadius: 1 }}>
      <Typography component="h1" variant="h5" textAlign="center" gutterBottom>
        Update Password
      </Typography>
      <Box component="form" onSubmit={onSubmitPassword} noValidate>
        {updateErrors && updateErrors.length > 0 && (
          <Typography variant="body1" color="error" align="center" sx={{ mb: 2 }}>
            {updateErrors}
          </Typography>
        )}
        <TextField
          fullWidth
          margin="normal"
          label="Current Password"
          type={showPassword ? "text" : "password"}
          error={!!errors.currentPassword}
          helperText={errors.currentPassword ? errors.currentPassword.message : ''}
          {...register("currentPassword", {
            required: "Current password is required",
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle current password visibility"
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="New Password"
          type={showPassword ? "text" : "password"}
          error={!!errors.newPassword}
          helperText={errors.newPassword ? errors.newPassword.message : ''}
          {...register("newPassword", {
            required: "New password is required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
              message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character. It must be between 6 and 20 characters.",
            },
            validate: (value) =>
              value !== watch("currentPassword") || "New password must be different from current password",
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle new password visibility"
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirm New Password"
          type={showPassword ? "text" : "password"}
          error={!!errors.confirmNewPassword}
          helperText={errors.confirmNewPassword ? errors.confirmNewPassword.message : ''}
          {...register("confirmNewPassword", {
            required: "Please confirm new password",
            validate: (value) =>
              value === watch("newPassword") || "Passwords do not match",
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm new password visibility"
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        {isLoading && <CircularProgress sx={{ display: 'block', margin: 'auto', my: 2 }} />}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Update Password
        </Button>
      </Box>

      {user.role === "client" && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" align="center" gutterBottom>
            Do you want to delete your account?
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteAccount}
            fullWidth
          >
            Delete Account
          </Button>
        </Box>
      )}

      <Typography variant="body2" align="left" sx={{ mt: 2 }}>
        Forgot your password?{" "}
        <Link to="/forgot-password" style={{ textDecoration: "none" }}>
          <span style={{ color: "blue" }}>Click here</span>
        </Link>
      </Typography>
    </Container>
  );
};

export default SettingsUser;
