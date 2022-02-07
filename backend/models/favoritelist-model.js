module.exports = (sequelize, Sequelize) => {
  return sequelize.define('favoritelist', {
    description: {
      type: Sequelize.STRING,
      allowNull: false
      //TODO string of at least 3 characters
    },
    createdAt: {
      // type: Sequelize.DATETIME,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  })
}