/**
 * Created by guangqiang on 2017/9/7.
 */
import React, {Component} from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import Video from 'react-native-video'
var mp4Url = 'http://download.3g.joy.cn/video/236/60236937/1451280942752_hd.mp4'
export default class MoviePlayer extends Component {

  constructor(props) {
    super(props)
    this.player = ''
    // this.loadStart = this.loadStart.bind(this)
    // this.setDuration = this.setDuration.bind(this)
    // this.setTime = this.setTime.bind(this)
    // this.onEnd = this.onEnd.bind(this)
    // this.videoError = this.videoError.bind(this)
    // this.onBuffer = this.onBuffer.bind(this)
    // this.onTimedMetadata = this.onTimedMetadata.bind(this)
    this.state = {
      rate: 0
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={{height: 300}}
        onPress={() => this.setState({rate: this.state.rate === 0 ? 1 : 0})}
      >
        <Video source={{uri: mp4Url}}
               ref={(ref) => {this.player = ref}}                                      // Store reference
               rate={this.state.rate}                              // 0 is paused, 1 is normal.
               volume={1.0}                            // 0 is muted, 1 is normal.
               muted={false}                           // Mutes the audio entirely.
               paused={false}                          // Pauses playback entirely.
               resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
               repeat={true}                           // Repeat forever.
               playInBackground={false}                // Audio continues to play when app entering background.
               playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
               ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
               progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
               onLoadStart={this.loadStart}            // Callback when video starts to load
               onLoad={this.setDuration}               // Callback when video loads
               onProgress={this.setTime}               // Callback every ~250ms with currentTime
               onEnd={this.onEnd}                      // Callback when playback finishes
               onError={this.videoError}               // Callback when video cannot be loaded
               onBuffer={this.onBuffer}                // Callback when remote video is buffering
               onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
               style={styles.backgroundVideo} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'red'
  }
})