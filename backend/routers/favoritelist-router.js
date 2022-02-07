
const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const models = require('../models')

const errors = {
  SERVER_ERROR: { message: 'server error' },
  NOT_FOUND: { message: 'not found' }
}

router.get('/sync', async (req, res) => {
  try {
    await models.connection.sync({ force: true })
    res.status(201).json({ message: 'tables created' })
  } catch (err) {
    console.warn(err)
    res.status(500).json(errors.SERVER_ERROR)
  }
})

router.get('/favoritelists', async (req, res) => {
  try {
    let favoritelists
    if (req.query && req.query.filter) {
      favoritelists = await models.Favoritelist.findAll({
        where: {
          name: {
            [Op.like]: `%${req.query.filter}%`
          }
        }
      })
    } else {
      favoritelists = await models.Favoritelist.findAll()
    }
    res.status(200).json(favoritelists)
  } catch (err) {
    console.warn(err)
    res.status(500).json(errors.SERVER_ERROR)
  }
})

router.get('/favoritelists/:id', async (req, res) => {
  try {
    let favoritelist = await models.Favoritelist.findByPk(req.params.id)
    if (favoritelist) {
      res.status(200).json(favoritelist)
    } else {
      res.status(404).json(errors.NOT_FOUND)
    }
  } catch (err) {
    console.warn(err)
    res.status(500).json(errors.SERVER_ERROR)
  }
})

router.post('/favoritelists', async (req, res) => {
  try {
    if (req.query.bulk && req.query.bulk == 'on') {
      let favoritelists = await models.Favoritelist.bulkCreate(req.body)
      res.status(201).json(favoritelists)
    } else {
      let favoritelist = await models.Favoritelist.create(req.body)
      res.status(201).json(favoritelist)
    }
  } catch (err) {
    console.warn(err.stack)
    res.status(500).json(errors.SERVER_ERROR)
  }
})

router.put('/favoritelists/:id', async (req, res) => {
  try {
    let favoritelist = await models.Favoritelist.findByPk(req.params.id)
    if (favoritelist) {
      let modifiedFavoritelist = await favoritelist.update(req.body, { fields: ['description'] })
      res.status(202).json(modifiedFavoritelist)
    } else {
      res.status(404).json(errors.NOT_FOUND)
    }
  } catch (err) {
    console.warn(err)
    res.status(500).json(errors.SERVER_ERROR)
  }
})

router.delete('/favoritelists/:id', async (req, res) => {
  try {
    let favoritelist = await models.Favoritelist.findByPk(req.params.id)
    if (favoritelist) {
      let deletedFavoritelist = await favoritelist.destroy()
      res.status(202).json(deletedFavoritelist)
    } else {
      res.status(404).json(errors.NOT_FOUND)
    }
  } catch (err) {
    console.warn(err)
    res.status(500).json(errors.SERVER_ERROR)
  }
})

router.get('/favoritelists/:fid/videos', async (req, res) => {
  //TODO if filter
  try {
    let favoritelist = await models.Favoritelist.findByPk(req.params.fid)
    if (favoritelist) {
      let videos = await favoritelist.getVideos()
      res.status(200).json(videos)
    } else {
      res.status(404).json(errors.NOT_FOUND)
    }
  } catch (err) {
    console.warn(err)
    res.status(500).json(errors.SERVER_ERROR)
  }
})

router.get('/favoritelists/:fid/videos/:vid', async (req, res) => {
  try {
    let video = await models.Video.findByPk(req.params.vid, {
      where: {
        favoritelistId: req.params.fid
      }
    })

    if (video) {
      res.status(200).json(video)
    } else {
      res.status(404).json(errors.NOT_FOUND)
    }
  } catch (err) {
    console.warn(err)
    res.status(500).json(errors.SERVER_ERROR)
  }
})

router.post('/favoritelists/:fid/videos', async (req, res) => {
  try {
    let favoritelist = await models.Favoritelist.findByPk(req.params.fid)
    if (favoritelist) {
      let video = req.body
      video.favoritelistId = favoritelist.id
      let createdVideo = await models.Video.create(video)
      res.status(201).json(createdVideo)
    } else {
      res.status(404).json(errors.NOT_FOUND)
    }
  } catch (err) {
    console.warn(err)
    res.status(500).json(errors.SERVER_ERROR)
  }
})

router.put('/favoritelists/:fid/videos/:vid', async (req, res) => {
  try {
    let video = await models.Video.findByPk(req.params.vid, {
      where: {
        favoritelistId: req.params.fid
      }
    })
    if (video) {
      let modifiedVideo = await video.update(req.body, { fields: ['description', 'title', 'url'] })
      res.status(202).json(modifiedVideo)
    } else {
      res.status(404).json(errors.NOT_FOUND)
    }
  } catch (err) {
    console.warn(err)
    res.status(500).json(errors.SERVER_ERROR)
  }
})

router.delete('/favoritelists/:fid/videos/:vid', async (req, res) => {
  try {
    let video = await models.Video.findByPk(req.params.vid, {
      where: {
        favoritelistId: req.params.fid
      }
    })
    if (video) {
      let deletedVideo = await video.destroy()
      res.status(202).json(deletedVideo)
    } else {
      res.status(404).json(errors.NOT_FOUND)
    }
  } catch (err) {
    console.warn(err)
    res.status(500).json(errors.SERVER_ERROR)
  }
})

module.exports = router