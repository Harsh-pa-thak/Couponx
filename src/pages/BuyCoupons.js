import React, { useEffect, useState } from "react";

const BuyCoupons = () => {
    const [coupons, setCoupons] = useState([]);

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

    return (
        <div>
            <h2>Buy Coupons</h2>
            {coupons.length === 0 ? <p>No coupons available.</p> : (
                <ul>
                    {coupons.map((coupon) => (
                        <li key={coupon.id}>
                            {coupon.code} - {coupon.discount}% off on {coupon.platform} (Sold by {coupon.seller})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BuyCoupons;
