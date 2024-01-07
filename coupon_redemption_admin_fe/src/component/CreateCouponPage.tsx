import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Shanghai');

const FormContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '300px',
  margin: 'auto',
  marginTop: '16px',
});

const InputField = styled(TextField)({
  marginBottom: '16px',
});

function CreateCouponPage() {
  const navigate = useNavigate();
  const [couponName, setCouponName] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [quota, setQuota] = useState('');

  const handleCreateCoupon = async () => {
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

      const adjustedStartDate = startDate
        ? dayjs(startDate).endOf('day').utc().format('YYYY-MM-DD')
        : null;
      const adjustedEndDate = endDate
        ? dayjs(endDate).endOf('day').utc().format('YYYY-MM-DD')
        : null;

      const url = import.meta.env.VITE_REACT_APP_API_URL;
      const response = await fetch(`${url}/coupon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          couponCode,
          couponName,
          quota: parseInt(quota),
          startDate: adjustedStartDate,
          endDate: adjustedEndDate,
        }),
      });

      if (response.ok) {
        resetForm();
        alert('Coupon created successfully!');
      } else {
        alert(`Failed to create coupon: ${response.statusText}`);
      }
    } catch (error) {
      alert(`Error creating coupon. Please try again.`);
    }
  };

  const resetForm = () => {
    setCouponName('');
    setCouponCode('');
    setStartDate(null);
    setEndDate(null);
    setQuota('');
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
        Create Coupon
      </h1>
      <FormContainer>
        <InputField
          label="Coupon Name"
          variant="outlined"
          value={couponName}
          onChange={(e) => setCouponName(e.target.value)}
        />
        <InputField
          label="Coupon Code"
          variant="outlined"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <div style={{ marginBottom: '16px' }}></div>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(date) => setEndDate(date)}
          />
          <div style={{ marginBottom: '16px' }}></div>
        </LocalizationProvider>

        <InputField
          label="Quota"
          variant="outlined"
          value={quota}
          onChange={(e) => {
            const numericInput = e.target.value.replace(/\D/, '');
            setQuota(numericInput);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateCoupon}
        >
          Create Coupon
        </Button>
      </FormContainer>
    </>
  );
}

export default CreateCouponPage;
