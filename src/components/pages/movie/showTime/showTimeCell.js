/**
 * Created by guangqiang on 2017/10/5.
 */
import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {commonStyle} from '../../../../utils/commonStyle'
import {Icon} from '../../../../utils/icon'
import deviceInfo from '../../../../utils/deviceInfo'
import {Actions} from 'react-native-router-flux'
import {storage} from '../../../../utils'
export default class ShowTimeCell extends Component {

  testStorage() {
    storage.load('userInfo', (data) => {
      console.log(data)
    })
  }

  render() {
    let data = this.props.rowData
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => Actions.movieDetail({id: data.id})}
      >
        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', backgroundColor: commonStyle.clear}}>
          <Image
            style={styles.img}
            source={{uri: data.img}}
          />
          <View style={{position: commonStyle.absolute}}>
            <Icon name={'oneIcon|play_cycle_o'} size={25} color={commonStyle.white}/>
          </View>
        </TouchableOpacity>
        <View style={styles.rightContent}>
          <View style={{flex: 1}}>
            <Text style={{color: commonStyle.textBlockColor, fontSize: 15, paddingVertical: 6}}>{data.t}</Text>
            {
              data.isNew ?
                <Text numberOfLines={1} style={{color: '#F9783F', fontSize: 13, paddingVertical: 6}}>{`${data.wantedCount}`}
                  <Text style={{color: commonStyle.textGrayColor, fontSize: 12}}>人想看</Text>
                  <Text style={{color: commonStyle.textGrayColor, fontSize: 12}}>{` - ${data.movieType}`}</Text>
              </Text> : <Text style={{fontSize: 12, color: '#539103'}}>{`@${data.commonSpecial}`}</Text>
            }
            <Text numberOfLines={1} style={{color: commonStyle.textGrayColor, fontSize: 12, paddingVertical: 6}}>{data.actors}</Text>
          </View>
          <View style={{justifyContent: 'space-around'}}>
            {
              !data.isNew && data.r !== -1 ? <Text style={{textAlign: 'right', fontSize: 18, color: '#539103'}}>{data.r}
                <Text style={{fontSize: 12, color: '#539103'}}>分</Text>
              </Text> : null
            }
            <TouchableOpacity
              style={{borderColor: '#F9783F', borderWidth: 1, borderRadius: 2}}
              onPress={() => this.testStorage()}
            >
             <Text style={{paddingVertical: 5, paddingHorizontal: 10, color: '#F9783F', fontSize: 13}}>购票</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: commonStyle.lineColor,
    marginLeft: 10,
    paddingBottom: 10,
    marginTop: 10
  },
  img: {
    width: 50,
    height: 80,
  },
  rightContent: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: deviceInfo.deviceWidth - 70 - 50,
    flex: 1
  }
})