const controller = require("../controllers/order.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });

app.get("/api/test/orders", [authJwt.verifyToken],controller.findAll);
app.post("/api/test/orders", [authJwt.verifyToken],controller.create);
app.get("/api/test/orders/:id",[], controller.findOne);
app.put("/api/test/orders/:id", [authJwt.verifyToken],controller.update);
app.delete("/api/test/orders/:id",[authJwt.verifyToken], controller.delete);
app.delete("/api/test/orders",[authJwt.verifyToken], controller.deleteAll);

};