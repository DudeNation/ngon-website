import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Paper, IconButton } from '@mui/material';
import couponApi from '../../api/couponApi';
import DeleteIcon from '@mui/icons-material/Delete';

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await couponApi.getAllCoupon();
        setCoupons(response.data);
      } catch (err) {
        setError('Failed to fetch coupons.');
      }
    };

    fetchCoupons();
  }, []);
  const handleDeleteCoupon = async (couponId) => {
    try {
      await couponApi.deleteCoupon(couponId);
      setCoupons((prev) => prev.filter((coupon) => coupon._id !== couponId));
    } catch (error) {
      console.error(error);
      setError('Failed to delete coupon.');
    }
  };
  return (
    <Paper sx={{ padding: '16px', marginTop: '16px' }}>
      <Typography variant="h5" gutterBottom>
        Coupon List
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <List>
        {coupons.map((coupon) => (
          <ListItem key={coupon._id} divider>
            <ListItemText
              primary={coupon.code}
              secondary={`Discount Price: ${coupon.discountPrice}k - Expiry: ${new Date(coupon.expirationDate).toLocaleDateString()}`}
            />
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCoupon(coupon._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default CouponList;