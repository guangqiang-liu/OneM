/**
 * Created by guangqiang on 2017/9/7.
 */
import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Slider, ActivityIndicator, Modal} from 'react-native'
import Video from 'react-native-video'
import Orientation from 'react-native-orientation'
import {commonStyle} from '../../../utils/commonStyle'
import {Icon} from '../../../utils/icon'
import {Actions} from 'react-native-router-flux'
import {formatTime} from '../../../utils/formatTime'
import deviceInfo from '../../../utils/deviceInfo'
import {MessageBarManager} from 'react-native-message-bar'

var mp4Url = 'http://download.3g.joy.cn/video/236/60236937/1451280942752_hd.mp4'
export default class MoviePlayer extends Component {

  constructor(props) {
    super(props)
    this.player = null
    this.state = {
      rate: 1,
      slideValue: 0.00,
      currentTime: 0.00,
      duration: 0.00,
      paused: false,
      playIcon: 'music_paused_o',
      isTouchedScreen: true,
      modalVisible: true
    }
  }

  componentWillMount() {
    const init = Orientation.getInitialOrientation()
    this.setState({
      init,
      orientation: init,
      specificOrientation: init,
    })
  }

  componentDidMount() {
    Orientation.addOrientationListener(this._updateOrientation)
    Orientation.addSpecificOrientationListener(this._updateSpecificOrientation)
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._updateOrientation)
    Orientation.removeSpecificOrientationListener(this._updateSpecificOrientation)
  }

  _updateOrientation = orientation => this.setState({ orientation })
  _updateSpecificOrientation = specificOrientation => this.setState({ specificOrientation })

  loadStart(data) {
    console.log('loadStart', data)
  }

  setDuration(duration) {
    this.setState({duration: duration.duration})
  }

  setTime(data) {
    let sliderValue = parseInt(this.state.currentTime)
    this.setState({
      slideValue: sliderValue,
      currentTime: data.currentTime,
      modalVisible: false
    })
  }

  onEnd(data) {
    this.player.seek(0)
  }

  videoError(error) {
    this.showMessageBar('播放器报错啦！')(error.error.domain)('error')
    this.setState({
      modalVisible: false
    })
  }

  onBuffer(data) {
    console.log('onBuffer', data)
  }

  onTimedMetadata(data) {
    console.log('onTimedMetadata', data)
  }

  showMessageBar = title => msg => type => {
    MessageBarManager.showAlert({
      title: title,
      message: msg,
      alertType: type,
    })
  }

  play() {
    this.setState({
      paused: !this.state.paused,
      playIcon: this.state.paused ? 'music_paused_o' : 'music_playing_s'
    })
  }

  renderModal() {
    return (
      <Modal
        animationType={"none"}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {alert("Modal has been closed.")}}>
        <View style={styles.indicator}>
          <ActivityIndicator
            animating={true}
            style={[{height: 80}]}
            color={commonStyle.red}
            size="large"
          />
        </View>
      </Modal>
    )
  }

  render() {
    const {orientation} = this.state
    return (
      <TouchableOpacity
        style={[styles.movieContainer, {height: orientation === 'PORTRAIT' ? 250 : deviceInfo.deviceWidth, marginTop: orientation === 'PORTRAIT' ? 20 : 0}]}
        onPress={() => this.setState({isTouchedScreen: !this.state.isTouchedScreen})}
      >
        <Video source={{uri: mp4Url}}
               ref={(ref) => {this.player = ref}}
               rate={this.state.rate}
               volume={1.0}
               muted={false}
               paused={this.state.paused}
               resizeMode="cover"
               repeat={true}
               playInBackground={false}
               playWhenInactive={false}
               ignoreSilentSwitch={"ignore"}
               progressUpdateInterval={250.0}
               onLoadStart={(data) => this.loadStart(data)}
               onLoad={data => this.setDuration(data)}
               onProgress={(data) => this.setTime(data)}
               onEnd={(data) => this.onEnd(data)}
               onError={(data) => this.videoError(data)}
               onBuffer={(data) => this.onBuffer(data)}
               onTimedMetadata={(data) => this.onTimedMetadata(data)}
               style={styles.backgroundVideo}
        />
        <View style={styles.navContentStyle}>
          <TouchableOpacity style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
            onPress={orientation === 'PORTRAIT' ? () => Actions.pop() : Orientation.lockToPortrait}
          >
            <Icon name={'oneIcon|nav_back_o'} size={18} color={commonStyle.white}/>
          </TouchableOpacity>
        </View>
        {
          this.state.isTouchedScreen ?
            <View style={styles.toolBarStyle}>
              <TouchableOpacity onPress={() => this.play()}>
                <Icon name={`oneIcon|${this.state.playIcon}`} size={18} color={commonStyle.white}/>
              </TouchableOpacity>
              <View style={styles.progressStyle}>
                <Text style={styles.timeStyle}>{formatTime.formatMediaTime(Math.floor(this.state.currentTime))}</Text>
                <Slider
                  style={styles.slider}
                  value={this.state.slideValue}
                  maximumValue={this.state.duration}
                  minimumTrackTintColor={commonStyle.themeColor}
                  maximumTrackTintColor={commonStyle.iconGray}
                  step={1}
                  onValueChange={value => this.setState({currentTime: value})}
                  onSlidingComplete={value => this.player.seek(value)}
                />
                <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: 35}}>
                  <Text style={{color: commonStyle.white, fontSize: 12}}>{formatTime.formatMediaTime(Math.floor(this.state.duration))}</Text>
                </View>
              </View>
              {
                orientation === 'PORTRAIT' ? <TouchableOpacity onPress={Orientation.lockToLandscapeLeft}>
                  <Icon name={'oneIcon|scale_o'} size={18} color={commonStyle.white}/>
                </TouchableOpacity> : null
              }
            </View> : null
        }
        {this.renderModal()}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  movieContainer: {
    justifyContent: 'space-between'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  navBarStyle: {
    height: 64,
  },
  navContentStyle: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  toolBarStyle: {
    height: 30,
    backgroundColor: commonStyle.black,
    opacity: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-around'
  },
  timeStyle: {
    width: 35,
    color: commonStyle.white,
    fontSize: 12
  },
  slider: {
    flex: 1,
    marginHorizontal: 5,
    height: 20
  },
  progressStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 10
  },
  indicator: {
    height: 250,
    width: deviceInfo.deviceWidth,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
})