const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      ageInYears: req.body.ageInYears

    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      const result = user.setRoles(roles);
      if (result) res.send({ message: "Felhasználó regisztráció teljes!" });
    } else {

      const result = user.setRoles([1]);
      if (result) res.send({ message: "Felhasználó regisztráció teljes!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "Nincs ilyen felhasználó." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Helytelen jelszó!",
      });
    }

    const token = jwt.sign({ id: user.id },
                           config.secret,
                           {
                            algorithm: 'HS256',
                            allowInsecureKeySizes: true,
                            expiresIn: 86400,
                           });

    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "Ön kijelentekezett!"
    });
  } catch (err) {
    this.next(err);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword, email } = req.body;

    if (!token || !newPassword || !email) {
      return res.status(400).send({ message: "Hiányzó token, új jelszó vagy email cím." });
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).send({ message: "Nincs felhasználó ezzel az email címmel." });
    }

    jwt.verify(token, config.secret, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Érvénytelen vagy lejárt token." });
      }

      if (decoded.id !== user.id) {
        return res.status(401).send({ message: "A token nem megfelelő a felhasználóhoz." });
      }

      const hashedPassword = bcrypt.hashSync(newPassword, 8);

      await user.update({ password: hashedPassword });

      return res.status(200).send({ message: "Jelszó sikeresen frissítve." });
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};