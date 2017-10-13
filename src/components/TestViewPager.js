/**
 * Created by guangqiang on 2017/10/13.
 */
import React, {Component} from 'react'
import {View, Text} from 'react-native'
import ViewPager from 'react-native-viewpager'
export default class TestViewPager extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ViewPager.DataSource({pageHasChanged:(p1, p2) => p1!== p2})
    }
  }

  _renderPage() {
    return (
      <View style={{flex: 1, backgroundColor: 'red'}}>
        <Text>dadada</Text>
      </View>
    )
  }

  render() {
    let dataSource = this.state.dataSource.cloneWithPages([1, 2, 3, 4])
    return (
      <View style={{flex: 1, marginTop: 10}}>
        <ViewPager
          dataSource={dataSource}
          renderPage={this._renderPage}/>
      </View>
    )
  }
}