import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import authApi from '../../api/authApi';

const Changepass = ({ open, onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
    const adminEmail = localStorage.getItem('email');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage('New Password and Confirm Password do not match.');
      return;
    }
    setErrorMessage(''); // Clear error message on successful validation
    try {
        const response = await authApi.changePassword({
          currentPassword: oldPassword,
          newPassword,
          email: adminEmail,
        });
        if (response.status === 200) {
          onClose(); // Assuming onClose is a prop function to close the dialog
        }
      } catch (error) {
        // Check if error.response and error.response.data exist
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.message);
        } else {
          // If the structure is different, log the error to see its structure and provide a generic message
          console.error(error);
          setErrorMessage('An unexpected error occurred while changing the password');
        }
      }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <TextField
          margin="dense"
          id="old-password"
          label="Old Password"
          type="password"
          fullWidth
          variant="outlined"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          margin="dense"
          id="new-password"
          label="New Password"
          type="password"
          fullWidth
          variant="outlined"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          margin="dense"
          id="confirm-password"
          label="Confirm Password"
          type="password"
          fullWidth
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errorMessage && (
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleChangePassword}>Change Password</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Changepass;