module.exports = (sequelize, Sequelize) => {
  const AuthClick = sequelize.define("authClicks", {
    macAddress: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    numberOfClick: {
      type: Sequelize.INTEGER
    },
  });

  return AuthClick;
};
