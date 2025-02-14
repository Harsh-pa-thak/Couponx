import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={{ backgroundColor: "blue", padding: "10px", color: "white" }}>
            <Link to="/" style={{ marginRight: "20px", color: "white" }}>Home</Link>
            <Link to="/buy" style={{ marginRight: "20px", color: "white" }}>Buy Coupons</Link>
            <Link to="/sell" style={{ color: "white" }}>Sell Coupons</Link>
        </nav>
    );
};

export default Navbar;
