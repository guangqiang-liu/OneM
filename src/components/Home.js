import React from 'react'
import {View, Text, StyleSheet} from "react-native"
import Button from "react-native-button"
import {Actions} from "react-native-router-flux"
import {connect} from 'react-redux'

class Home extends React.Component {

  addxxx(add) {
    console.log('add')
    add()
  }

  reducerxxx(reduce) {
    console.log('reduce')
    reduce()
  }

  render() {
    const {value, add, reduce} = this.props
    return (
      <View style={styles.container}>
        <Text>Replace screen</Text>
        <Button onPress={Actions.pop}>Back</Button>
        <Text style={{fontSize: 30}}>{value}</Text>
        <Button onPress={()=> this.addxxx(add)}>add</Button>
        <Button onPress={()=> this.reducerxxx(reduce)}>reduce</Button>
      </View>
    )
  }
}

/**
 * 这里使用了最简单的redux架构来实现 Counter
 */

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

export default Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

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
