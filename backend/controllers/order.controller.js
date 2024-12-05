const db = require("../models");
const Order = db.order;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
 
  const orders = {
    name: req.body.name,
    payment: req.body.payment,
    amount: req.body.amount, 
    price: req.body.price, 
    zip: req.body.zip,
    state: req.body.state,
    city: req.body.city,
    payed: req.body.payed,
    delivery: req.body.delivery,
    ddelivery: req.body.ddelivery,
    status: req.body.status,
  };

  Order.create(orders)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Hiba történt a rendlés létrehozásakor."
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Order.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Valami hiba történt az adatok lekérdezésekor"
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Order.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Nem található ilyen rendelés ezzel az idval=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Termék lekérdezése nem sikrült" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Order.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Termék sikeresen frissitve."
        });
      } else {
        res.send({
          message: `Nem lehet frissiteni az id=${id}. Talán a rendelés nem található vagy üres a req.body!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Hiba a rendelés frissitésekor" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Order.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Rendelés törölve!"
        });
      } else {
        res.send({
          message: `Nem lehet törölni ezzel az id=${id}-val, lehet a rendelés nem létezik !`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Nem lehet törölni ezzel az id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Order.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Rendelések sikeresen törölve!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Valami hiba történt törlés közben."
      });
    });
};