import React, {Component} from "react"
import store from '../store'
import { Provider, connect } from 'react-redux'
import {Scene, Router, Actions, Reducer, ActionConst, Modal, Stack, Lightbox} from "react-native-router-flux"
import { View } from "react-native"
import Action from '../actions'
import {dispatch} from '../utils/venilog/dispatchLog'
import type from '../constants/actionType'
import {commonStyle} from '../utils/commonStyle'
// 启动页面
import Launch from '../components/Launch'

// 注册界面
import Register from "../components/Register"

// 登录界面
import Login from "../components/Login"

// 登录界面2
import Login2 from "../components/Login2"

// 登录界面3
import Login3 from "../components/Login3"

// 自己定义的测试组件
import HelloWold from '../components/HelloWord'

import PageOne from '../components/PageOne'

import PageTwo from '../components/PageTwo'

// home
import Home from "../components/Home"

import EchoView from "../components/EchoView"
import Blur from '../components/TestBlurComponent'

// 消息通知栏组件
import MessageBar from "../components/MessageBar"

import TabBar from './TabBarContainer'

import Error from '../components/Error'

import ModalView from '../components/ModalView'

import Mask from '../components/Mask'

import CustomComp from '../components/TestCustomUIComponent'

// COMMON
import Loading from '../utils/progressHUD/progressHUD'
import {EnhancedListViewTest} from '../components/EnhancedListViewDemo'
import SwiperComp from '../components/TestSwiperComponent'
import {ImgZoom} from '../components/TestImgZoomComponent'
// PAGES
import PicDetail from '../components/pages/picture/picDetail'
import PastList from '../components/pages/picture/pastList'
import PicGridList from '../components/pages/picture/picGridList'

import MovieDetail from '../components/pages/movie/movieDetail'
import MoviePlayer from '../components/pages/movie/moviePlayer'
import WebView from '../components/common/webView'
import MusicDetail from '../components/pages/music/musicDetail'
import MusicPlayer from '../components/pages/music/musicPlayer'
import MusicList from '../components/pages/music/musicList'
import BannerDetail from '../components/pages/reading/bannerDetail'
import ReadingTab from '../components/pages/reading/readingTabList'
import EssayDetail from '../components/pages/reading/essay/essayDetail'
import SerialDetail from '../components/pages/reading/serial/serialDetail'
import QuestionDetail from '../components/pages/reading/question/questionDetail'
import ReadingCommentList from '../components/pages/reading/commentList'
import ArticleList from '../components/pages/reading/readingArticleList'
const reducerCreate = params => {
  const defaultReducer = new Reducer(params)
  return (state, action) => {
    // TODO 这个地方处理Router系统事件, 触发dispatch
    action.type !== type.REACT_NATIVE_ROUTER_FLUX_SET_PARAMS ? dispatch(state)(action) : null
    return defaultReducer(state, action)
  }
}

const getSceneStyle = () => ({
  backgroundColor: "white",
  shadowOpacity: 1,
  shadowRadius: 3,
})

const scenes = Actions.create(
  <Scene key="root">
    <Modal key="modal" hideNavBar>
      {/* 在Lightbox栈中的子scene都可以显示mask */}
      <Lightbox key="lightbox" hideNavBar={true}>

        {/* PAGES */}
        <Stack key="init" back>
          <Scene key="launch" component={Launch}
                 hideNavBar />
          {/* 首页TabBar 上的四个组件没有办法绑定，只能单独写 */}
          <Scene key="main" initial back={false} hideNavBar component={TabBar}/>

          <Scene key="picDetail" hideNavBar component={connect(
            (state) => state.picture.picList,
            Action.dispatch('picture')
          )(PicDetail)}/>

          <Scene key="pastList"
                 navigationBarStyle={{backgroundColor: commonStyle.white}}
                 component={connect(
            (state) => state.picture.picList,
            Action.dispatch('picture')
          )(PastList)}/>

          <Scene key="picGridList" hideNavBar component={connect(
            (state) => state.picture.picList,
            Action.dispatch('picture')
          )(PicGridList)}/>

          <Scene key="movieDetail" title="电影详情" component={connect(
            (state) => state.movie.movieList,
            Action.dispatch('movie')
          )(MovieDetail)}/>

          <Scene key="moviePlayer" hideNavBar component={connect(
            (state) => state.movie.movieList,
            Action.dispatch('movie')
          )(MoviePlayer)}/>

          <Scene key="webView" component={WebView}/>

          <Scene key='musicDetail' hideNavBar component={connect(
            (state) => state.music.music,
            Action.dispatch('music')
          )(MusicDetail)}
          />

          <Scene key='musicList' hideNavBar component={connect(
            (state) => state.music.music,
            Action.dispatch('music')
          )(MusicList)}
          />

          <Scene key='musicPlayer' hideNavBar component={connect(
            (state) => state.music.music,
            Action.dispatch('music')
          )(MusicPlayer)}/>

          <Scene key='bannerDetail' hideNavBar component={connect(
            (state) => state.reading.reading,
            Action.dispatch('reading')
          )(BannerDetail)}/>

          <Scene key='readingTab' hideNavBar component={ReadingTab}/>

          <Scene key='essayDetail' hideNavBar component={connect(
            (state) => state.reading.essay,
            Action.dispatch('reading')
          )(EssayDetail)}/>

          <Scene key='serialDetail' hideNavBar component={connect(
            (state) => state.reading.serial,
            Action.dispatch('reading')
          )(SerialDetail)}/>

          <Scene key='questionDetail' hideNavBar component={connect(
            (state) => state.reading.question,
            Action.dispatch('reading')
          )(QuestionDetail)}/>

          <Scene key='articleList' hideNavBar component={connect(
            (state) => state.reading.reading,
            Action.dispatch('reading')
          )(ArticleList)}/>

          {/* 当helloWord组件放到和main组件同级的scene层级中，这时就可以继承同级中的导航栏 */}
          <Scene key="helloWord" component={
            connect(
            (state) => state.find.chat,
            Action.dispatch('openChat')
          )(HelloWold)}/>

          <Scene key="blur" component={Blur}/>

          <Scene key="pageOne" hideNavBar component={PageOne}/>
          <Scene key="pageTwo" component={PageTwo}/>

          {/* clone：使用clone标识的Scenes将被作为模版处理，并克隆到当前的scene的容器中 */}
          <Scene key="echo" clone component={EchoView}
                 getTitle={({navigation}) => navigation.state.key}/>
          {/* 这里使用了type这个属性，设置界面的跳转样式 */}
          <Scene key="home" component={Home}
                 title="Replace"
                 type={ActionConst.REPLACE}/>

          <Scene key="register" component={Register}
                 title="Register"/>
          <Scene key="register2" component={Register}
                 title="Register2"/>
          <Scene key="customComp" title ='测试自定义组件' component={CustomComp}/>
          <Scene key="enhancedListView" title ='测试ListView' component={connect(
            (state) => state.movie.movieList,
            Action.dispatch('movie')
          )(EnhancedListViewTest)}/>
          <Scene
            key='SwiperComp'
            title='Swiper'
            component={SwiperComp}
          />

          <Scene
            key='imgZoom'
            title='ImgZoom'
            component={ImgZoom}
          />

        </Stack>

        {/* MASK */}
        <Scene key='loading' component={connect(
          (state) => state.common.loading
        )(Loading)}/>
        <Scene key="error" component={Error}/>
        <Scene key="mask" component={Mask}/>
      </Lightbox>

      {/* 在Modal栈中的子scene都属于模态scene */}
      <Stack key="modalRoot" back>
        <Scene key="modalView" component={ModalView}/>
      </Stack>
      <Stack key="login" titleStyle={{alignSelf: "center"}}>
        <Scene component={Login} title="Login"
               key="loginModal"
               onExit={() => console.log("onExit")}
               leftTitle="Cancel" onLeft={Actions.pop}/>
        <Scene
          key="loginModal2"
          component={Login2}
          title="Login2"
          backTitle="Back"
          panHandlers={null}
          duration={1}/>
        <Scene
          key="loginModal3"
          hideNavBar
          component={Login3}
          title="Login3"
          panHandlers={null}
          duration={1}/>
      </Stack>
    </Modal>
  </Scene>
)

class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Router
          scenes={scenes}
          createReducer={reducerCreate}
          tintColor="orange"
          getSceneStyle={getSceneStyle}
        />
        <MessageBar />
      </View>
    )
  }
}

const initApp = () => {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}

export default initApp