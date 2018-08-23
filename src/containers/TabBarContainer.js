/**
 * Created by guangqiang on 2017/9/4.
 */
import React, {Component} from 'react'
import {StyleSheet, View, Image} from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import Picture from '../components/pages/picture/picture'
import Reading from '../components/pages/reading/reading'
import Music from '../components/pages/music/music'
import Movie from '../components/pages/movie/movie'
import Me from '../components/pages/me/me'
import {Icon} from '../utils/icon'
import {commonStyle} from '../utils'
import deviceInfo from '../utils/deviceInfo'

export default class MainPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'Movie'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator
            tabBarStyle={{height: commonStyle.tabBarHeight, paddingBottom: deviceInfo.isIphoneX ? 34 : 0}}
        >
          <TabNavigator.Item
            selected={this.state.selectedTab === 'Movie'}
            title="电影"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Icon name={'oneIcon|tb_Movie_o'} size={20} color={commonStyle.textGrayColor}/>}
            renderSelectedIcon={() => <Icon name={'oneIcon|tb_Movie_o'} size={20} color={commonStyle.black}/>}
            onPress={() => this.setState({ selectedTab: 'Movie' })}>
            <Movie/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'Music'}
            title="音乐"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Icon name={'oneIcon|tb_Music_o'} size={20} color={commonStyle.textGrayColor}/>}
            renderSelectedIcon={() => <Icon name={'oneIcon|tb_Music_o'} size={20} color={commonStyle.black}/>}
            onPress={() => this.setState({ selectedTab: 'Music' })}>
            <Music/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'Picture'}
            title="图文"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Icon name={'oneIcon|tb_Picture_o'} size={22} color={commonStyle.textGrayColor}/>}
            renderSelectedIcon={() => <Icon name={'oneIcon|tb_Picture_o'} size={22} color={commonStyle.black}/>}
            onPress={() => this.setState({ selectedTab: 'Picture' })}>
            <Picture/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'Reading'}
            title="阅读"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Icon name={'oneIcon|tb_article_o'} size={20} color={commonStyle.textGrayColor}/>}
            renderSelectedIcon={() => <Icon name={'oneIcon|tb_article_o'} size={20} color={commonStyle.black}/>}
            onPress={() => this.setState({ selectedTab: 'Reading' })}>
            <Reading/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'Me'}
            title="我的"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Icon name={'oneIcon|tb_mine_o'} size={20} color={commonStyle.textGrayColor}/>}
            renderSelectedIcon={() => <Icon name={'oneIcon|tb_mine_o'} size={20} color={commonStyle.black}/>}
            onPress={() => this.setState({ selectedTab: 'Me' })}>
            <Me/>
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
    fontSize: 11,
    color: commonStyle.textGrayColor,
    marginBottom: 5
  },
  selectedTabText: {
    fontSize: 11,
    color: commonStyle.black,
    marginBottom: 5
  }
})