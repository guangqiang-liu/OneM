/**
 * Created by guangqiang on 2017/9/4.
 */
import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'
import Action from '../../../actions'
import {commonStyle} from '../../../utils/commonStyle'
import {SegmentedControl} from 'antd-mobile'
import ShowTimeList from './showTime/showTimeList'
import ComingNewList from './comeingNew/comeingNewList'
class MovieList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      hasMore: true,
      showTimeList: [],
      comeingNewList: [],
      attentionList: [],
      selectedTab: '正在热映'
    }
  }

  componentDidMount() {
    Promise.all([this.props.getMovieShowTimeList(), this.props.getMovieComeingNewList()]).then(response => {
      this.setState({
        showTimeList: response[0].value.ms,
        comeingNewList: response[1].value.moviecomings,
        attentionList: response[1].value.attention
      })
    })
  }

  onValueChange = (value) => {
    this.setState({selectedTab: value})
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.navBarStyle}>
          <View style={styles.segContainer}>
            <SegmentedControl
              style={styles.tabStyle}
              selectedIndex={0}
              values={['正在热映', '即将上映']}
              onValueChange={(value)=> this.onValueChange(value)}
            />
          </View>
        </View>
        {
          this.state.selectedTab === '正在热映' ?
            <ShowTimeList dataArr={this.state.showTimeList}/> :
            <ComingNewList comingNewArr={this.state.comeingNewList} attentionArr={this.state.attentionList}/>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: commonStyle.white,
  },
  navBarStyle: {
    height: commonStyle.navHeight,
    backgroundColor: '#151C28',
  },
  segContainer: {
    marginTop: commonStyle.navStatusBarHeight,
    height: commonStyle.navContentHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabStyle: {
    width: 180
  },
})

const _MovieList = connect(
  (state) => state.movie.movieList,
  Action.dispatch('movie')
)(MovieList)

export default _MovieList