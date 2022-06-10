const mongoose = require("mongoose");
const Controller = require("../../Base/Controller");
const User = mongoose.model("User");
var async = require("async");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = mongoose.model("Admin");
const Emails = mongoose.model("Emails");
const nodemailer = require("nodemailer");

class UserController extends Controller {
  async addUser() {
    try {
      const newUser = this.req.body;
      const user = new User(newUser);
      await user.save();
      return this.res.status(200).json({
        success: true,
        message: "User added successfully",
      });
    } catch (error) {
      console.log(error);
      return this.res.status(500).json({
        success: false,
        message: "A110: Error in adding User",
      });
    }
  }

  async deleteUser() {
    try {
      const userEmail = this.req.body.email;
      await User.findOne({ email: userEmail }).remove();
      return this.res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return this.res.status(500).json({
        success: false,
        message: "A110: Error in deleting User",
      });
    }
  }

  async updateUser() {
    try {
      const userEmail = this.req.body.prevEmail;
      const updateUser = this.req.body.user;
      await User.findOneAndUpdate({ email: userEmail }, updateUser);
      return this.res.status(200).json({
        success: true,
        message: "User updated successfully",
      });
    } catch (error) {
      console.log(error);
      return this.res.status(500).json({
        success: false,
        message: "A110: Error in updating User",
      });
    }
  }

  async getAllUsers() {
    try {
      const users = await User.find({});
      return this.res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        users: users,
      });
    } catch (error) {
      console.log(error);
      return this.res.status(500).json({
        success: false,
        message: "A110: Error in fetching Users",
      });
    }
  }
  async getUserByEmail() {
    try {
      const userEmail = this.req.query.email;
      const user = await User.findOne({ email: userEmail });
      return this.res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user: user,
      });
    } catch (error) {
      console.log(error);
      return this.res.status(500).json({
        success: false,
        message: "A110: Error in fetching User",
      });
    }
  }

  async register() {
    try {
      const { name, email, password } = this.req.body;

      if (!(email && password && name)) {
        this.res.status(400).send("All input is required");
      }

      const oldUser = await Admin.findOne({ email });

      if (oldUser) {
        return this.res.status(409).send("User Already Exist. Please Login");
      }

      let encryptedPassword = await bcrypt.hash(password, 10);

      const user = await Admin.create({
        name: name,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      const token = jwt.sign({ user_id: user._id, email }, "1234", {
        expiresIn: "2h",
      });

      user.token = token;

      this.res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  }

  async login() {
    try {
      const email = this.req.body.email;
      const password = this.req.body.password;
      const user = await Admin.findOne({ email: email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ user_id: user._id, email }, "1234", {
          expiresIn: "2h",
        });

        user.token = token;

        this.res.status(200).json(user);
      }
    } catch (error) {
      console.log(error);
      return this.res.status(500).json({
        success: false,
        message: "A110: Error in fetching User",
      });
    }
  }

  async sendEmail() {
    try {
      const email = this.req.body.email;
      const text = this.req.body.text;
      const subject = this.req.body.subject;
      let today = new Date().toISOString().slice(0, 10);
      let transporter = nodemailer.createTransport({
        service: "gmail",
        port: process.env.PORT || 8000,
        secure: false,
        auth: {
          user: "whatsbulkerchat@gmail.com",
          pass: "tctzsohcgvpnwqtz",
        },
      });
      let message = {
        from: "whatsbulkerchat@gmail.com",
        to: email,
        subject: subject,
        text: text,
      };
      await transporter.sendMail(message);

      const newUser = new Emails();
      newUser.email = email;
      newUser.subject = subject;
      newUser.text = text;
      newUser.save();

      console.log(email);
      this.res.status(200).json({
        success: true,
        message: "Email sent successfully",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async fetchAllEmails() {
    try {
      const emails = await Emails.find({ email: this.req.query.email });

      return this.res.status(200).json({
        success: true,
        message: "Emails fetched successfully",
        emails: emails,
      });
    } catch (error) {
      console.log(error);
      return this.res.status(500).json({
        success: false,
        message: "A110: Error in fetching Emails",
      });
    }
  }
}

module.exports = UserController;
