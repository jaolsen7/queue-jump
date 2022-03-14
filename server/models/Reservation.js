const { Schema, model } = require("mongoose");
const User = require("./User");

const reservationSchema = new Schema({
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  party_size: {
    type: Number,
    required: true,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Reservation = model("Reservation", reservationSchema);

module.exports = Reservation;
