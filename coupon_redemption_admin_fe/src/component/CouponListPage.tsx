import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface Coupon {
  couponName: string;
  couponCode: string;
  startDate: string;
  endDate: string;
  quota: number;
  remainingQuota: number;
}

function CouponListPage() {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const accessToken = document.cookie
          .split('; ')
          .find((cookie) => cookie.startsWith('accessToken='))
          ?.split('=')[1];

        if (!accessToken) {
          alert('Please login first!');
          navigate('/');
          return;
        }

        const url = import.meta.env.VITE_REACT_APP_API_URL;
        const response = await fetch(`${url}/coupon`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCoupons(data);
        } else {
          alert('Failed to fetch coupons:' + response.statusText);
        }
      } catch (error) {
        alert('Error fetching coupons:' + error);
      }
    };

    fetchCoupons();
  }, []);

  const handleDeleteClick = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      const accessToken = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('accessToken='))
        ?.split('=')[1];

      if (!accessToken) {
        alert('Please login first!');
        navigate('/');
        return;
      }

      const url = import.meta.env.VITE_REACT_APP_API_URL;
      const response = await fetch(
        `${url}/coupon/${selectedCoupon?.couponCode}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.ok) {
        setCoupons((prevCoupons) =>
          prevCoupons.filter((c) => c !== selectedCoupon),
        );
        setDeleteConfirmationOpen(false);
      } else {
        console.error('Error deleting coupon:', response.statusText);
        setDeleteConfirmationOpen(false);
      }
    } catch (error) {
      console.error('Error deleting coupon:', error);
      setDeleteConfirmationOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmationOpen(false);
  };

  return (
    <>
      <Header />
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'black',
        }}
      >
        Coupon List
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {coupons.map((coupon) => (
          <Card
            key={coupon.couponCode}
            style={{ margin: '16px', minWidth: '300px' }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                style={{ textAlign: 'center' }}
              >
                {coupon.couponName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Coupon Code: {coupon.couponCode}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start Date:{' '}
                {new Date(coupon.startDate).toLocaleDateString(undefined, {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                End Date:{' '}
                {new Date(coupon.endDate).toLocaleDateString(undefined, {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quota: {coupon.remainingQuota} / {coupon.quota}
              </Typography>
              {coupon.remainingQuota === coupon.quota && (
                <Button
                  onClick={() => handleDeleteClick(coupon)}
                  color="error"
                  variant="outlined"
                >
                  Delete
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Coupon</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this coupon?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmation} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CouponListPage;
