const Sequelize = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'videoville.db',
  define: {
    timestamps: false
  }
})

let db = {
  connection: sequelize,
  Favoritelist: require('./favoritelist-model')(sequelize, Sequelize),
  Video: require('./video-model')(sequelize, Sequelize)
}

db.Favoritelist.hasMany(db.Video)

module.exports = db

