import React, { useState, useCallback } from "react";
import { FaSearch, FaEnvelope, FaPhone, FaQuestionCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const HelpSupport = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const helpTopics = [
        { id: 1, title: "Login Issues", content: "If you're having trouble logging in, reset your password or check your email for verification." },
        { id: 2, title: "Payment Failures", content: "Ensure your payment method is valid and has sufficient funds. If the issue persists, contact support." },
        { id: 3, title: "Coupon Redemption", content: "Make sure the coupon code is valid and not expired. Some coupons have specific conditions." },
        { id: 4, title: "Order & Refunds", content: "You can request a refund within 7 days of purchase if the coupon is unused." },
        { id: 5, title: "Account Security", content: "Use a strong password and enable two-factor authentication to protect your account." }
    ];

    const filteredTopics = helpTopics.filter(topic => topic.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Support request submitted! We will contact you soon.");
        setFormData({ name: "", email: "", message: "" });
    };

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
                <FaQuestionCircle style={{ marginRight: "10px" }} /> Help & Support
            </motion.h2>

            <div style={{ width: "100%", maxWidth: "1000px", zIndex: 1 }}>
                {/* 🔍 Search Bar */}
                <motion.div
                    style={{ position: "relative", marginBottom: "20px" }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <input 
                        type="text" 
                        placeholder="Search for help topics..." 
                        style={{
                            width: "100%",
                            padding: "15px",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                            fontSize: "16px",
                        }}
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FaSearch style={{ position: "absolute", top: "15px", right: "15px", color: "#666" }} />
                </motion.div>

                {/* 📝 Help Topics */}
                <motion.div
                    style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(8px)",
                        padding: "20px",
                        borderRadius: "12px",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                        marginBottom: "20px",
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#333" }}>Help Topics</h3>
                    {filteredTopics.length > 0 ? (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
                            {filteredTopics.map(topic => (
                                <motion.div
                                    key={topic.id}
                                    style={{
                                        background: "rgba(255, 255, 255, 0.3)",
                                        padding: "15px",
                                        borderRadius: "8px",
                                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                        cursor: "pointer",
                                        transition: "transform 0.3s ease",
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setSelectedTopic(topic)}
                                >
                                    <h4 style={{ fontSize: "18px", fontWeight: "600", color: "#333" }}>{topic.title}</h4>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: "#666", fontSize: "16px" }}>No matching topics found.</p>
                    )}
                </motion.div>

                {/* 📌 Selected Topic */}
                {selectedTopic && (
                    <motion.div
                        style={{
                            background: "rgba(255, 255, 255, 0.2)",
                            backdropFilter: "blur(8px)",
                            padding: "20px",
                            borderRadius: "12px",
                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                            marginBottom: "20px",
                        }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px", color: "#333" }}>{selectedTopic.title}</h3>
                        <p style={{ fontSize: "16px", color: "#555", marginBottom: "20px" }}>{selectedTopic.content}</p>
                        <button
                            style={{
                                background: "#7a9473",
                                color: "#fff",
                                padding: "10px 20px",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "16px",
                            }}
                            onClick={() => setSelectedTopic(null)}
                        >
                            Close
                        </button>
                    </motion.div>
                )}

                {/* 📩 Contact Support Form */}
                <motion.div
                    style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(8px)",
                        padding: "20px",
                        borderRadius: "12px",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#333" }}>Contact Support</h3>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <input 
                            type="text" 
                            placeholder="Your Name" 
                            style={{
                                width: "100%",
                                padding: "15px",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                fontSize: "16px",
                            }}
                            value={formData.name} 
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <input 
                            type="email" 
                            placeholder="Your Email" 
                            style={{
                                width: "100%",
                                padding: "15px",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                fontSize: "16px",
                            }}
                            value={formData.email} 
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        <textarea 
                            placeholder="Describe your issue..." 
                            style={{
                                width: "100%",
                                padding: "15px",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                fontSize: "16px",
                                minHeight: "150px",
                            }}
                            value={formData.message} 
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                        ></textarea>
                        <button
                            style={{
                                background: "#7a9473",
                                color: "#fff",
                                padding: "15px",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "16px",
                                fontWeight: "600",
                            }}
                            type="submit"
                        >
                            Submit Request
                        </button>
                    </form>
                </motion.div>
            </div>

            {/* 📞 Additional Contact Info */}
            <motion.div
                style={{
                    marginTop: "30px",
                    textAlign: "center",
                    color: "#333",
                    zIndex: 1,
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                <p style={{ fontSize: "16px", marginBottom: "10px" }}>
                    <FaEnvelope style={{ marginRight: "10px" }} /> Email: support@couponx.com
                </p>
                <p style={{ fontSize: "16px" }}>
                    <FaPhone style={{ marginRight: "10px" }} /> Phone: +123 456 7890
                </p>
            </motion.div>
        </div>
    );
};

export default HelpSupport;