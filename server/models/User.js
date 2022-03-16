const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const Restaurant = require("./Restaurant");

const userSchema = new Schema(
{
  phone_number: {
    type: String,
    required: true,
    unique: true,
    match: [/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/],
  },
  full_name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  reservations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reservation",
  },
],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  ],
},
  {
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
