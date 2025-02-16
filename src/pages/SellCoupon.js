import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlusCircle } from "react-icons/fa";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const SellCoupon = () => {
  const [coupon, setCoupon] = useState({
    code: "",
    discount: "",
    platform: "",
    price: "",
    expiryDate: "",
    seller: "",
  });

  const handleChange = (e) => {
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/add-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(coupon),
      });

      if (response.ok) {
        alert("Coupon added successfully!");
        setCoupon({
          code: "",
          discount: "",
          platform: "",
          price: "",
          expiryDate: "",
          seller: "",
        });
      } else {
        alert("Failed to add coupon.");
      }
    } catch (error) {
      console.error("Error adding coupon:", error);
    }
  };

  // Initialize Particles.js
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(135deg, #D6EAF8, #AED6F1)", // Light Blue Gradient
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
          color: "#154360",
          fontSize: "40px",
          fontWeight: "600",
          fontFamily: "Arial, sans-serif",
          zIndex: 1,
        }}
      >
         Sell Your Coupon!
      </h2>

      <motion.form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(255, 255, 255, 0.12)", // Transparent Glass Effect
          backdropFilter: "blur(10px)",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          color: "#154360",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "500px",
          zIndex: 1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <label style={{ marginBottom: "8px", fontSize: "16px" }}>Coupon Code</label>
        <input
          type="text"
          name="code"
          value={coupon.code}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />

        <label style={{ marginBottom: "8px", fontSize: "16px" }}>Discount (%)</label>
        <input
          type="number"
          name="discount"
          value={coupon.discount}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />

        <label style={{ marginBottom: "8px", fontSize: "16px" }}>Platform</label>
        <input
          type="text"
          name="platform"
          value={coupon.platform}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />

        <label style={{ marginBottom: "8px", fontSize: "16px" }}>Price (₹)</label>
        <input
          type="number"
          name="price"
          value={coupon.price}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />

        <label style={{ marginBottom: "8px", fontSize: "16px" }}>Expiry Date</label>
        <input
          type="date"
          name="expiryDate"
          value={coupon.expiryDate}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />

        <label style={{ marginBottom: "8px", fontSize: "16px" }}>Your Name (Seller)</label>
        <input
          type="text"
          name="seller"
          value={coupon.seller}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />

        <motion.button
          type="submit"
          style={{
            background: "#2980B9",
            color: "#ffffff",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
          whileHover={{ scale: 1.05 }}
        >
          <FaPlusCircle /> Add Coupon
        </motion.button>
      </motion.form>
    </div>
  );
};

export default SellCoupon;
