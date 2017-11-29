import React, {Component} from "react"
import store from '../store'
import {Provider, connect} from 'react-redux'
import {Scene, Router, Actions, Reducer, ActionConst, Modal, Stack, Lightbox} from "react-native-router-flux"
import {View} from "react-native"
import Action from '../actions'
import {dispatch} from '../utils/venilog/dispatchLog'
import type from '../constants/actionType'
import {commonStyle} from '../utils/commonStyle'

import Launch from '../components/pages/demoPage/Launch'
import Register from "../components/pages/demoPage/Register"
import Login from "../components/pages/demoPage/Login"
import Login2 from "../components/pages/demoPage/Login2"
import Login3 from "../components/pages/demoPage/Login3"
import EchoView from "../components/pages/demoPage/EchoView"
import PageOne from '../components/pages/demoPage/PageOne'
import PageTwo from '../components/pages/demoPage/PageTwo'
import Error from '../components/pages/demoPage/Error'
import ModalView from '../components/pages/demoPage/ModalView'
import Mask from '../components/pages/demoPage/Mask'
import Author from '../components/pages/me/author'

import Loading from '../utils/progressHUD/progressHUD'
import {EnhancedListViewTest} from '../components/pages/demoPage/EnhancedListViewDemo'
import SwiperComp from '../components/pages/demoPage/TestSwiperComponent'
import {ImgZoom} from '../components/pages/demoPage/TestImgZoomComponent'
import TestMessageBar from '../components/pages/demoPage/TestMessageBar'
import TestAntdMobile from '../components/pages/demoPage/TestAntdMobile'
import TestOrientation from '../components/pages/demoPage/TestOrientation'
import TestIcon from '../components/pages/demoPage/TestIcon'
import TestScrollableTabView from '../components/pages/demoPage/TestScrollable-tab-view'
import TestViewPager from '../components/pages/demoPage/TestViewPager'
import Blur from '../components/pages/demoPage/TestBlurComponent'
import MessageBar from "../utils/messageBar/MessageBar"

import TestRedux from "../components/pages/demoPage/TestRedux"
import CustomComp from '../components/pages/demoPage/TestCustomUIComponent'
import Network from '../components/pages/demoPage/TestNetwork'
import TestLogDot from '../components/pages/demoPage/TestLogDot'

import DemoPage from '../components/pages/me/demo'


import TabBar from './TabBarContainer'
import PicDetail from '../components/pages/picture/picDetail'
import PastList from '../components/pages/picture/pastList'
import PicGridList from '../components/pages/picture/picGridList'

import MovieDetail from '../components/pages/movie/movieDetail'
import MoviePlayer from '../components/pages/movie/moviePlayer'
import TrailerList from '../components/pages/movie/movieTrailerList'
import MiniCommentList from '../components/pages/movie/comment/miniCommentList'
import PlusCommentList from '../components/pages/movie/comment/plusCommentList'
import ActorList from '../components/pages/movie/actor/actorList'
import PictureList from '../components/pages/movie/picture/pictureList'

import MusicDetail from '../components/pages/music/musicDetail'
import MusicPlayer from '../components/pages/music/musicPlayer'
import MusicList from '../components/pages/music/musicList'

import BannerDetail from '../components/pages/reading/bannerDetail'
import ReadingTab from '../components/pages/reading/readingTabList'
import EssayDetail from '../components/pages/reading/essay/essayDetail'
import SerialDetail from '../components/pages/reading/serial/serialDetail'
import QuestionDetail from '../components/pages/reading/question/questionDetail'
import ArticleList from '../components/pages/reading/readingArticleList'

import UserLogin from '../components/pages/me/login/login'
import UserRegister from '../components/pages/me/register/register'
import Setting from '../components/pages/me/setting'
import UserInfo from '../components/pages/me/userInfo'

import SelectorList from '../components/common/selector'
import WebView from '../components/common/webView'

const reducerCreate = params => {
  const defaultReducer = new Reducer(params)
  return (state, action) => {
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
      <Lightbox key="lightbox" hideNavBar={true}>

        <Stack key="init" back>
          <Scene key="launch" component={Launch}
                 hideNavBar />

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

          <Scene key="movieDetail" hideNavBar component={connect(
            (state) => state.movie.movieDetail,
            Action.dispatch('movie')
          )(MovieDetail)}/>

          <Scene key="moviePlayer" hideNavBar component={connect(
            (state) => state.movie.movieList,
            Action.dispatch('movie')
          )(MoviePlayer)}/>

          <Scene key="trailerList" hideNavBar component={connect(
            (state) => state.movie.movieList,
            Action.dispatch('movie')
          )(TrailerList)}/>

          <Scene key="miniComment" hideNavBar component={connect(
            (state) => state.movie.commentList,
            Action.dispatch('movie')
          )(MiniCommentList)}/>

          <Scene key="plusComment" hideNavBar component={connect(
            (state) => state.movie.commentList,
            Action.dispatch('movie')
          )(PlusCommentList)}/>

          <Scene key="actorList" hideNavBar  component={connect(
            (state) => state.movie.actor,
            Action.dispatch('movie')
          )(ActorList)}/>

          <Scene key="pictureList" hideNavBar component={connect(
            state => state.movie.picture,
            Action.dispatch('movie')
          )(PictureList)}/>

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

          <Scene key='userLogin' hideNavBar component={connect(
            (state) => state.me.login,
            Action.dispatch(['login', 'openChat'])
          )(UserLogin)}/>

          <Scene key='userRegister' hideNavBar component={connect(
            state => state.me.register,
            Action.dispatch('register')
          )(UserRegister)}/>

          <Scene key='setting' hideNavBar component={connect(
            state => state.me.register,
            Action.dispatch('register')
          )(Setting)}/>

          <Scene key='userInfo' hideNavBar component={UserInfo}/>

          <Scene key="author" title="作者" hideNavBar component={Author}/>

          <Scene key='selector' hideNavBar component={SelectorList}/>

          <Scene key="webView" hideNavBar component={WebView}/>

          {/** ############### demo组件 ############### **/}

          <Scene key="demoPage" title="Demo集合" hideNavBar component={DemoPage}/>

          <Scene key="register" title="Register" component={Register}/>

          <Scene key="register2" title="Register2" component={Register}/>

          <Scene key="pageOne" hideNavBar component={PageOne}/>

          <Scene key="pageTwo" component={PageTwo}/>

          <Scene key="echo" clone component={EchoView}
                 getTitle={({navigation}) => navigation.state.key}/>

          <Scene key="enhancedListView" title ='测试ListView' component={connect(
            (state) => state.movie.movieList,
            Action.dispatch('movie')
          )(EnhancedListViewTest)}/>

          <Scene key="blur" title="blur" component={Blur}/>

          <Scene key="testMessageBar" title="testMessageBar" component={TestMessageBar}/>

          <Scene key="testAntdMobile" title="testAntdMobile" component={TestAntdMobile}/>

          <Scene key="testOrientation" title="testOrientation" component={TestOrientation}/>

          <Scene key='SwiperComp' title='Swiper' component={SwiperComp}/>

          <Scene key='imgZoom' title='ImgZoom' component={ImgZoom}/>

          <Scene key='testIcon' title='TestIcon' component={TestIcon}/>

          <Scene key='testScrollableTabView' title='TestScrollableTabView' component={TestScrollableTabView}/>

          <Scene key='testViewPager' title='TestViewPager' component={TestViewPager}/>

          <Scene key="testRedux" component={TestRedux}
                 title="Replace"
                 type={ActionConst.REPLACE}/>

          <Scene key="testLogDot" title='testLogDot' component={TestLogDot}/>

          <Scene key="network" title='网络请求' component={
            connect(
              (state) => state.find.chat,
              Action.dispatch('openChat')
            )(Network)}/>

          <Scene key="customComp" title='包装原生组件' component={CustomComp}/>

        </Stack>

        <Scene key='loading' component={connect(
          (state) => state.common.loading
        )(Loading)}/>
        <Scene key="error" component={Error}/>
        <Scene key="mask" component={Mask}/>

      </Lightbox>

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
          tintColor='white'
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