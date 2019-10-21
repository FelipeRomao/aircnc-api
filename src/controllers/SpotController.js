const Spot = require("../models/Spot");
const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const { tech } = req.query,
      regex = new RegExp(`${tech}`, "i");

    const spot = await Spot.find({ techs: regex });
    return res.json(spot);
  },

  async store(req, res) {
    const { filename } = req.file,
      { company, price, techs } = req.body,
      { user_id } = req.headers;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ error: "User does not exists" });
    }

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      price,
      techs: techs.split(",").map(tech => tech.trim())
    });

    return res.json(spot);
  }
};
