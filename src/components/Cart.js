import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentError, setPaymentError] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Load cart from localStorage
    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(cartItems);

        // Calculate total amount
        const total = cartItems.reduce((sum, item) => sum + item.price, 0);
        setTotalAmount(total);
    }, []);

    // Remove item from cart
    const removeFromCart = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);

        // Recalculate total amount
        const total = updatedCart.reduce((sum, item) => sum + item.price, 0);
        setTotalAmount(total);
    };

    // Simulate fake payment process
    const initiateFakePayment = () => {
        setIsProcessing(true);
        setPaymentSuccess(false);
        setPaymentError(false);

        // Simulate a payment process with a 2-second delay
        setTimeout(() => {
            const isSuccess = Math.random() > 0.5; // Randomly decide success or failure
            if (isSuccess) {
                setPaymentSuccess(true);
                setPaymentError(false);

                // Clear the cart after successful payment
                localStorage.removeItem("cart");
                setCart([]);
                setTotalAmount(0);
            } else {
                setPaymentError(true);
                setPaymentSuccess(false);
            }

            setIsProcessing(false);
        }, 2000); // 2-second delay
    };

    // Initialize particles
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
                Your Cart
            </h2>

            {cart.length === 0 ? (
                <p style={{ color: "#154360", fontSize: "18px", zIndex: 1 }}>No items in your cart.</p>
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
                    {cart.map((item) => (
                        <motion.div
                            key={item.id}
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
                            <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>{item.code}</h3>
                            <p style={{ fontSize: "16px", fontWeight: "500" }}>
                                {item.discount}% off on <span>{item.platform}</span>
                            </p>
                            <p style={{ fontSize: "14px", opacity: 0.8 }}>Price: ₹{item.price}</p>
                            <p style={{ fontSize: "12px", opacity: 0.7, marginTop: "5px" }}>
                                Expires on: {new Date(item.expiryDate).toLocaleDateString()}
                            </p>

                            <div style={{ marginTop: "15px", display: "flex", justifyContent: "center" }}>
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
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    <FaTrash /> Remove
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {cart.length > 0 && (
                <div
                    style={{
                        marginTop: "30px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        zIndex: 1,
                    }}
                >
                    <h3 style={{ color: "#154360", fontSize: "24px" }}>Total: ₹{totalAmount}</h3>
                    <button
                        style={{
                            background: "#9BA17B", // Sage Green Button
                            color: "#ffffff",
                            padding: "12px 24px",
                            borderRadius: "8px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "500",
                            marginTop: "15px",
                            transition: "0.3s",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                        }}
                        onClick={initiateFakePayment}
                        disabled={isProcessing}
                    >
                        {isProcessing ? (
                            <>
                                Processing...
                            </>
                        ) : (
                            "Proceed to Pay"
                        )}
                    </button>
                </div>
            )}

            {/* Payment Success/Failure Alerts */}
            {paymentSuccess && (
                <motion.div
                    style={{
                        position: "fixed",
                        top: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#4CAF50",
                        color: "#ffffff",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        zIndex: 1000,
                    }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Payment Successful! Thank you for your purchase.
                </motion.div>
            )}
            {paymentError && (
                <motion.div
                    style={{
                        position: "fixed",
                        top: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#F44336",
                        color: "#ffffff",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        zIndex: 1000,
                    }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Payment Failed. Please try again.
                </motion.div>
            )}
        </div>
    );
};

export default Cart;