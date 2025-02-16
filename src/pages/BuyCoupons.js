import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const BuyCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate();

  // Initialize Particles.js
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-coupons");
        const data = await response.json();
        setCoupons(data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };
    fetchCoupons();
  }, []);

  const maskCouponCode = (code) => {
    const visibleLength = Math.ceil(code.length * 0.3);
    return "*".repeat(code.length - visibleLength) + code.slice(-visibleLength);
  };

  const handleAddToWishlist = (coupon) => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!existingWishlist.some((item) => item.id === coupon.id)) {
      localStorage.setItem("wishlist", JSON.stringify([...existingWishlist, coupon]));
      alert("Coupon added to wishlist!");
    } else {
      alert("This coupon is already in your wishlist!");
    }
  };

  const handleAddToCart = (coupon) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.some((item) => item.id === coupon.id)) {
      cart.push(coupon);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Coupon added to cart!");
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
        background: "#e3e4c7", // Beige Green Background
        padding: "20px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Particle Animation */}
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

      {/* Header */}
      <h2
        style={{
          color: "#333333", // Dark Charcoal Text
          fontSize: "40px",
          fontWeight: "600",
          fontFamily: "Arial, sans-serif",
          zIndex: 1,
        }}
      >
         Grab Your Coupons Now!
      </h2>

      {coupons.length === 0 ? (
        <p style={{ color: "#333333", fontSize: "18px", zIndex: 1 }}>No coupons available.</p>
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
          {coupons.map((coupon) => (
            <motion.div
              key={coupon.id}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(8px)",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                color: "#333333",
                textAlign: "center",
                transition: "transform 0.3s ease",
                cursor: "pointer",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>{maskCouponCode(coupon.code)}</h3>
              <p style={{ fontSize: "16px", fontWeight: "500" }}>
                {coupon.discount}% off on <span>{coupon.platform}</span>
              </p>
              <p style={{ fontSize: "14px", opacity: 0.8 }}>Sold by: {coupon.seller}</p>
              <p style={{ fontSize: "14px", opacity: 0.8 }}>Price: ₹ {coupon.price}</p>
              <p style={{ fontSize: "12px", opacity: 0.7, marginTop: "5px" }}>
                Expires on: {new Date(coupon.expiryDate).toLocaleDateString()}
              </p>

              <div style={{ marginTop: "15px", display: "flex", gap: "10px", justifyContent: "center" }}>
                <button
                  style={{
                    background: "#7a9473", // Grey Green Color
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
                  onClick={() => handleAddToWishlist(coupon)}
                >
                  <FaHeart /> Wishlist
                </button>
                <button
                  style={{
                    background: "#7a9473", // Grey Green Color
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
                  onClick={() => handleAddToCart(coupon)}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default BuyCoupons;
