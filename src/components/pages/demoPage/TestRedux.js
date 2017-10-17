import React from 'react'
import {View, Text, StyleSheet} from "react-native"
import Button from "react-native-button"
import {Actions} from "react-native-router-flux"
import {connect} from 'react-redux'

class Home extends React.Component {

  addAction(add) {
    console.log('add')
    add()
  }

  reducerAction(reduce) {
    console.log('reduce')
    reduce()
  }

  render() {
    const {value, add, reduce} = this.props
    return (
      <View style={styles.container}>
        <Text>Replace screen(新的scene将直接替换掉上一个scene，上一个scene被导航栈移除)</Text>
        <Button onPress={Actions.pop}>Back</Button>
        <Text style={{fontSize: 30}}>{value}</Text>
        <Button onPress={()=> this.addAction(add)}>redux-Action-add</Button>
        <Button onPress={()=> this.reducerAction(reduce)}>redux-Action-reduce</Button>
        <Button onPress={()=> Actions.pageOne()}>pageOne</Button>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    value: state.home.custom
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add: () => {
      return dispatch({type: 'ADD'})
    },
    reduce: () => {
      return dispatch({type: 'REDUCE'})
    }
  }
}

const styles = StyleSheet.create({
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

export default Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)