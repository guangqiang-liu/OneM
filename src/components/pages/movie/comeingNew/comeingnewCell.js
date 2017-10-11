/**
 * Created by guangqiang on 2017/10/5.
 */
/**
 * Created by guangqiang on 2017/10/5.
 */
import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {commonStyle} from '../../../../utils/commonStyle'
import {Icon} from '../../../../utils/icon'
import {Actions} from 'react-native-router-flux'
export default class ComeingNewCell extends Component {
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
            source={{uri: data.image}}
          />
          <View style={{position: commonStyle.absolute}}>
            <Icon name={'oneIcon|play_cycle_o'} size={25} color={commonStyle.white}/>
          </View>
        </TouchableOpacity>
        <View style={styles.rightContent}>
          <View style={{flex: 1}}>
            <Text style={{color: commonStyle.textBlockColor, fontSize: 15, paddingVertical: 6}}>{data.title}</Text>
            <Text numberOfLines={1} style={{color: '#F9783F', fontSize: 13, paddingVertical: 6}}>{`${data.wantedCount}`}
              <Text style={{color: commonStyle.textGrayColor, fontSize: 12}}>人想看</Text>
              <Text style={{color: commonStyle.textGrayColor, fontSize: 12}}>{` - ${data.type}`}</Text>
            </Text>
            <Text numberOfLines={1} style={{color: commonStyle.textGrayColor, fontSize: 12, paddingVertical: 6}}>{`${data.actor1} / ${data.actor2}`}</Text>
          </View>
          <View style={{justifyContent: 'space-around'}}>
            {
              data.isTicket ?
                <TouchableOpacity style={{borderColor: '#6EA524', borderWidth: 1, borderRadius: 2}}>
                  <Text style={{paddingVertical: 5, paddingHorizontal: 10, color: '#6EA524', fontSize: 13}}>预售</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={{borderColor: '#F9783F', borderWidth: 1, borderRadius: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 2, paddingVertical: 4}}>
                  <Icon name={'oneIcon|love_o'} size={15} color={'#F9783F'}/>
                  <Text style={{ color: '#F9783F', fontSize: 13}}>想看</Text>
                </TouchableOpacity>
            }
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