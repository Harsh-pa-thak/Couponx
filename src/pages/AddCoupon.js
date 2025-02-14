import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Container, Form, Button } from "react-bootstrap";

const AddCoupon = () => {
  const [coupon, setCoupon] = useState({
    title: "",
    platform: "",
    discount: "",
    code: "",
    price: "",
  });

  const handleChange = (e) => {
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "coupons"), {
        ...coupon,
        timestamp: serverTimestamp(),
      });
      alert("Coupon Added Successfully!");
      setCoupon({ title: "", platform: "", discount: "", code: "", price: "" });
    } catch (error) {
      console.error("Error adding coupon: ", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add a New Coupon</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={coupon.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Platform (Amazon, Flipkart, etc.)</Form.Label>
          <Form.Control
            type="text"
            name="platform"
            value={coupon.platform}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Discount (%)</Form.Label>
          <Form.Control
            type="number"
            name="discount"
            value={coupon.discount}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Coupon Code</Form.Label>
          <Form.Control
            type="text"
            name="code"
            value={coupon.code}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price ($)</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={coupon.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Coupon
        </Button>
      </Form>
    </Container>
  );
};

export default AddCoupon;
