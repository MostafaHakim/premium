require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

// Enable CORS for all routes
app.use(cors());
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
const orderRoutes = require("./router/order.router");
const drawRoutes = require("./router/draw.router");
const adminRoutes = require("./router/admnWinner.route");

app.use("/api/admin", adminRoutes);
app.use("/api/draws", drawRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
