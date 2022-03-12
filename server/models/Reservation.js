const { Schema, model } = require("mongoose");
const User = require("./User");

const reservationSchema = new Schema({
  phone_number: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im],
  },
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