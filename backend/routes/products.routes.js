const controller = require("../controllers/products.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });

app.get("/api/test/products", controller.findAll);
app.post("/api/test/products", controller.create);
app.get("/api/test/products/:id", controller.findOne);
app.put("/api/test/products/:id", controller.update);
app.delete("/api/test/products/:id", controller.delete);
app.delete("/api/test/products", controller.deleteAll);

};