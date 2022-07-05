module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    CordX: {
      type: Sequelize.STRING
    },
    CordY: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    },

  });

  return Tutorial;
};
