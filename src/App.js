import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddCoupon from "./pages/AddCoupon";
import BuyCoupons from "./pages/BuyCoupons";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-coupon" element={<AddCoupon />} />
        <Route path="/buy-coupons" element={<BuyCoupons />} />
      </Routes>
    </Router>
  );
}

export default App;
