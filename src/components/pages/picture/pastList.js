/**
 * Created by guangqiang on 2017/9/5.
 */
import React, {Component}from 'react'
import {View, Text, StyleSheet, ListView, Image, TouchableOpacity} from 'react-native'
import Action from '../../../actionCreators/picture'
import {monthList} from '../../../constants/beginTime'
import {commonStyle} from '../../../utils/commonStyle'
import {Actions} from 'react-native-router-flux'
export default class PastList extends Component {

  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    }
  }

  componentDidMount() {
    let dataList = Action.pastList(this.props.beginTime)
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(dataList)
    })
  }

  renderRow(rowData, sectionId, rowID) {
    var dateStr = rowID == 0 ? '本月' : `${monthList[rowData[1]]}.${rowData[0]}`
    return (
      <TouchableOpacity
        style={styles.cellStyle}
        onPress={() => Actions.picGridList({year: rowData[0], month: rowData[1]})}
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
    padding: 10,
    marginBottom: 10
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