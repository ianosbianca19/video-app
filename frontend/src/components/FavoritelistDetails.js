import React, { Component } from 'react'
import VideoStore from '../stores/VideoStore'
import Video from './Video'
import VideoForm from './VideoForm'

class FavoritelistDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: []
    }
    this.videoStore = new VideoStore()
    this.add = (video) => {
      this.videoStore.addVideo(this.props.item.id, video)
    }
    this.delete = (videoId) => {
      this.videoStore.deleteVideo(this.props.item.id, videoId)
    }
    this.save = (videoId, video) => {
      this.videoStore.saveVideo(this.props.item.id, videoId, video)
    }
  }
  componentDidMount() {
    this.videoStore.getVideos(this.props.item.id)
    this.videoStore.emitter.addListener('GET_VIDEO_SUCCESS', () => {
      this.setState({
        videos: this.videoStore.videos
      })
    })
  }
  render() {
    let { item } = this.props
    return <div>
      details for {item.description} - {item.createdAt}
      <div>
        {
          this.state.videos.map((e, i) => <Video key={i} item={e} onDelete={this.delete} onSave={this.save} />)
        }
        <VideoForm onAdd={this.add} />
      </div>
      <div>
        <input type="button" value="back" onClick={() => this.props.onCancel()} />
      </div>
    </div>
  }
}

export default FavoritelistDetails