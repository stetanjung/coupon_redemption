import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CouponListPage from './component/CouponListPage';
import LoginPage from './component/LoginPage';
import CreateCouponPage from './component/CreateCouponPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/coupon-list" element={<CouponListPage />} />
          <Route path="/create-coupon" element={<CreateCouponPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
