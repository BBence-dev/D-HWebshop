module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define("products", {
      name: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      }
    });
  
    return Products;
  };
  