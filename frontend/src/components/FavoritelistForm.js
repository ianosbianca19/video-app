import React, { Component } from 'react'

class FavoritelistForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      // createdAt: '',
    }
    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }
    this.add = () => {
      this.props.onAdd({
        description: this.state.description,
        // createdAt: this.state.createdAt,
      })
    }
  }
  render() {
    return <div>
      <input type="text" placeholder="description" name="description" onChange={this.handleChange} />
      {/* <input type="text" placeholder="createdAt" name="createdAt" onChange={this.handleChange} /> */}
      <input type="button" value="add" onClick={this.add} />
    </div>
  }
}

export default FavoritelistForm