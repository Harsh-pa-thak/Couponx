import React, { useState } from "react";

const AddCoupon = () => {
  const [coupon, setCoupon] = useState({ code: "", discount: "", platform: "", seller: "" });

  const handleChange = (e) => {
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/add-coupon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(coupon),
    });

    if (response.ok) {
      alert("Coupon added successfully!");
      setCoupon({ code: "", discount: "", platform: "", seller: "" });
    } else {
      alert("Failed to add coupon.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sell a Coupon</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="code" placeholder="Coupon Code" value={coupon.code} onChange={handleChange} required />
        <input type="number" name="discount" placeholder="Discount %" value={coupon.discount} onChange={handleChange} required />
        <input type="text" name="platform" placeholder="Platform" value={coupon.platform} onChange={handleChange} required />
        <input type="text" name="seller" placeholder="Your Name" value={coupon.seller} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const styles = {
  container: { padding: "20px", textAlign: "center" },
};

export default AddCoupon;
