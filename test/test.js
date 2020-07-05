const {google} = require('googleapis')

module.exports = {
    async getDataYoutube(req, res) {
        var videoId = []
        var dataVideo = []
        var {data} = req.query

        const ytV3 = google.youtube({version: 'v3', auth: process.env.API_KEY})
        const search = await ytV3.search.list({part: 'snippet', maxResults: 5, q: data})
        search.data.items.forEach(x => {
            videoId.push(x.id.videoId)
        })
        const dVideo = await ytV3.videos.list({part: ['snippet','contentDetails'], id: videoId})
        dVideo.data.items.forEach(x => {
            dataVideo.push({
                title: x.snippet.title,
                channel: x.snippet.channelTitle,
                duration: x.contentDetails.duration
            })
        })
        
        console.log(dataVideo)

        return res.status(200).json({
            data: dataVideo
        })
        
    }
}