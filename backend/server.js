const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Route to add a coupon with price and expiryDate
app.post("/add-coupon", async (req, res) => {
    try {
        const { code, price, discount, platform, seller, expiryDate } = req.body;
        if (!code || !price || !discount || !platform || !seller || !expiryDate) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Convert price and discount to numbers
        const parsedPrice = parseFloat(price);
        const parsedDiscount = parseFloat(discount);

        if (parsedPrice < 0) {
            return res.status(400).json({ error: "Price cannot be negative" });
        }

        const currentDate = new Date();
        const selectedDate = new Date(expiryDate);
        if (selectedDate < currentDate) {
            return res.status(400).json({ error: "Expiry date cannot be in the past" });
        }

        await db.collection("coupons").add({
            code,
            price: parsedPrice,
            discount: parsedDiscount,
            platform,
            seller,
            expiryDate,
            createdAt: admin.firestore.Timestamp.now(),
        });

        res.status(201).json({ message: "Coupon added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Route to get all coupons with price and expiryDate
app.get("/get-coupons", async (req, res) => {
    try {
        const snapshot = await db.collection("coupons").orderBy("createdAt", "desc").get();
        const coupons = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.json(coupons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch coupons" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
