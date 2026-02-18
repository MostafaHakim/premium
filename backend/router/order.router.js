const express = require("express");
const router = express.Router();
const orderController = require("../controller/order.controller");

// Create a new order
router.post("/", orderController.createOrder);

// Get all orders
router.get("/", orderController.getAllOrders);
router.get("/check", orderController.checkOrder);

// Get a single order by ID
router.get("/:id", orderController.getOrderById);

// Update an order by ID
router.put("/:id", orderController.updateOrder);

// Delete an order by ID (optional, if you want to implement delete functionality)
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
