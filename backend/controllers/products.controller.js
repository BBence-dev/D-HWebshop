const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "A tartalom nem lehet üres!"
    });
    return;
  }

  const products = {
    name: req.body.name,
    url: req.body.url,
    amount: req.body.amount,
    price: req.body.price,
  };

  Product.create(products)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Hiba történt a termék létrehozásakor."
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Product.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Valami hibar történt az adatok lekérdezésekor"
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Nem található ilyen termék ezzel az idval=${id}.`
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

  Product.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Termék sikeresen frissitve."
        });
      } else {
        res.send({
          message: `Nem lehet frissiteni az id=${id}. Talán a termék nem található vagy üres a req.body!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Hiba a termék frissitésekor" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Termék törölve lett!"
        });
      } else {
        res.send({
          message: `Nem lehet törölni ezzel az id=${id}-val, lehet a termék nem létezik!`
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
  Product.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Termékek sikeresen törölve!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Valami hiba történt törlés közben."
      });
    });
};