const ytdl = require('ytdl-core')
const {google} = require('googleapis')

class Appliance{
    matchDataInput(data) {
        const result = data.match(/youtube.com\/watch\?v\=/i)
        return result
    }

    getDataYoutube(data) {
        var options = {
            part: 'snippet',
            maxResults: 5,
            q: data
        }
        const ytV3 = google.youtube({version: 'v3', auth: process.env.API_KEY})
        const result = ytV3.search.list(options)
        return result
    }

    getFileYouTube(req, res) {
        var {data} = req.query
        var title = []
        const getTitle= () => {
            return new Promise((resolve, reject)=>{
                ytdl.getInfo(data, (err, results) => {
                    const Title = results.title.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
                    title.push(Title)
                    err ? reject() : resolve()
                });
            })
        }
        const getFile= () => {
            res.header("content-disposition", 'attachment; filename='+title[0]+'.mp3') 
            ytdl(data, {filter:'audioonly', format:'mp3'}).pipe(res)
        }
        async function init(){
            await getTitle()
            getFile()
        }
        init()
    }
}

module.exports = Appliance