const AdminWinner = require("../model/adminOrder.model");

// Create 50 new Admin winners (delete previous)
exports.createAdminWinners = async (req, res) => {
  try {
    // Step 1: Delete previous Admin winners
    await AdminWinner.deleteMany({});

    // Step 2: Create 50 new Admin winners
    const adminWinners = [];
    const drawDate = new Date();
    const ticketNumbersSet = new Set();

    while (ticketNumbersSet.size < 50) {
      // Generate a ticket number between 900000 and 999999
      const ticketNumber = 900000 + Math.floor(Math.random() * 100000);

      // Add only if it's not already present
      if (!ticketNumbersSet.has(ticketNumber)) {
        ticketNumbersSet.add(ticketNumber);
        adminWinners.push({
          drawDate,
          winningNumbers: [ticketNumber],
        });
      }
    }

    // Step 3: Insert all new Admin winners
    await AdminWinner.insertMany(adminWinners);

    res.json({
      message: "50 Admin winners created successfully",
      total: adminWinners.length,
      drawDate,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
