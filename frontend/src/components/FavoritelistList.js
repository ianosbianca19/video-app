import React, { Component } from 'react';
import FavoritelistStore from '../stores/FavoritelistStore'
import FavoritelistForm from './FavoritelistForm'
import Favoritelist from './Favoritelist'
import FavoritelistDetails from './FavoritelistDetails'

class FavoritelistList extends Component {
  constructor() {
    super()
    this.state = {
      favoritelists: [],
      selectedFavoritelist: null
    }
    this.favoritelistStore = new FavoritelistStore()
    this.add = (favoritelist) => {
      this.favoritelistStore.addFavoritelist(favoritelist)
    }
    this.delete = (id) => {
      this.favoritelistStore.deleteFavoritelist(id)
    }
    this.save = (id, favoritelist) => {
      this.favoritelistStore.saveFavoritelist(id, favoritelist)
    }
    this.select = (favoritelists) => {
      this.setState({
        selectedFavoritelist: favoritelists
      })
    }
    this.cancel = () => {
      this.setState({
        selectedFavoritelist: null
      })
    }
  }
  componentDidMount() {
    this.favoritelistStore.getFavoritelists()
    this.favoritelistStore.emitter.addListener('GET_FAVORITELISTS_SUCCESS', () => {
      this.setState({
        favoritelists: this.favoritelistStore.favoritelists
      })
    })
  }
  render() {
    if (this.state.selectedFavoritelist) {
      return <FavoritelistDetails item={this.state.selectedFavoritelist} onCancel={this.cancel} />
    }
    else {
      return <div>
        <h3>A list of favorite lists</h3>
        {
          this.state.favoritelists.map((e, i) => <Favoritelist key={i} item={e} onDelete={this.delete} onSave={this.save} onSelect={this.select} />)
        }
        <FavoritelistForm onAdd={this.add} />
      </div>
    }
  }
}

export default FavoritelistList
