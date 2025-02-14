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

// Route to add a coupon
app.post("/add-coupon", async (req, res) => {
    try {
        const { code, discount, platform, seller } = req.body;
        if (!code || !discount || !platform || !seller) {
            return res.status(400).json({ error: "All fields are required" });
        }
        await db.collection("coupons").add({ code, discount, platform, seller });
        res.status(201).json({ message: "Coupon added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Route to get all coupons
app.get("/get-coupons", async (req, res) => {
    try {
        const snapshot = await db.collection("coupons").get();
        const coupons = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(coupons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch coupons" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
