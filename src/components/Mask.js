/**
 * Created by guangqiang on 2017/8/17.
 */

import React, {Component} from 'react'
import {View, Text} from 'react-native'
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

class Mask extends Component {

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}}>
        <Text>Mask</Text>
        <Button onPress={() => Actions.home()}>Mask</Button>
      </View>
    )
  }
}

export default Mask