const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebase-config.json"); // Ensure this file exists in your backend folder

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-project-id.firebaseio.com", // Replace with your Firebase DB URL
});

const db = admin.firestore();

// Route to check if API is running
app.get("/", (req, res) => {
  res.send("🔥 Coupon API is running!");
});

// Route to add a new coupon
app.post("/add-coupon", async (req, res) => {
  try {
    const { code, discount, platform, seller } = req.body;
    if (!code || !discount || !platform || !seller) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newCoupon = {
      code,
      discount,
      platform,
      seller,
      createdAt: admin.firestore.Timestamp.now(),
    };

    const docRef = await db.collection("coupons").add(newCoupon);
    res.status(201).json({ message: "Coupon added successfully!", id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch all coupons
app.get("/coupons", async (req, res) => {
  try {
    const snapshot = await db.collection("coupons").get();
    const coupons = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to verify and buy a coupon
app.post("/buy-coupon", async (req, res) => {
  try {
    const { couponId } = req.body;

    if (!couponId) {
      return res.status(400).json({ error: "Coupon ID is required" });
    }

    const couponRef = db.collection("coupons").doc(couponId);
    const coupon = await couponRef.get();

    if (!coupon.exists) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    await couponRef.delete(); // Remove coupon after purchase
    res.status(200).json({ message: "Coupon purchased successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});

app.use((req, res, next) => {
  console.log(`📌 Received ${req.method} request on ${req.url}`);
  next();
});