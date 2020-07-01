const Appliance = require('./appliance')
const appliance = new Appliance()

class Service {
    async serviceFIlterData(data, callBack) {
        let Data = []
        const match = await appliance.matchDataInput(data)
        await !match ? Data.push('KeyWord', data) : Data.push('Download', data)
        return callBack(null, Data)
    }

    async serviceGetDataYT(data, callBack) {
        let Data = []
        const getData = await appliance.getDataYoutube(data) 
        await !getData ? Data.push('can not find list project', null) : Data.push(null, getData)
        return callBack(Data[0], Data[1])
    }
}

module.exports = Service




















// const ytdl = require('ytdl-core')
// const {google} = require('googleapis')

// const ytSearch = (data, callBack) => {
//     const key = ''
//     const ytV3 = google.youtube({version: 'v3', auth: key})
//     var options = {
//         part: 'snippet',
//         maxResults: 5,
//         q: data
//     }
//     const loadVids =()=> {
//         ytV3.search.list(options, (err, results) => {
//             if(err){
//                 return callBack(err)
//             }else{
//                 return callBack(null, results.data.items)
//             }
//         })
//     }
//     loadVids()
// }

// app.get('/', (req, res) => { 
//     var {key} = req.query
//     var data = []
//     const getData = () => {
//         if(key == undefined){
//             data.push(null) 
//         }else{
//             return new Promise((resolve, reject)=>{
//                 ytSearch( key, function ( err, results) {
//                     data.push(results)
//                     err ? reject() : resolve()
//                 })
//             })
//         }
//     }
//     const sendData = () => {
//         console.log(data[0]);
//         res.render('home.ejs',{
//             data: data[0]
//         })
//     }
//     async function init(){
//         await getData()
//         sendData()
//     }
//     init()
// })

// app.get('/ytSearch', (req, res) => {
//     const key = 'AIzaSyAvDPuHlOD13Z5MyR7Yu8H84IuntgHWOg8'
//     const ytV3 = google.youtube({version: 'v3', auth: key})
//     var options = {
//         part: 'snippet',
//         maxResults: 5,
//         q: 'World'
//     }
//     const loadVids =()=> {
//         ytV3.search.list(options, (err, results) => {
//             if(err) throw err
//             console.log(results.data.items);
//         })
//     }
//     loadVids()
// })

// app.get('/process', (req, res) => {
//     var {data} = req.query
//     if(data == undefined){
//         res.redirect('/')
//     }else{
//         const found = data.match(/youtube.com\/watch\?v\=/i)
//         if(found){
//             var url = encodeURIComponent(data)
//             res.redirect('/download?url=' + url)
//         }else{
//             var key = encodeURIComponent(data)
//             res.redirect('/?key=' + key)
//         }
//     }
// })

// app.get('/download', (req, res) => {
//     var {url} = req.query
//     var title = []
//     const getTitle=()=>{
//         if(url == undefined){
//             title.push(undefined)
//         }else{
//             return new Promise((resolve, reject)=>{
//                 ytdl.getInfo(url, (err, results) => {
//                     title.push(results.title)
//                     err ? reject() : resolve()
//                 });
//             })
//         }
//     }
//     // DOWNLOAD
//     const getFile=()=>{
//         if(title[0] == undefined){
//             res.redirect('/')
//         }else{
//             res.header("Content-Disposition", 'attachment;\  filename='+title[0]+'.mp3');    
//             ytdl(url, {filter:'audioonly', format:'mp4'}).pipe(res);
//         }
//     }
//     async function init(){
//         await getTitle()
//         getFile()
//     }
//     init()
// });