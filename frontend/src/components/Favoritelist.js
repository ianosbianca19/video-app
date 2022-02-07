import React, { Component } from 'react'

class Favoritelist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      description: this.props.item.description,
      createdAt: this.props.item.createdAt,
    }
    this.delete = () => {
      this.props.onDelete(this.props.item.id)
    }
    this.save = () => {
      this.props.onSave(this.props.item.id, {
        description: this.state.description,
        createdAt: this.state.createdAt,
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
    this.select = () => {
      this.props.onSelect(this.props.item)
    }
  }
  render() {
    let { item } = this.props
    if (this.state.isEditing) {
      return <div>
        <h4>
          <input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
        </h4>
        <h6>
          <input type="text" name="createdAt" onChange={this.handleChange} value={this.state.createdAt} />
        </h6>
        <div>
          <input type="button" value="cancel" onClick={this.cancel} />
          <input type="button" value="save" onClick={this.save} />
        </div>
      </div>
    }
    else {
      return <div>
        <h4>{item.description}</h4>
        <h6>{item.createdAt}</h6>
        <div>
          <input type="button" value="delete" onClick={this.delete} />
          <input type="button" value="edit" onClick={this.edit} />
          <input type="button" value="select" onClick={this.select} />
        </div>
      </div>
    }

  }
}

export default Favoritelist