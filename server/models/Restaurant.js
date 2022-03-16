const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema({
  restaurant_name: {
    type: String,
    required: true,
  },
  food_type: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  menu_link: {
    type: String,
  },
  photo_link: {
    type: String,
  },
  reservations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reservation",
  },
],
});

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
