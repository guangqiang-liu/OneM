/**
 * Created by guangqiang on 2017/8/17.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import {Button} from './../../common/button'

export default class PageTwo extends Component {

  myClick() {
    alert('page two 点击')
  }

  render() {
    return (
      <View style={{margin: 128}}>
        <Text onPress={Actions.loginModal}>This is PageTwo!
        </Text>
        <Button
          vID='btn'
          style={styles.btn}
          onPress={(...args) => this.myClick()}
          title={'223dada'}
        >
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'red',
    width: 200,
    height: 200
  }
})

