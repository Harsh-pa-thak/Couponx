import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext"; // Import Cart Context
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BuyCoupons from "./pages/BuyCoupons";
import SellCoupons from "./pages/SellCoupon"; // Corrected typo in import
import Profile from "./pages/Profile";
import PayNow from "./pages/PayNow";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist"; // Import Wishlist component
import HelpSupport from "./pages/HelpSupport"; // Import Help & Support page
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute component

function App() {
    const [user] = useAuthState(auth);

    return (
        <CartProvider> {/* Wrap everything with CartProvider */}
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/help-support" element={<HelpSupport />} /> {/* Added Help & Support Page */}
                    
                    {/* Protected Routes */}
                    <Route path="/buy" element={<ProtectedRoute><BuyCoupons /></ProtectedRoute>} />
                    <Route path="/sell" element={<ProtectedRoute><SellCoupons /></ProtectedRoute>} />
                    <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                    <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/paynow" element={<ProtectedRoute><PayNow /></ProtectedRoute>} />
                </Routes>
            </Router>
        </CartProvider>
    );
}

export default App;
