import React, { useEffect, useState, useCallback } from "react";
import { Container, Card, Button, Badge, ListGroup, Row, Col } from "react-bootstrap";
import { FaShoppingCart, FaBox, FaStar, FaQuestionCircle, FaTruck } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const Profile = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    const [totalBuys, setTotalBuys] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [ratings, setRatings] = useState(4.5); // Example rating

    // Fetch user orders and stats (mock data for now)
    useEffect(() => {
        // Mock orders data
        const mockOrders = [
            { id: 1, code: "SAVE10", platform: "Amazon", price: 5.99, status: "Delivered" },
            { id: 2, code: "FLAT20", platform: "Flipkart", price: 10.99, status: "In Transit" },
        ];
        setOrders(mockOrders);

        // Mock total buys and sales
        setTotalBuys(5); // Example: 5 items bought
        setTotalSales(2); // Example: 2 items sold
    }, []);

    // Initialize Particles.js
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

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
            <motion.h2
                style={{
                    color: "#333333", // Dark Charcoal Text
                    fontSize: "40px",
                    fontWeight: "600",
                    fontFamily: "Arial, sans-serif",
                    zIndex: 1,
                }}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Your Profile
            </motion.h2>

            {/* User Information */}
            <motion.div
                style={{ width: "100%", maxWidth: "1000px", zIndex: 1 }}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <Card
                    style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(8px)",
                        borderRadius: "12px",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                        marginBottom: "20px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                >
                    <Card.Body>
                        <div className="d-flex align-items-center">
                            <img
                                src={user?.photoURL || "https://via.placeholder.com/150"}
                                alt="Profile"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "50%",
                                    marginRight: "20px",
                                }}
                            />
                            <div>
                                <h3 style={{ color: "#333333" }}>{user?.displayName || "User Name"}</h3>
                                <p style={{ color: "#666666" }}>{user?.email || "user@example.com"}</p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </motion.div>

            {/* Orders */}
            <motion.div
                style={{ width: "100%", maxWidth: "1000px", zIndex: 1 }}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <Card
                    style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(8px)",
                        borderRadius: "12px",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                        marginBottom: "20px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                >
                    <Card.Header style={{ background: "rgba(255, 255, 255, 0.2)", borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }}>
                        <h5 style={{ color: "#333333", margin: 0 }}>
                            <FaBox className="me-2" /> Your Orders
                        </h5>
                    </Card.Header>
                    <Card.Body>
                        {orders.length === 0 ? (
                            <p style={{ color: "#666666" }}>No orders found.</p>
                        ) : (
                            <ListGroup>
                                {orders.map((order) => (
                                    <ListGroup.Item
                                        key={order.id}
                                        style={{
                                            background: "rgba(255, 255, 255, 0.2)",
                                            border: "1px solid rgba(255, 255, 255, 0.2)",
                                            marginBottom: "10px",
                                            borderRadius: "8px",
                                        }}
                                        className="d-flex justify-content-between align-items-center"
                                    >
                                        <div>
                                            <h6 style={{ color: "#333333" }}>{order.code}</h6>
                                            <small style={{ color: "#666666" }}>{order.platform}</small>
                                        </div>
                                        <div>
                                            <Badge bg={order.status === "Delivered" ? "success" : "warning"}>
                                                {order.status}
                                            </Badge>
                                            <p style={{ color: "#333333", margin: 0 }}>₹{order.price}</p>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </Card.Body>
                </Card>
            </motion.div>

            {/* Total Buys and Sales */}
            <Row
                style={{ width: "100%", maxWidth: "1000px", zIndex: 1 }}
                className="mb-4"
            >
                <Col md={6}>
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <Card
                            style={{
                                background: "rgba(255, 255, 255, 0.2)",
                                backdropFilter: "blur(8px)",
                                borderRadius: "12px",
                                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                            }}
                        >
                            <Card.Body>
                                <h5 style={{ color: "#333333" }}>
                                    <FaShoppingCart className="me-2" /> Total Buys
                                </h5>
                                <h2 style={{ color: "#333333" }}>{totalBuys}</h2>
                                <p style={{ color: "#666666" }}>Total items purchased</p>
                            </Card.Body>
                        </Card>
                    </motion.div>
                </Col>
                <Col md={6}>
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <Card
                            style={{
                                background: "rgba(255, 255, 255, 0.2)",
                                backdropFilter: "blur(8px)",
                                borderRadius: "12px",
                                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                            }}
                        >
                            <Card.Body>
                                <h5 style={{ color: "#333333" }}>
                                    <FaBox className="me-2" /> Total Sales
                                </h5>
                                <h2 style={{ color: "#333333" }}>{totalSales}</h2>
                                <p style={{ color: "#666666" }}>Total items sold</p>
                            </Card.Body>
                        </Card>
                    </motion.div>
                </Col>
            </Row>

            {/* Track Your Order */}
            <motion.div
                style={{ width: "100%", maxWidth: "1000px", zIndex: 1 }}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
            >
                <Card
                    style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(8px)",
                        borderRadius: "12px",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                        marginBottom: "20px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                >
                    <Card.Header style={{ background: "rgba(255, 255, 255, 0.2)", borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }}>
                        <h5 style={{ color: "#333333", margin: 0 }}>
                            <FaTruck className="me-2" /> Track Your Order
                        </h5>
                    </Card.Header>
                    <Card.Body>
                        <p style={{ color: "#666666" }}>Enter your order ID to track the status of your order.</p>
                        <div className="d-flex">
                            <input
                                type="text"
                                placeholder="Order ID"
                                style={{
                                    flex: 1,
                                    padding: "10px",
                                    borderRadius: "8px",
                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                    marginRight: "10px",
                                    background: "rgba(255, 255, 255, 0.2)",
                                }}
                            />
                            <Button
                                style={{
                                    background: "#7a9473",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "10px 20px",
                                }}
                            >
                                Track
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </motion.div>

            {/* Ratings */}
            <motion.div
                style={{ width: "100%", maxWidth: "1000px", zIndex: 1 }}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
            >
                <Card
                    style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(8px)",
                        borderRadius: "12px",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                        marginBottom: "20px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                >
                    <Card.Header style={{ background: "rgba(255, 255, 255, 0.2)", borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }}>
                        <h5 style={{ color: "#333333", margin: 0 }}>
                            <FaStar className="me-2" /> Your Ratings
                        </h5>
                    </Card.Header>
                    <Card.Body>
                        <div className="d-flex align-items-center">
                            <h2 style={{ color: "#333333", marginRight: "10px" }}>{ratings}</h2>
                            <div>
                                {[...Array(5)].map((_, index) => (
                                    <FaStar
                                        key={index}
                                        color={index < ratings ? "#FFD700" : "#C0C0C0"}
                                        size={20}
                                    />
                                ))}
                            </div>
                        </div>
                        <p style={{ color: "#666666" }}>Based on 10 reviews</p>
                    </Card.Body>
                </Card>
            </motion.div>

            {/* Help Desk */}
            <motion.div
                style={{ width: "100%", maxWidth: "1000px", zIndex: 1 }}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
            >
                <Card
                    style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(8px)",
                        borderRadius: "12px",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                        marginBottom: "20px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                >
                    <Card.Header style={{ background: "rgba(255, 255, 255, 0.2)", borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }}>
                        <h5 style={{ color: "#333333", margin: 0 }}>
                            <FaQuestionCircle className="me-2" /> Help Desk
                        </h5>
                    </Card.Header>
                    <Card.Body>
                        <p style={{ color: "#666666" }}>Need help? Contact our support team.</p>
                        <Button
                            style={{
                                background: "#7a9473",
                                border: "none",
                                borderRadius: "8px",
                                padding: "10px 20px",
                            }}
                            as="a"
                            href="/help"
                        >
                            Contact Support
                        </Button>
                    </Card.Body>
                </Card>
            </motion.div>
        </div>
    );
};

export default Profile;