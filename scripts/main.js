// // 定义颜色
// let color = '#3aa757';

// // 首次安装插件、插件更新、chrome浏览器更新时触发
// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color });
//   console.log('插件默认颜色为: %c #3aa757', `color: ${color}`);
// });

//寻找当前项目未完成的课程，自动跳转页面进入该课程学习
function select(){
  const pages = document.querySelectorAll(".number")
  for (j = 0; j < pages.length; j++) {
    pages[j].click() //切换页面
    var kc_list = document.querySelectorAll(".course-list-wrap .list-content .list-wrap .mt16")  //(".list-wrap-item mt16")
    for (i = 0; i < kc_list.length; i++) { 
        var progress = kc_list[i].querySelector(".el-progress__text span").innerHTML
        if ( progress !== "100%" ){
          kc_list[i].querySelector(".title-wrap .title").click()
          return
        }
    }
  }    
}
function endStudy(){
        ////结束学习
        document.querySelectorAll("#app .study-wrap .bottom .right .btn")[0].click()
        setTimeout(() => {
          ////确定结束学习
          var bl = document.querySelectorAll("button.el-button--primary")
          bl[bl.length-1].click()
        }, 5000);

}

function  start() {
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
    var this_min = 0
    var this_ts = 0
    if(temp[2] !== undefined){
      this_min = Number(temp[2])
    }
    if(temp[3] !== undefined){
      this_ts = Number(temp[3])
    }
    console.log("本次学习时间:",this_min,"分",this_ts,"秒")
    //若本次学习超过10分钟先结束学习，避免时间长了再结束，网络或者登陆状态失效，导致学习时长未记录
    if(this_min >= 10){
      endStudy()
      return
    }
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
    if ( kc_time_number <= total_min + this_min ){
      console.log("本课程学习结束")
      ////结束学习
      endStudy()
    }else{
      console.log("本课程还差",kc_time_number - dynamic_total_min,"分钟")  
    }

}

// setTimeout(start, 3000)
setInterval(start,10000)