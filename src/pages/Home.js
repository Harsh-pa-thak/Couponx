import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#e3e4c7", // Beige Green Background
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        color: "#333333", // Dark Charcoal Text Color
      }}
    >
      {/* Hero Section */}
      <div
        className="container-fluid p-5 text-center hero-section"
        style={{
          background: "rgba(0, 0, 0, 0.6)", // Dark Transparent Overlay
          borderRadius: "15px",
          padding: "40px",
          maxWidth: "800px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1 className="display-3 fw-bold" style={{ color: "#A0C49D" }}>Welcome to CouponX</h1>
        <p className="fs-4">Buy & Sell Discount Coupons Instantly!</p>
        <div className="mt-4">
          <button
            className="btn btn-lg mx-3"
            style={{
              background: "#7a9473", // Grey Green Color
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onClick={() => navigate("/buy")}
          >
            Buy Coupons
          </button>
          <button
            className="btn btn-lg mx-3"
            style={{
              background: "#7a9473", // Grey Green Color
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onClick={() => navigate("/sell")}
          >
            Sell Coupons
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="container text-center my-5" style={{ background: "#ebebe2", padding: "20px", borderRadius: "10px" }}>
        <h2 style={{ color: "#939C80" }}>About Us</h2>
        <p>CouponX is a platform that allows users to buy and sell discount coupons easily and securely.</p>
      </div>

      {/* Social Media Section */}
      <div className="container text-center my-5" style={{ background: "#ebebe2", padding: "20px", borderRadius: "10px" }}>
        <h2 style={{ color: "#939C80" }}>Follow Us</h2>
        <p>
          <a href="#" style={{ margin: "0 10px" }}>Instagram</a> | 
          <a href="#" style={{ margin: "0 10px" }}>Facebook</a> | 
          <a href="#" style={{ margin: "0 10px" }}>Reddit</a> | 
          <a href="#" style={{ margin: "0 10px" }}>LinkedIn</a>
        </p>
      </div>

      {/* Sponsors Section */}
      <div className="container text-center my-5" style={{ background: "#ebebe2", padding: "20px", borderRadius: "10px" }}>
        <h2 style={{ color: "#939C80" }}>Our Sponsors</h2>
        <p>We are proud to be supported by some of the top brands in the industry.</p>
      </div>
    </div>
  );
};

export default Home;
