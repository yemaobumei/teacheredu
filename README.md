# chorme-plugin-studyForceJump
#### 适用范围
chorme浏览器
#### 适用网站
http://study.teacheredu.cn/
#### 简介
学习课程的时候，一个课程学完了，不会自动跳转回课程列表进行下一个课程，个人觉得这样好麻烦。来个脚本自动化一下吧
于是就简单实现了这个可以直接跳转页面的插件
#### 安装方法
- 下载完项目代码.zip后,直接解压 （修改文件名如： studyForceJump）
- 打开chrome://extensions/地址进入扩展程序管理页面
- 开启右上角的`开发者模式`
- 点击左上角的`加载已解压的扩展程序`，选择刚才的文件夹
- 安装成功

#### 注意
浏览器版本高于88在安装时可能会出现错误警告(不影响正常使用)
这是由于manifest_version的版本为2的缘故。在未来版本3中，background脚本会作为service worker被加载，也就是说不能在后台脚本操作dom了，详见https://developer.chrome.com/docs/extensions/mv3/mv3-migration-checklist/
