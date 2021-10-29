const {google} = require('googleapis')

module.exports = {
    async getDataYoutube(req, res) {
        var videoId = []
        var dataVideo = []
        var {data} = req.query

        const duration = (duration) => {
            var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
            !match ? match = duration.match(/P(\d+DT)?(\d+H)?(\d+M)?(\d+S)?/)
                : match.splice(1, 0, undefined)
            return {
                day: parseInt(match[1] || 0),
                hour: parseInt(match[2] || 0),
                minute: parseInt(match[3] || 0),
                second: parseInt(match[4] || 0)
            }
        }

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
                duration: duration(x.contentDetails.duration)
            })
        })

        return res.status(200).json({
            data: dataVideo
        })
        
    }
}