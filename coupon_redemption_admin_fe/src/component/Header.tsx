import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Toolbar } from '@mui/material';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Tabs>
          <Tab label="Coupon List" component={Link} to="/coupon-list" value={0}/>
          <Tab label="Create Coupon" component={Link} to="/create-coupon" value={1}/>
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
