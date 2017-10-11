/**
 * Created by guangqiang on 2017/9/5.
 */
import React, {Component}from 'react'
import {View, Text, StyleSheet, ListView, Image, TouchableOpacity} from 'react-native'
import Action from '../../../actionCreators/picture'
import {commonStyle} from '../../../utils/commonStyle'
import {Actions} from 'react-native-router-flux'
import {articleType, monthList} from '../../../constants/commonType'
export default class PastList extends Component {

  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    }
  }

  static onEnter = () => {
    Actions.refresh({
      title: '过往列表',
      backButtonImage: require('../../../assets/images/return.png'),
    })
  }

  componentDidMount() {
    let dataList = Action.pastList(this.props.beginTime)
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(dataList)
    })
  }

  nextPage(year, month) {
    switch (this.props.pageType) {
      case articleType.PICTURE:
        Actions.picGridList({year: year, month: month})
        break
      case articleType.MUSIC:
        Actions.musicList({year: year, month: month})
        break
      case articleType.ESSAY:
      case articleType.SERIAL:
      case articleType.QUESTIONS:
        Actions.articleList({year: year, month: month + 1, articleType: this.props.pageType})
        break
      default:
        break
    }
  }

  renderRow(rowData, sectionId, rowID) {
    var dateStr = rowID === 0 ? '本月' : `${monthList[rowData[1]]}.${rowData[0]}`
    return (
      <TouchableOpacity
        style={styles.cellStyle}
        onPress={() => this.nextPage(rowData[0], rowData[1])}
      >
        <Text
          style={{color: commonStyle.textBlockColor}}>{dateStr}</Text>
        <Image style={styles.arrowStyle}
               source={require('../../../assets/images/forward.png')}/>
      </TouchableOpacity>
    )
  }

  _renderSeparator() {
    return (
      <View style={styles.spStyle}/>
    )
  }
  render() {
    const dataArr = this.state.dataSource
    return (
      <ListView
        style={styles.listStyle}
        dataSource={dataArr}
        renderRow={this.renderRow}
        renderSeparator={() => this._renderSeparator()}
      />
    )
  }
}

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
    backgroundColor: commonStyle.white,
    paddingHorizontal: 10
  },
  cellStyle: {
    flexDirection: 'row',
    height: 44,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  arrowStyle: {
    width: 15,
    height: 15
  },
  spStyle: {
    height: 1,
    backgroundColor: commonStyle.lineColor
  }
})