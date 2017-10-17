/**
 * Created by guangqiang on 2017/8/17.
 */

import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

class ModalView extends React.Component {

  render(){
    return (
      <View style={styles.container}>
        <Text>ModalView</Text>
        <Button onPress={Actions.pop}>Back</Button>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
})

module.exports = ModalView
