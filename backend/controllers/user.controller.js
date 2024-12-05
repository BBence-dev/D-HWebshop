const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "A tartalom nem lehet üres!"
    });
    return;
  }

  const user = {
    username: req.body.username,
    password: req.body.password,
    status: req.body.status,
    email: req.body.email,
    state: req.body.state,
    ageInYears: req.body.ageInYears,
    delivery: req.body.delivery,
    ddeliver: req.body.ddeliver
  };

  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  User.findAll({ where: condition , include: Role })
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

  User.findByPk(id, { include: Role})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Nem található ilyen felhasználó ezzel az idval=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Felhasználó lekérdezése nem sikrült" + id
      });
    });
};


exports.update = (req, res) => {
  const id = req.params.id;
  
  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Felhasznűló sikeresen frissitve."
        });
      } else {
        res.send({
          message: `Nem lehet frissiteni az id=${id}. Talán a felhasználó nem található vagy üres a req.body!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Hiba a felhasználó frissitésekor" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Felhasználó törölve"
        });
      } else {
        res.send({
          message: `Nem lehet törölni ezzel az id=${id}-val, lehet a felhasználó nem létezik!`
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
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Felhasználó sikeresen törölve!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Valami hiba történt törlés közben."
      });
    });
};


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};


exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
