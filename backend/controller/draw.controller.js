const Draw = require("../model/draw.model");
const Order = require("../model/order.model");
const AdminOrder = require("../model/adminOrder.model");

exports.createDraw = async (req, res) => {
  try {
    // 📅 Today Range (UTC)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    console.log("Today:", today);
    console.log("Tomorrow:", tomorrow);

    // ❌ Prevent Duplicate Draw
    const already = await Draw.findOne({
      drawDate: { $gte: today, $lt: tomorrow },
    });

    if (already) {
      return res.status(400).json({ message: "Today's draw already done" });
    }

    // 🔹 Load Today's Real Tickets using $elemMatch
    const orders = await Order.find({
      tickets: {
        $elemMatch: {
          status: "active",
          drawDate: { $gte: today, $lt: tomorrow },
        },
      },
    });

    console.log("Total Orders with Today's Tickets:", orders.length);

    const realTickets = orders.flatMap((o) =>
      o.tickets.filter(
        (t) =>
          t.status === "active" &&
          new Date(t.drawDate) >= today &&
          new Date(t.drawDate) < tomorrow,
      ),
    );

    console.log("Total Real Tickets:", realTickets.length);

    const totalRealTickets = realTickets.length;

    // 🔹 Calculate Real Winners
    let realWinnerCount = Math.floor(totalRealTickets / 1000) * 10;

    // 🔹 Cap max 50
    if (realWinnerCount > 50) realWinnerCount = 50;

    const TOTAL_SHOW = 50;
    const adminWinnerCount = TOTAL_SHOW - realWinnerCount;

    // 🎲 Pick Real Winners
    const shuffledReal = [...realTickets].sort(() => 0.5 - Math.random());
    const realWinners = shuffledReal.slice(0, realWinnerCount);
    const realNumbers = realWinners.map((t) => Number(t.ticketNumber));

    // 🎭 Pick Admin Winners
    let adminNumbers = [];

    if (adminWinnerCount > 0) {
      const adminOrders = await AdminOrder.find({
        tickets: {
          $elemMatch: {
            status: "active",
          },
        },
      });

      const adminTickets = adminOrders.flatMap((o) =>
        o.tickets.filter((t) => t.status === "active"),
      );

      console.log("Total Admin Tickets:", adminTickets.length);

      const shuffledAdmin = [...adminTickets].sort(() => 0.5 - Math.random());
      const adminWinners = shuffledAdmin.slice(0, adminWinnerCount);
      adminNumbers = adminWinners.map((t) => Number(t.ticketNumber));
    }

    // 🏆 Final 50 Winners
    const finalWinners = [...realNumbers, ...adminNumbers];

    // 💾 Save Draw
    const draw = new Draw({
      drawDate: new Date(),
      winningNumbers: finalWinners,
    });

    await draw.save();

    // 🔒 Mark Real Winners as Used
    for (const win of realWinners) {
      await Order.updateOne(
        { "tickets.ticketNumber": win.ticketNumber },
        { $set: { "tickets.$.status": "used" } },
      );
    }

    // 🔒 Mark All Today's Non-Winner Tickets as Expired
    await Order.updateMany(
      {
        tickets: {
          $elemMatch: {
            status: "active",
            drawDate: { $gte: today, $lt: tomorrow },
          },
        },
      },
      {
        $set: {
          "tickets.$[elem].isExpired": true,
          "tickets.$[elem].status": "expired",
        },
      },
      {
        arrayFilters: [
          {
            "elem.status": "active",
            "elem.drawDate": { $gte: today, $lt: tomorrow },
          },
        ],
      },
    );

    console.log("Final Winners:", finalWinners.length);

    // 📤 Response
    res.json({
      date: today,
      totalRealTickets,
      realWinners: realNumbers.length,
      adminWinners: adminNumbers.length,
      publishedWinners: finalWinners.length,
      winners: finalWinners,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
// Get all draws
exports.getAllDraws = async (req, res) => {
  try {
    const draws = await Draw.find();
    res.status(200).json(draws);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single draw by ID
exports.getDrawById = async (req, res) => {
  try {
    const draw = await Draw.findById(req.params.id);
    if (!draw) {
      return res.status(404).json({ message: "Draw not found" });
    }
    res.status(200).json(draw);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete draw by date
exports.deleteDrawByDate = async (req, res) => {
  try {
    const { drawDate } = req.body;
    const deletedDraw = await Draw.findOneAndDelete({ drawDate });
    if (!deletedDraw) {
      return res.status(404).json({ message: "Draw not found" });
    }
    res.status(200).json({ message: "Draw deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delte all draws
exports.deleteAllDraws = async (req, res) => {
  try {
    await Draw.deleteMany({});
    res.status(200).json({ message: "All draws deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
