/**
 * Created by guangqiang on 2017/8/17.
 */

import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Image
} from 'react-native'

import TabNavigator from 'react-native-tab-navigator'

//  四个tabBar页面
import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Tab3 from './Tab3'
import Tab4 from './Tab4'

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
            title="Event"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Image style={styles.icon} source={require("../assets/images/menu_burger.png")} />}
            renderSelectedIcon={() => <Image style={[styles.icon,{tintColor:'red'}]} source={require("../assets/images/back_chevron.png")} />}
            onPress={() => this.setState({ selectedTab: 'Event' })}>
            <Tab1/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'Log'}
            title="Log"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Image style={styles.icon} source={require("../assets/images/menu_burger.png")} />}
            renderSelectedIcon={() => <Image style={[styles.icon,{tintColor:'red'}]} source={require("../assets/images/back_chevron.png")} />}
            onPress={() => this.setState({ selectedTab: 'Log' })}>
            <Tab2/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'Device'}
            title="Device"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Image style={styles.icon} source={require("../assets/images/menu_burger.png")} />}
            renderSelectedIcon={() => <Image style={[styles.icon,{tintColor:'red'}]} source={require("../assets/images/back_chevron.png")} />}
            onPress={() => this.setState({ selectedTab: 'Device' })}>
            <Tab3/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'User'}
            title="User"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Image style={styles.icon} source={require("../assets/images/menu_burger.png")} />}
            renderSelectedIcon={() => <Image style={[styles.icon,{tintColor:'red'}]} source={require("../assets/images/back_chevron.png")} />}
            onPress={() => this.setState({ selectedTab: 'User' })}>
            <Tab4/>
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
