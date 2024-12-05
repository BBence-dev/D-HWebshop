const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.get("/api/test/all",[authJwt.verifyToken], controller.findAll);
  app.post("/api/test/all",[authJwt.verifyToken], controller.create);
  app.delete("/api/test/all/:id",[authJwt.verifyToken], controller.delete);
  app.delete("/api/test/all",[authJwt.verifyToken], controller.deleteAll);
  app.get("/api/test/all/:id",[authJwt.verifyToken], controller.findOne);

  app.put("/api/test/all/:id",[authJwt.verifyToken], controller.update);


  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod", 
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard 
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAll
  );

  app.get(
    "/api/test/admin/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findOne
  );

  app.post(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.create
  );

  app.patch(
    "/api/test/admin/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );

  app.delete(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );

  app.delete(
    "/api/test/admin/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteAll
  );

};
