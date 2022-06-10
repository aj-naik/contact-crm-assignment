const express = require("express");
const config = require("./configs");
const compress = require("compression");
const cors = require("cors"); //For cross domain error
const fs = require("fs");
const path = require("path");
const timeout = require("connect-timeout");
const glob = require("glob");

module.exports = function () {
  var app = express(
    express.urlencoded({
      limit: "50mb",
      extended: true,
    })
  );

  // create a write stream (in append mode)
  var accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
  );


  //console.log(__dirname)
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  } else if (process.env.NODE_ENV === "production") {
    app.use(compress({ threshold: 2 }));
  }

  app.use(
    express.urlencoded({
      limit: "50mb",
      extended: true,
    })
  );

  app.use(
    express.json({
      limit: "50mb",
      extended: true,
    })
  );

  app.use(cors());

  // =======   Settings for CORS
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
    );
    next();
  });

  app.use(timeout(120000));
  app.use(haltOnTimedout);

  function haltOnTimedout(req, res, next) {
    if (!req.timedout) next();
  }

  app.use((err, req, res, next) => {
    return res.send({
      status: 0,
      statusCode: 500,
      message: err.message,
      error: err,
    });
  });

  // =======   Routing
  const modules = "/../app/modules";
  glob(__dirname + modules + "/**/*Routes.js", {}, (err, files) => {
    files.forEach((route) => {
      const stats = fs.statSync(route);
      const fileSizeInBytes = stats.size;
      if (fileSizeInBytes) {
        require(route)(app, express);
      }
    });
  });

  return app;
};
