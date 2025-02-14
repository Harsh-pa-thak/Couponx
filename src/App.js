import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BuyCoupons from "./pages/BuyCoupons";
import SellCoupons from "./pages/SellCoupon";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/buy" element={<BuyCoupons />} />
                <Route path="/sell" element={<SellCoupons />} />
            </Routes>
        </Router>
    );
}

export default App;
