# OneM
**OneM是一款纯ReactNative打造的基于杂志浏览、音乐播放、视频播放于一体的App,并且支持iOS和Android双平台**

# 目录
* [项目简介](#项目简介)
* [功能与特性](#功能与特性)
* [效果图预览](#效果图预览)
* [安装调试](#安装调试)
* [数据API](#数据API)
* [项目使用到的技术难点](#项目使用到的技术难点)
* [项目中使用到的常用三方库](#项目中使用到的常用三方库)
* [实战开发中遇到的坑](实战开发中遇到的坑)
* [后续待完成项](#后续待完成项)

# 项目简介
OneM是一款纯ReactNative开发的APP，也是个人的第一个RN开源项目。开发此项目纯属于个人对于RN的热爱，不包含任何商业成分。项目支持iOS和Android双平台。iOS支持最低版本为：8.0，Android支持最低版本为4.1。

# 功能与特性
**项目功能主要包括四大模块：**

* 图文模块
	* 图文杂志列表
	* 图文详情
* 阅读模块
	* 阅读文章列表
	* 阅读分类
	* 阅读详情
	* 阅读评论
* 音乐模块
	* 音乐列表
	* 音乐详情
	* 音乐播放器，仿网易音乐播放器页面，支持播放模式切换
* 电影
	* 热映中、即将上映电影列表
	* 电影详情
	* 电影预告片、花絮、照片墙列表
	* 电影播放器，仿爱奇艺视频播放器页面，支持横竖屏切换

# 效果图预览
![music_player](http://ovyjkveav.bkt.clouddn.com/17-10-20/10179473.jpg)
![movie_player](http://ovyjkveav.bkt.clouddn.com/17-10-20/36696887.jpg)
![pic_list](http://ovyjkveav.bkt.clouddn.com/17-10-20/36205040.jpg)

[查看更多预览图请点击]()

# 安装调试
1. git clone https://github.com/guangqiang-liu/OneM
2. npm install -g react-native-cli （如果之前安装过全局的react-native，此步骤请忽略）
3. npm install
4. react-native run-ios \ react-native run-androi

# API
**项目中数据来源于抓包**

[ONE](https://github.com/jokermonn/-Api/blob/master/ONEv3.5.0~.md)

[时光网](https://github.com/jokermonn/-Api/blob/master/Time.md)

# 项目使用到的技术点
* 项目数据交互使用react-native-router-flux与Redux框架混合搭建
* 项目中数据管理基于Redux框架全局Store管理
* 项目支持iconFont字体以及自定义font库
* 项目中接入蚂蚁金服ant-design-mobile组件库
* 项目中封装一套基于react-native-router-flux框架的AOP打点框架
* 自定义网络请求框架以及数据缓存
* 仿网易音乐播放功能、仿爱奇艺视频播放功能
* 自定义程序debug面板

# 项目中使用到的常用三方库
* antd-mobile
* react-dom
* react-native-blur // 原生依赖库
* react-native-button
* react-native-device-info // 原生依赖库
* react-native-image-zoom-viewer
* react-native-message-bar
* react-native-orientation //原生依赖库
* react-native-progress
* react-native-root-siblings
* react-native-root-toast
* react-native-router-flux
* react-native-scrollable-tab-view
* react-native-swiper
* react-native-tab-navigator
* react-native-vector-icons  // 原生依赖库
* react-native-video // 原生依赖库
* react-native-viewpager
* react-native-zoom-image
* react-navigation
* react-redux
* Redux
* redux-actions
* redux-promise-middleware
* redux-thunk

# 实战开发中遇到的坑
* 安卓报错：Error:Could not add entry '-6081986774160961524' to cache fileSnapshots.bin (/Users/guangqiang/Desktop/ProjectRepo/ReactNative/OneM/android/.gradle/2.14.1/taskArtifacts/fileSnapshots.bin).

# 后续待完成项

- [ ] 网络缓存
- [ ] debug面板
- [ ] 日志打点视图
- [ ] form表单组件
- [ ] iOS项目支持pod