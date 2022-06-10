const UserController = require("./user.controller");
const config = require("../../../../configs/configs").portal.baseApiUrl;
module.exports = function (app, express) {
  const router = express.Router();

  router.post("/addUser", (req, res) => {
    return new UserController().boot(req, res).addUser();
  });
  router.post("/deleteUser", (req, res) => {
    return new UserController().boot(req, res).deleteUser();
  });
  router.post("/updateUser", (req, res) => {
    return new UserController().boot(req, res).updateUser();
  });
  router.get("/getAllUsers", (req, res) => {
    return new UserController().boot(req, res).getAllUsers();
  });
  router.get("/getUser", (req, res) => {
    return new UserController().boot(req, res).getUserByEmail();
  });
  router.post("/login", (req, res) => {
    return new UserController().boot(req, res).login();
  });
  router.post("/register", (req, res) => {
    return new UserController().boot(req, res).register();
  });
  router.post("/sendEmail", (req, res) => {
    return new UserController().boot(req, res).sendEmail();
  });
  router.get("/fetchAllEmails", (req, res) => {
    return new UserController().boot(req, res).fetchAllEmails();
  });
  app.use(config, router);
};
