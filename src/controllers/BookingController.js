const Booking = require("../models/Booking");

module.exports = {
  async store(req, res) {
    const { userId } = req.headers,
      { spot_id } = req.params,
      { date } = req.body;

    const booking = await Booking.create({
      user: userId,
      spot: spot_id,
      date
    });

    await booking
      .populate("spot")
      .populate("user")
      .execPopulate();

    const ownerSocket = req.connectedUsers[booking.spot.user];

    if (ownerSocket) {
      req.io.to(ownerSocket).emit("booking_request", booking);
    }

    return res.json(booking);
  }
};
