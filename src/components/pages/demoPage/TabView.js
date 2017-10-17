import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View, ViewPropTypes} from "react-native";
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

const contextTypes = {
  drawer: React.PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string,
};

class TabView extends React.Component {

  render() {
    return (
      <View style={[styles.container, this.props.sceneStyle ]}>
        <Text>Tab title:{this.props.title} name:{this.props.name}</Text>
        <Text>Tab data:{this.props.data}</Text>
        <Button onPress={Actions.pop}>Back</Button>
        <Button onPress={() => { Actions.register()}}>注册模块</Button>
        <Button onPress={() => { Actions.login()}}>登录模块</Button>
        <Button onPress={() => { Actions.helloWord()}}>Helloword</Button>
        <Button onPress={() => { Actions.pageOne()}}>pageOne</Button>
        <Button onPress={() => { Actions.pageTwo({ data: 'test!' })}}>pageTwo</Button>
        <Button onPress={() => { Actions.echo()}}>push clone scene (EchoView)</Button>
      </View>
    )
  }
}

TabView.contextTypes = contextTypes;
TabView.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 2,
    borderColor: 'red',
  },
})

export default TabView