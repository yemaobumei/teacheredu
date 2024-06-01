// function changeLinkHref () {
//   // https://link.jianshu.com?t=xxxxxx 简书
//   // https://links.jianshu.com/go?to=xxxxxx 简书2
//   // https://link.juejin.cn/?target=xxxxx 掘金
//   // https://link.zhihu.com/?target=xxxxx 知乎
//   const links = document.querySelectorAll('a')
//   const reg = /(?:cn\/\?target|com?\/\?t|com\/\?target|com\/go\?to)=(.*)/
//   let count = 0;
//   links.forEach(link => {
//     const match = reg.exec(link.href)
//     if(match && match[1]) {
//       link.href = decodeURIComponent(match[1])
//       count++
//     }
//   })
//   // csdn是通过添加事件来改写link跳转逻辑的，因此需要移除事件才行
//   const csdnHack = document.querySelector('#content_views')
//   if(csdnHack) {
//     csdnHack.replaceWith(csdnHack.cloneNode(true));
//     count += csdnHack.querySelectorAll('a').length
//   }
//   console.log(`本页面共 ${count} 个外链现在可以直接跳转了 --forceJump插件`)
// }

var flag = true

function select(){
  const kc_list = document.querySelectorAll(".course-list-wrap .list-content .list-wrap .mt16")  //(".list-wrap-item mt16")
  for (i = 0; i < kc_list.length; i++) { 
      const progress = kc_list[i].querySelector(".el-progress__text span").innerHTML
      if ( progress !== "100%" && flag ){

        kc_list[i].querySelector(".title-wrap .title").click()
        return
      }
   }  
}


function  start () {
    // const td = document.querySelector("#app").innerText
    // console.log(td)
    select()
    //课程时长
    const kc_duration = document.querySelectorAll("#app .content .right .jieshao-wrap .mt20")[3].innerHTML
    // console.log("课程时长:" + kc_duration)
    const kc_time = /(\d+) 分钟/g.exec(kc_duration)[1]
    const kc_time_number = Number(kc_time)
    console.log("课程时长:" + kc_time,"分")

    //获取本次学习时间
    const this_duration = document.querySelectorAll("#app .study-wrap .bottom .right .mr30 span")[0].innerHTML
    // console.log("本次学习时间:" + this_duration)
    var temp = /((\d+)分钟){0,1}(\d+)秒/g.exec(this_duration)
    const this_study_duration = (temp[2] + temp[3]).replace("undefined","")//如果没有几分则为undefined，需要替换成空字符
    var this_min = 0
    var this_ts = 0
    if(temp[2] !== undefined){
      this_min = Number(temp[2])
    }
    if(temp[3] !== undefined){
      this_ts = Number(temp[3])
    }
    console.log("本次学习时间:",this_min,"分",this_ts,"秒")

    //获取累计学习时间
    const study_ts = document.querySelectorAll("#app .study-wrap .bottom .right .mr30 span")[1].innerHTML
    temp = /((\d+)分钟){0,1}((\d+)秒){0,1}/g.exec(study_ts)
    var total_min = 0
    if(temp[2] !== undefined){
      total_min = Number(temp[2])
    }
    var total_ts = 0
    if(temp[4] !== undefined){
      total_ts = Number(temp[4])
    }
    // console.log(total_min,total_ts)
    console.log("累计学习时间:",total_min,"分",total_ts,"秒")
    const dynamic_total_min = total_min + this_min
    console.log("动态累计学习时间:",dynamic_total_min,"课程要求时间:",kc_time_number)
    if ( kc_time_number < total_min + this_min ){
      console.log("本课程学习结束")
      ////结束学习
      document.querySelectorAll("#app .study-wrap .bottom .right .btn")[0].click()
      ////确定结束学习
      document.querySelectorAll("button.el-button--primary")[0].click()
    }else{
      console.log("本课程还差",kc_time_number - dynamic_total_min,"分钟")
      ////结束学习
      // document.querySelectorAll("#app .study-wrap .bottom .right .btn")[0].click()
      // ////确定结束学习
      // document.querySelectorAll("button.el-button--primary")[0].click()      
    }

}

// setTimeout(start, 3000)
setInterval(start,10000)