import { EventEmitter } from 'fbemitter'

const SERVER = 'http://localhost:8080/favoritelist-api'

class FavoritelistStore {
  constructor() {
    this.favoritelists = []
    this.emitter = new EventEmitter()
  }
  async getFavoritelists() {
    try {
      let response = await fetch(`${SERVER}/favoritelists`)
      let data = await response.json()
      this.favoritelists = data
      this.emitter.emit('GET_FAVORITELIST_SUCCESS')
    }
    catch (err) {
      console.warn(err)
      this.emitter.emit('GET_FAVORITELIST_ERROR')
    }
  }
  async addFavoritelist(favoritelist) {
    try {
      await fetch(`${SERVER}/favoritelists`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(favoritelist)
      })
      this.getFavoritelists()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('ADD_FAVORITELIST_ERROR')
    }
  }
  async deleteFavoritelist(id) {
    try {
      await fetch(`${SERVER}/favoritelists/${id}`, {
        method: 'delete'
      })
      this.getFavoritelists()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('DELETE_FAVORITELIST_ERROR')
    }
  }
  async saveFavoritelist(id, favoritelist) {
    try {
      await fetch(`${SERVER}/favoritelists/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(favoritelist)
      })
      this.getFavoritelists()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('UPDATE_FAVORITELIST_ERROR')
    }
  }
}

export default FavoritelistStore