/**
 * Created by guangqiang on 2017/10/10.
 */
import React, {Component} from 'react'
import {View, SectionList, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {BaseComponent} from '../../../base/baseComponent'
import {commonStyle} from '../../../../utils/commonStyle'
export default class ActorList extends BaseComponent {

  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
  }

  navigationBarProps() {
    return {
      title: '演职员',
      titleStyle: {
        color: commonStyle.white
      },
      leftIcon: {
        name: 'nav_back_o',
        size: 20,
        color: commonStyle.white
      },
      navBarStyle: {
        backgroundColor: '#151C28',
      }
    }
  }

  componentDidMount() {
    this.props.getActorList({movieId: this.props.id})
  }

  renderItem = info => {
    var item = info.item
    return (
      <View style={styles.cellStyle}>
        <View>
          <Image style={{width: 50, height: 50}} source={{uri: item.image}}/>
        </View>
        <View style={{justifyContent: commonStyle.around, flex: 1, marginHorizontal: 10, height: 50}}>
          <Text style={{fontSize: 13, color: commonStyle.textBlockColor}}>{item.name}</Text>
          <Text style={{fontSize: 11, color: commonStyle.textGrayColor}}>{item.nameEn}</Text>
          {
            item.personate ?
              <Text numberOfLines={1}
                    style={{fontSize: 11, color: commonStyle.textBlockColor}}>{`饰：${item.personate}`}</Text> : null
          }
        </View>
        {
          item.roleCover ?
            <View style={{width: 60, justifyContent: 'center'}}>
              <Image style={{width: 50, height: 50, borderRadius: 25}} source={{uri: item.roleCover}}/>
            </View> : null
        }
      </View>
    )
  }

  renderSectionHeader = info => {
    var section = info.section.key
    return (
      <View style={styles.sectionHeader}>
        <Text style={{color: commonStyle.gray, marginLeft: 10, fontSize: 12}}>{section}</Text>
      </View>
    )
  }

  _render() {
    let tempArr = this.props.actorData.map((item, index) => {
      let tempData = {}
      tempData.key = `${item.typeName} ${item.typeNameEn}`
      tempData.data = item.persons
      return tempData
    })
    return (
      <View style={styles.container}>
        <SectionList
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderItem}
          sections={tempArr}
          ItemSeparatorComponent={() => <View/>}
          ListHeaderComponent={() => <View/>}
          ListFooterComponent={() => <View/>}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cellStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: commonStyle.lineColor
  },
  sectionHeader: {
    justifyContent: 'center',
    height: 20,
    backgroundColor: commonStyle.bgColor
  }
})