# OneM
**OneM是一款纯ReactNative打造的集杂志浏览、音乐播放、视频播放于一体的综合性App,并且支持iOS和Android双平台**

# 目录
* [项目简介](#项目简介)
* [主要功能](#主要功能)
* [效果图预览](#效果图预览)
* [安装调试](#安装调试)
* [数据API](#数据API)
* [技术要点](#技术要点)
* [使用到的常用三方库](#使用到的常用三方库)
* [实战开发中遇到的坑](实战开发中遇到的坑)
* [后续待完成事项](#后续待完成事项)
* [总结](#总结)

# 项目简介
OneM是一款纯ReactNative开发的APP，也是作者开发的第三个RN项目，前两个项目是公司企业上线项目，OneM是作者独立开发的第一个RN开源项目。此项目框架搭建完全按照企业级项目框架标准搭建而成，开发时长大约1个多月，后期也会长期迭代更新维护。项目目前支持iOS和Android双平台。iOS支持最低版本为：8.0，Android支持最低版本为：4.1。

# 主要功能
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

[查看更多预览图请点击](https://github.com/guangqiang-liu/OneM-preview)

# 安装调试
1. `git clone https://github.com/guangqiang-liu/OneM`
2. `npm install -g react-native-cli`（如果之前安装过全局的react-native-cli请忽略此步骤）
3. `npm install`
4. `react-native run-ios \ react-native run-androi`

# 数据API
**项目中使用到的数据来源于网络抓包，在此也感谢前人总结的API文档**

[ONE](https://github.com/jokermonn/-Api/blob/master/ONEv3.5.0~.md)

[时光网](https://github.com/jokermonn/-Api/blob/master/Time.md)

# 技术要点
* 使用react-native-router-flux与Redux结合搭建项目框架
* 项目中数据管理基于Redux框架全局Store管理
* 项目支持iconFont字体以及支持自定义font库
* 项目中接入蚂蚁金服ant-design-mobile组件库
* 封装了一套基于react-native-router-flux框架的AOP打点框架
* 自定义网络请求框架以及数据缓存
* 支持同时适配iOS、Android样式表，只需要一个`_`即可轻松搞定
* iOS支持自动管理键盘弹出遮挡问题
* 仿网易音乐播放功能、仿爱奇艺视频播放功能
* 自定义debug面板，App中便捷切换各种开发环境

# 使用到的常用三方库
* antd-mobile
* react-dom
* react-native-blur // 原生依赖库
* react-native-button
* react-native-device-info // 原生依赖库
* react-native-image-zoom-viewer
* react-native-message-bar
* react-native-orientation // 原生依赖库
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
* Android编译报错：Error:Could not add entry '-6081986774160961524' to cache fileSnapshots.bin (/Users/guangqiang/Desktop/ProjectRepo/ReactNative/OneM/android/.gradle/2.14.1/taskArtifacts/fileSnapshots.bin).
* 待补充

# 后续待完成事项
- [ ] 网络缓存
- [ ] 自定义debug面板
- [ ] 日志打点视图
- [ ] form表单组件
- [ ] iOS项目支持pod
- [ ] 优化代码，修改bug
- [ ] 待补充

# 总结
**由于项目中大量使用到redux和router-flux框架知识，对于初学者来说还是有一定的难度的，不过没有关系，只要您认认真真多阅读项目源码，多断点调试，肯定可以很快掌握项目中涉及到的知识。最后，希望OneM能给您带来不一样的收货，同时也希望同学们能多多转发，多多交流(QQ交流群：620792950)。**

**看在我这么认真做技术的份上，希望`老铁们`动动您那发财的小手，给个`star`，给个`fork`。当然也衷心的欢迎同学们提些宝贵的意见和建议！**