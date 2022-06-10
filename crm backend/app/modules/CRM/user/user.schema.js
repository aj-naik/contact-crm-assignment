const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String },
  address: { type: String },
  gst: { type: String },
  frequency: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const AdminSchema = new schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const EmailSchema = new schema({
  email: { type: String, required: true },
  subject: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

mongoose.model("Emails", EmailSchema, "Emails");

mongoose.model("User", UserSchema, "User");

mongoose.model("Admin", AdminSchema, "Admin");
