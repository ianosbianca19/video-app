import React, { Component } from 'react'

class VideoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
    }
    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }
    this.add = () => {
      this.props.onAdd({
        title: this.state.title,
        description: this.state.description,
      })
    }
  }
  render() {
    return <div>
      <input type="text" placeholder="title" name="title" onChange={this.handleChange} />
      <input type="text" placeholder="description" name="description" onChange={this.handleChange} />
      <input type="button" value="add" onClick={this.add} />
    </div>
  }
}

export default VideoForm