/**
 * Created by guangqiang on 2017/9/4.
 */

import React, {Component} from 'react'

import {
  StyleSheet,
  View,
  Image
} from 'react-native'

import TabNavigator from 'react-native-tab-navigator'

import Picture from '../components/pages/picture/picture'
import Reading from '../components/pages/reading/reading'
import Music from '../components/pages/music/music'
import Movie from '../components/pages/movie/movie'
import TabBar1 from '../components/Tab1'
export default class MainPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'Event'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'Event'}
            title="图文"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Image style={styles.icon} source={require("../assets/images/home.png")} />}
            renderSelectedIcon={() => <Image style={[styles.icon,{tintColor:'red'}]} source={require("../assets/images/home_active.png")} />}
            onPress={() => this.setState({ selectedTab: 'Event' })}>
            <Picture/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'Log'}
            title="阅读"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Image style={styles.icon} source={require("../assets/images/reading.png")} />}
            renderSelectedIcon={() => <Image style={[styles.icon,{tintColor:'red'}]} source={require("../assets/images/reading_active.png")} />}
            onPress={() => this.setState({ selectedTab: 'Log' })}>
            <Reading/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'Device'}
            title="音乐"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Image style={styles.icon} source={require("../assets/images/music.png")} />}
            renderSelectedIcon={() => <Image style={[styles.icon,{tintColor:'red'}]} source={require("../assets/images/music_active.png")} />}
            onPress={() => this.setState({ selectedTab: 'Device' })}>
            <TabBar1/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'User'}
            title="电影"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Image style={styles.icon} source={require("../assets/images/movie.png")} />}
            renderSelectedIcon={() => <Image style={[styles.icon,{tintColor:'red'}]} source={require("../assets/images/movie_active.png")} />}
            onPress={() => this.setState({ selectedTab: 'User' })}>
            <Movie/>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabText: {
    fontSize: 10,
    color: 'black'
  },
  selectedTabText: {
    fontSize: 10,
    color: 'red'
  },
  icon: {
    width: 22,
    height: 22
  }
})