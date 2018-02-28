const rpn=require('request-promise-native')

module.exports={
    sleep:time=>new Promise(resolve=>{
        setTimeout(resolve,time)
    }),
    fetchMovie:async(movies)=>{
        const url=`http://www.yinyuetai.com/api/info/get-video-urls?videoId=`
        for (let movie of movies)
        {
            let movieData=await rpn(url+movie.id)
            try{
                movieData=JSON.parse(movieData)
                movie.hdVideoUrl=movieData.hdVideoUrl?movieData.hdVideoUrl:null
                movie.hcVideoUrl=movieData.hcVideoUrl?movieData.hcVideoUrl:null
                movie.heVideoUrl=movieData.heVideoUrl?movieData.heVideoUrl:null       
            }catch(err)
            {
                console.log(err)
            }  
        }
        return movies       
    },





}