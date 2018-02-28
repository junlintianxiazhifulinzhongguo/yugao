const qiniu=require('qiniu')
const nanoid=require('nanoid')
const config=require('../config/index')
var accessKey = config.qiniu.AK
var secretKey = config.qiniu.SK
var bucket=config.qiniu.bucket
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var configQiNiu = new qiniu.conf.Config();
configQiNiu.zone = qiniu.zone.Zone_z2;
var bucketManager = new qiniu.rs.BucketManager(mac, configQiNiu);
const uploadQiNiu=async (url,key)=>{
  return new Promise((resolve,reject)=>{
    bucketManager.fetch(url, bucket, key, function(err, respBody, respInfo) {
      if (err) 
      {
        reject(err);
      } 
      else 
      {
        if (respInfo.statusCode == 200) 
        {
          resolve({key});
        } 
        else 
        {
          reject(respBody);
        }
      }
    })
  })
}

module.exports=async (result)=>{
  
 result.map(async res=>{
      let {cover,hdVideoUrl,hcVideoUrl,heVideoUrl}=res
      if(hdVideoUrl||hcVideoUrl||heVideoUrl)
      {
        try{
            let coverData=await uploadQiNiu(cover,nanoid()+'.jpg')
            if(coverData.key)
            {
              res.coverData=coverData.key
            }
            if(hdVideoUrl)
            {
              let hdVideoData=await uploadQiNiu(hdVideoUrl,nanoid()+'.mp4')
              if(hdVideoData.key)
              {
                res.hdVideoData=hdVideoData.key
              }
            }
            if(heVideoUrl)
            {
              let heVideoData=await uploadQiNiu(heVideoUrl,nanoid()+'.mp4')
              if(heVideoData.key)
              {
                res.heVideoData=heVideoData.key
              }
            }
            if(hcVideoUrl)
            {
              let hcVideoData=await uploadQiNiu(hcVideoUrl,nanoid()+'.mp4')
              if(hcVideoData.key)
              {
                res.hcVideoData=hcVideoData.key
              }
            }
           console.log(res)
        }catch(err)
        {
          console.log(err)
        }
      }
    })
}  




// return new Promise((resolve,reject)=>{
//   bucketManager.fetch(url, bucket, key,(err, respBody, respInfo)=>{
//       if (err)
//       {
//         reject(err);
//       }
//       else 
//       {
//         if (respInfo.statusCode == 200) 
//         {
//           resolve({key});
//         } 
//         else 
//         {
//           reject(respInfo.statusCode);
//         }
//       }
//     });
// })