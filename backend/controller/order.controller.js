const Order = require("../model/order.model");
const AdminOrder = require("../model/adminOrder.model");
// Create a new order

// Utility function: Generate a unique ticket number
const generateUniqueTicketNumber = async () => {
  let ticketNumber;
  let exists = true;

  while (exists) {
    ticketNumber = Math.floor(100000 + Math.random() * 900000).toString();
    exists =
      (await Order.findOne({ "tickets.ticketNumber": ticketNumber })) ||
      (await AdminOrder.findOne({ "tickets.ticketNumber": ticketNumber }));
  }

  return ticketNumber;
};

const getBDTime = () => {
  const now = new Date();
  return new Date(now.getTime() + 6 * 60 * 60 * 1000);
};

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { name, phone, address, transectionId, amount, tickets } = req.body;

    const isUsedTransectionId =
      (await Order.findOne({ transectionId })) ||
      (await AdminOrder.findOne({ transectionId }));
    if (isUsedTransectionId) {
      return res
        .status(400)
        .json({ message: "এই ট্রানজেকশন আইডি আগেই ব্যবহার করা হয়েছে" });
    }

    const bdNow = getBDTime();
    // Assign unique ticket numbers to each ticket
    const ticketsWithUniqueNumbers = await Promise.all(
      tickets.map(async (ticket) => ({
        ...ticket,
        ticketNumber: await generateUniqueTicketNumber(),
      })),
    );

    // Create Order
    const newOrder = new Order({
      name,
      phone,
      address,
      transectionId,
      amount,
      tickets: ticketsWithUniqueNumbers,
      createdAt: bdNow,
      updatedAt: bdNow,
    });

    const savedOrder = await newOrder.save();

    // Create AdminOrder with different unique tickets
    const adminTicketsWithUniqueNumbers = await Promise.all(
      tickets.map(async (ticket) => ({
        ...ticket,
        ticketNumber: await generateUniqueTicketNumber(),
      })),
    );

    const newAdminOrder = new AdminOrder({
      name,
      phone,
      address,
      transectionId,
      amount,
      tickets: adminTicketsWithUniqueNumbers,
      createdAt: bdNow,
      updatedAt: bdNow,
    });

    const savedAdminOrder = await newAdminOrder.save();

    res.status(201).json({
      order: savedOrder,
      adminOrder: savedAdminOrder,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.checkOrder = async (req, res) => {
  try {
    const { mobile } = req.query;
    const order = await Order.find({ phone: mobile });
    if (!order || order.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an order by ID
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
