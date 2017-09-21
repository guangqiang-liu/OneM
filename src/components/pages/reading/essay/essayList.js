/**
 * Created by guangqiang on 2017/9/20.
 */
import React, {Component} from 'react'
import {View, StyleSheet, ListView, Text, Image} from '../../../common'
class EssayList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <View>
        <Text>dada</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})