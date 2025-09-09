const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect("mongodb://localhost:27017/food-view", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
}

module.exports = connectDb;

