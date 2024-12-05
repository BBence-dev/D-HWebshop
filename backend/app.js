const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

//app.use(cors());
app.use(
 cors({
credentials: true,
origin: ["http://localhost:8081"],
})
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "butella-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
    sameSite: 'strict'
  })
);

const db = require("./models");
const Role = db.role;

/*db.sequelize.sync({force: true}).then(() => {
 console.log('Drop and Resync Database with ');
   initial();
 });

 function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}*/

app.get("/", (req, res) => {
  res.json({ message: "Fut a szerver." });
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/products.routes")(app);
require("./routes/order.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`A szerver ezen a porton fut${PORT}.`);
});

/*function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}*/
