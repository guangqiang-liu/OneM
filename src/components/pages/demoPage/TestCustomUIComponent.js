/**
 * Created by guangqiang on 2017/9/14.
 */
import React, {Component} from 'react'
import {TouchableOpacity, StyleSheet, View, Button, Text} from './../../common'

class CustomComp extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}}>
        <Text style={{marginVertical: 20}}>这里的组件都是从common文件中引入的</Text>
        <Text
          style={styles.textStyle}
          onPress={() => alert('点击了text')}>
         <Text style={styles.textStyle2}>子标签</Text>
        </Text>
        <Button
          style={{backgroundColor: 'yellow', height: 100, width: 100, lineHeight: 100}}
          onPress={() => alert('点击了按钮')}>
          我是自定义按钮
        </Button>
        <TouchableOpacity
          style={{width: 100, height: 100, backgroundColor: 'orange'}}
          onPress={() => alert('点击了touchable')}
        >
          <Text>子标签</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: 'yellow',
    width: 200,
    height: 200,
    backgroundColor: 'blue'
  },
  textStyle2: {
    color: 'yellow',
    backgroundColor: 'red',
    lineHeight: 100
  }
})

export default CustomComp