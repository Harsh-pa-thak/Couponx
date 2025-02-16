import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaTrash, FaCartPlus } from "react-icons/fa";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState(
        JSON.parse(localStorage.getItem("wishlist")) || []
    );

    const particlesInit = async (engine) => {
        await loadSlim(engine);
    };

    // Remove an item from the wishlist
    const removeFromWishlist = (id) => {
        const updatedWishlist = wishlist.filter((item) => item.id !== id);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setWishlist(updatedWishlist);
    };

    // Move an item from wishlist to cart
    const moveToCart = (coupon) => {
        // Remove from wishlist
        const updatedWishlist = wishlist.filter((item) => item.id !== coupon.id);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setWishlist(updatedWishlist);

        // Add to cart
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (!cart.some((item) => item.id === coupon.id)) {
            cart.push(coupon);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Coupon moved to cart!");
        } else {
            alert("Coupon already in cart!");
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#D8E2C6", // Beige Green Background
                padding: "20px",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    background: { color: { value: "transparent" } },
                    fpsLimit: 60,
                    interactivity: {
                        events: {
                            onClick: { enable: true, mode: "push" },
                            onHover: { enable: true, mode: "repulse" },
                            resize: true,
                        },
                        modes: {
                            push: { quantity: 4 },
                            repulse: { distance: 200, duration: 0.4 },
                        },
                    },
                    particles: {
                        color: { value: "#ffffff" },
                        links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.5, width: 1 },
                        move: { enable: true, speed: 2 },
                        number: { density: { enable: true, area: 800 }, value: 50 },
                        opacity: { value: 0.5 },
                        shape: { type: "circle" },
                        size: { value: { min: 1, max: 5 } },
                    },
                    detectRetina: true,
                }}
            />

            <h2
                style={{
                    color: "#154360",
                    fontSize: "40px",
                    fontWeight: "600",
                    fontFamily: "Arial, sans-serif",
                    zIndex: 1,
                }}
            >
                Your Wishlist
            </h2>

            {wishlist.length === 0 ? (
                <p style={{ color: "#154360", fontSize: "18px", zIndex: 1 }}>Your wishlist is empty.</p>
            ) : (
                <motion.div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "20px",
                        maxWidth: "1000px",
                        width: "100%",
                        marginTop: "20px",
                        zIndex: 1,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {wishlist.map((coupon) => (
                        <motion.div
                            key={coupon.id}
                            style={{
                                background: "rgba(255, 255, 255, 0.2)",
                                backdropFilter: "blur(8px)",
                                padding: "20px",
                                borderRadius: "12px",
                                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                                color: "#154360",
                                textAlign: "center",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                            }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>{coupon.code}</h3>
                            <p style={{ fontSize: "16px", fontWeight: "500" }}>
                                {coupon.discount}% off on <span>{coupon.platform}</span>
                            </p>
                            <p style={{ fontSize: "14px", opacity: 0.8 }}>Sold by: {coupon.seller}</p>
                            <p style={{ fontSize: "14px", opacity: 0.8 }}>Price: ${coupon.price}</p>
                            <p style={{ fontSize: "12px", opacity: 0.7, marginTop: "5px" }}>
                                Expires on: {new Date(coupon.expiryDate).toLocaleDateString()}
                            </p>

                            <div style={{ marginTop: "15px", display: "flex", gap: "10px", justifyContent: "center" }}>
                                <button
                                    style={{
                                        background: "#9BA17B", // Sage Green Button
                                        color: "#ffffff",
                                        padding: "10px 15px",
                                        borderRadius: "8px",
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "0.3s",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                    }}
                                    onClick={() => moveToCart(coupon)}
                                >
                                    <FaCartPlus /> Move to Cart
                                </button>
                                <button
                                    style={{
                                        background: "#9BA17B", // Sage Green Button
                                        color: "#ffffff",
                                        padding: "10px 15px",
                                        borderRadius: "8px",
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "0.3s",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                    }}
                                    onClick={() => removeFromWishlist(coupon.id)}
                                >
                                    <FaTrash /> Remove
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default Wishlist;