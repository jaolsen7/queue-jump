const db = require('../config/connection');
const { Restaurant, Reservation } = require('../models');

const restaurantData = require('./restaurantData.json');
const reservationData = require('./reservationData.json');

db.once('open', async () => {
  await Restaurant.deleteMany({});
  await Reservation.deleteMany({});

  const restaurants = await Restaurant.create(restaurantData);
  const reservations = await Reservation.insertMany(reservationData);

  console.log('Restaurants and Reservations seeded!');
  process.exit(0);
});
