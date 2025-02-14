import React, { useState } from "react";

const SellCoupon = () => {
    const [code, setCode] = useState("");
    const [discount, setDiscount] = useState("");
    const [platform, setPlatform] = useState("");
    const [seller, setSeller] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const couponData = { code, discount, platform, seller };

        try {
            const response = await fetch("http://localhost:5000/add-coupon", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(couponData),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Coupon added successfully!");
                setCode("");
                setDiscount("");
                setPlatform("");
                setSeller("");
            } else {
                alert(`Failed to add coupon: ${data.error}`);
            }
        } catch (error) {
            alert("Failed to add coupon. Check console for details.");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Sell a Coupon</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Coupon Code" value={code} onChange={(e) => setCode(e.target.value)} required />
                <input type="number" placeholder="Discount %" value={discount} onChange={(e) => setDiscount(e.target.value)} required />
                <input type="text" placeholder="Platform" value={platform} onChange={(e) => setPlatform(e.target.value)} required />
                <input type="text" placeholder="Seller Name" value={seller} onChange={(e) => setSeller(e.target.value)} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SellCoupon;
