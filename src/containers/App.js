import React, {Component} from "react"
import store from '../store'
import { Provider, connect } from 'react-redux'
import {Scene, Router, Actions, Reducer, ActionConst, Modal, Stack, Lightbox} from "react-native-router-flux"

import { View } from "react-native"
import Action from '../actions'

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

// 消息通知栏组件
import MessageBar from "../components/MessageBar"

import TabBar from './TabBarContainer'

import Error from '../components/Error'

import ModalView from '../components/ModalView'

import Mask from '../components/Mask'

import PicDetail from '../components/pages/picture/picDetail'
import PastList from '../components/pages/picture/pastList'
import PicGridList from '../components/pages/picture/picGridList'


// 创建一个reducer
const reducerCreate = params => {
  const defaultReducer = new Reducer(params)
  return (state, action) => {
    return defaultReducer(state, action)
  }
}

// sceen 全局样式
const getSceneStyle = () => ({
  backgroundColor: "white",
  shadowOpacity: 1,
  shadowRadius: 3,
})

const scenes = Actions.create(
  <Scene key="root">
    <Modal key="modal" hideNavBar>
      {/* 在Lightbox容器中的儿子scene都属于蒙板scene */}
      <Lightbox key="lightbox" hideNavBar={true}>
        <Stack key="init" back>
          <Scene key="launch" component={Launch}
                 hideNavBar />
          {/* 首页TabBar 上的四个组件没有办法绑定，只能单独写 */}
          <Scene key="main" initial back={false} hideNavBar component={TabBar}/>

          <Scene key="picDetail" component={connect(
            (state) => state.picture.picList,
            Action.dispatch('picList')
          )(PicDetail)}/>

          <Scene key="pastList" component={connect(
            (state) => state.picture.picList,
            Action.dispatch('picList')
          )(PastList)}/>

          <Scene key="picGridList" component={connect(
            (state) => state.picture.picList,
            Action.dispatch('picList')
          )(PicGridList)}/>

          {/* 当helloWord组件放到和main组件同级的scene层级中，这时就可以继承同级中的导航栏 */}
          <Scene key="helloWord" component={
            connect(
            (state) => state.find.chat,
            Action.dispatch('openChat')
          )(HelloWold)}/>

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
        </Stack>

        {/* Error 蒙板 */}
        <Scene key="error" component={Error}/>
        <Scene key="mask" component={Mask}/>
      </Lightbox>

      {/* 在Modal容器中的儿子scene都属于模态scene */}
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