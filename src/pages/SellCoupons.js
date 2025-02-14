import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const SellCoupons = () => {
  const [coupon, setCoupon] = useState({
    title: "",
    price: "",
    platform: "",
  });

  const handleChange = (e) => {
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Coupon Added:", coupon);
    alert("Coupon added successfully! 🚀");
    setCoupon({ title: "", price: "", platform: "" }); // Reset form
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">💰 Sell a Coupon</h2>
      <Form onSubmit={handleSubmit} className="p-3 shadow rounded">
        <Form.Group className="mb-3">
          <Form.Label>Coupon Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={coupon.title}
            onChange={handleChange}
            placeholder="e.g. Flipkart ₹100 Off"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price (₹)</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={coupon.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Platform</Form.Label>
          <Form.Control
            type="text"
            name="platform"
            value={coupon.platform}
            onChange={handleChange}
            placeholder="e.g. Amazon, Flipkart"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Add Coupon
        </Button>
      </Form>
    </Container>
  );
};

export default SellCoupons;
