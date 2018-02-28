const puppeteer = require('puppeteer')
const rpn=require('request-promise-native')
const test=require('./test')


;(async () => {
    const browser = await puppeteer.launch({
        args:['--no-sandbox'],
        dumpio:false
    });
    const page = await browser.newPage();
    await page.goto('http://www.yinyuetai.com/',{
        waitUntil:'networkidle2'
    });
    test.sleep(1000)
    const res = await page.evaluate(() => {
      let mvOne=$('.mv_one')
      let items=[]
      if(mvOne.length>=1)
      {
          $(mvOne).each((index,ele)=>{
            let item=$(ele)
            let url=item.find('a').attr('href')
            let cover=item.find('img').attr('src')
            let title=item.find('h5').text()
            let singer=item.find('p').text()
            let id=url.substr(url.indexOf('video/') + 6); ;                 
            items.push({
                url,
                id,
                cover,
                title,
                singer
            })               
          })
      }
      return items
    });
   // console.log(res)
    let result=await test.fetchMovie(res)
    await browser.close();
    process.send({result})
    process.exit(0)
})();