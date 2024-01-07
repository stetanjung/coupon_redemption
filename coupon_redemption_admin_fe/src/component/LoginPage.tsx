import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    const accessToken = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('accessToken='))
      ?.split('=')[1];

    if (accessToken) {
      navigate('/coupon-list');
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const url = import.meta.env.VITE_REACT_APP_API_URL;
      const response = await fetch(`${url}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.accessToken;

        document.cookie = `accessToken=${accessToken}; expires=${new Date(
          Date.now() + 15 * 60 * 1000,
        ).toUTCString()}; path=/`;

        navigate('/coupon-list');
      } else {
        console.error('Login failed:', response.statusText);
        alert('Login failed: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
