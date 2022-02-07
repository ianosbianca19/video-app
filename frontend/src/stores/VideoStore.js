import {EventEmitter} from 'fbemitter'

const SERVER = 'http://localhost:8080/favoritelist-api'

class VideoStore{
    constructor(){
        this.videos = []
        this.emitter = new EventEmitter()
    }
    async getVideos(favoritelistId){
        try{
            let response = await fetch(`${SERVER}/favoritelists/${favoritelistId}/videos`)
            let data = await response.json()
            this.videos = data
            this.emitter.emit('GET_VIDEO_SUCCESS')
        }
        catch(err){
            console.warn(err)
            this.emitter.emit('GET_VIDEO_ERROR')
        }
    }
    async addVideo(favoritelistId, video){
        try {
            await fetch(`${SERVER}/favoritelists/${favoritelistId}/videos`, {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(video)
            })
            this.getVideos(favoritelistId)
        } catch (err) {
            console.warn(err)
            this.emitter.emit('ADD_VIDEO_ERROR')
        }
    }
    async deleteVideo(favoritelistId, videoId){
        try {
            await fetch(`${SERVER}/favoritelists/${favoritelistId}/videos/${videoId}`, {
                method : 'delete'
            })
            this.getVideos(favoritelistId)
        } catch (err) {
            console.warn(err)
            this.emitter.emit('DELETE_VIDEO_ERROR')
        }
    }
    async saveVideo(favoritelistId, videoId, video){
        try {
            await fetch(`${SERVER}/favoritelists/${favoritelistId}/videos/${videoId}`, {
                method : 'put',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(video)
            })
            this.getVideos(favoritelistId)
        } catch (err) {
            console.warn(err)
            this.emitter.emit('UPDATE_VIDEO_ERROR')
        }
    }
}

export default VideoStore