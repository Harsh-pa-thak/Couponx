import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsCart, BsHeart, BsHouse, BsQuestionCircle } from "react-icons/bs"; // Import Help Icon

function CustomNavbar() {
    const [user] = useAuthState(auth);
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const location = useLocation();

    // Update cart & wishlist counts
    const updateCounts = () => {
        setCartCount(JSON.parse(localStorage.getItem("cart"))?.length || 0);
        setWishlistCount(JSON.parse(localStorage.getItem("wishlist"))?.length || 0);
    };

    useEffect(() => {
        updateCounts(); // Initial load
        window.addEventListener("storage", updateCounts);
        return () => window.removeEventListener("storage", updateCounts);
    }, []);

    // Function to check active link
    const isActive = (path) => (location.pathname === path ? "active-link" : "");

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
            <Container>
                <Navbar.Brand as={Link} to="/">CouponX</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className={isActive("/")}>
                            <BsHouse size={22} /> Home
                        </Nav.Link>

                        {user && (
                            <>
                                <Nav.Link as={Link} to="/buy" className={isActive("/buy")}>
                                    Buy Coupons
                                </Nav.Link>
                                <Nav.Link as={Link} to="/sell" className={isActive("/sell")}>
                                    Sell Coupons
                                </Nav.Link>

                                {/* 🛒 Cart Icon with Count */}
                                <Nav.Link as={Link} to="/cart" className={isActive("/cart")}>
                                    <BsCart size={22} />
                                    {cartCount > 0 && (
                                        <Badge bg="danger" className="ms-1">{cartCount}</Badge>
                                    )}
                                </Nav.Link>

                                {/* ❤️ Wishlist Icon with Count */}
                                <Nav.Link as={Link} to="/wishlist" className={isActive("/wishlist")}>
                                    <BsHeart size={22} />
                                    {wishlistCount > 0 && (
                                        <Badge bg="warning" className="ms-1">{wishlistCount}</Badge>
                                    )}
                                </Nav.Link>

                                <Nav.Link as={Link} to="/profile" className={isActive("/profile")}>
                                    Profile
                                </Nav.Link>

                                {/* ➕ Added Help & Support Link */}
                                <Nav.Link as={Link} to="/help-support" className={isActive("/help-support")}>
                                    <BsQuestionCircle size={22} /> Help & Support
                                </Nav.Link>

                                <Button variant="outline-light" className="ms-2" onClick={() => auth.signOut()}>
                                    Logout
                                </Button>
                            </>
                        )}

                        {!user && (
                            <Button variant="primary" as={Link} to="/login" className="ms-2">
                                Login
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
