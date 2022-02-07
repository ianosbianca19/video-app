import React, { Component } from 'react'

class Video extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      title: this.props.item.title,
      description: this.props.item.description,
    }
    this.delete = () => {
      this.props.onDelete(this.props.item.id)
    }
    this.save = () => {
      this.props.onSave(this.props.item.id, {
        title: this.state.title,
        description: this.state.description,
      })
      this.setState({
        isEditing: false
      })
    }
    this.edit = () => {
      this.setState({ isEditing: true })
    }
    this.cancel = () => {
      this.setState({ isEditing: false })
    }
    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }
  }
  render() {
    let { item } = this.props
    if (this.state.isEditing) {
      return <div>
        <h4>
          <input type="text" name="title" onChange={this.handleChange} value={this.state.title} />
        </h4>
        <h6>
          <input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
        </h6>
        <div>
          <input type="button" value="cancel" onClick={this.cancel} />
          <input type="button" value="save" onClick={this.save} />
        </div>
      </div>
    }
    else {
      return <div>
        <h4>{item.title}</h4>
        <h6>{item.description}</h6>
        <div>
          <input type="button" value="delete" onClick={this.delete} />
          <input type="button" value="edit" onClick={this.edit} />
        </div>
      </div>
    }

  }
}

export default Video