const db = require("../config/connection");
const { Restaurant, Reservation } = require("../models");

const restaurantData = require("./restaurantData.json");
const reservationData = require("./reservationData.json");

db.once("open", async () => {
  try {
    await Restaurant.deleteMany({});
    await Reservation.deleteMany({});

    const restaurants = await Restaurant.insertMany(restaurantData);
    const reservations = await Reservation.insertMany(reservationData);

    reservations[0].set("restaurant", restaurants[0]._id);
    reservations[1].set("restaurant", restaurants[0]._id);
    reservations[2].set("restaurant", restaurants[1]._id);
    reservations[3].set("restaurant", restaurants[2]._id)

    await reservations[0].save();
    await reservations[1].save();
    await reservations[2].save();

    console.log("Restaurants and Reservations seeded!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
