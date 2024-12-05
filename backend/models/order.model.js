module.exports = (sequelize, Sequelize) => {
    const Orders = sequelize.define("Orders", {
      name: {
        type: Sequelize.STRING
      },
      payment: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      city:{
        type: Sequelize.STRING
      },
      state:{
        type: Sequelize.STRING
      },
      zip:{
        type: Sequelize.INTEGER
      },
      payed: {
        type: Sequelize.STRING
      },
      delivery:{
        type: Sequelize.STRING
      },
      status:{
        type: Sequelize.STRING
      },
      ddelivery:{
        type: Sequelize.DATE
      }
    });
  
    return Orders;
  };
  