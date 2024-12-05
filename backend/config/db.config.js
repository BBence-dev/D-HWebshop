module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "szakdb",
    dialect: "mariadb",
    pool: {
      max: 8,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  