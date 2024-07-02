import React, { useState } from 'react';
import { TextField, Button, FormControl, Typography } from '@mui/material';
import couponApi from '../../api/couponApi';

const CreateCoupon = () => {
  const [code, setCode] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateCoupon = async () => {
    try {
        const data = {
            code: code,
            discountPrice: discountPrice,
            expirationDate : expirationDate,
        };
        const response = await couponApi.createCoupon(data);
        setCode('');
        setDiscountPrice('');
        setExpirationDate('');
        setMessage(`Coupon created successfully: ${response.data.code}`);
    } catch (error) {
        console.error(error);
      setMessage(error.response?.data?.message || 'An error occurred.');
    }
  };

  const handleExpirationDateChange = (e) => {
    const value = e.target.value;
    // Validate that the date has a 4-digit year
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(value);
    if (isValidDate || value === '') {
      setExpirationDate(value);
    }
  };

  return (
    <div className="create-coupon">
      <Typography variant="h5" gutterBottom>Create New Coupon</Typography>
      <FormControl sx={{ width: "100%" }}>
        <TextField
          name="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          label="Coupon Code"
          variant="outlined"
          size="small"
          sx={{ marginBottom: '8px' }}
        />
        <TextField
          name="discountPrice"
          value={discountPrice}
          onChange={(e) => setDiscountPrice(e.target.value)}
          label="Discount Price"
          variant="outlined"
          size="small"
          type="number"
          sx={{ marginBottom: '8px' }}
        />
        <TextField
          name="expirationDate"
          value={expirationDate}
          onChange={handleExpirationDateChange}
          label="Expiration Date"
          variant="outlined"
          size="small"
          type="date"
          InputLabelProps={{ shrink: true }}
          inputProps={{ maxLength: 10 }}
          sx={{ marginBottom: '8px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateCoupon}
        >
          Create Coupon
        </Button>
        {message && <Typography color="error" sx={{ marginTop: '8px' }}>{message}</Typography>}
      </FormControl>
    </div>
  );
};

export default CreateCoupon;
