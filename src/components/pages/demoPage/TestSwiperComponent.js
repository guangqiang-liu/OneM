/**
 * Created by guangqiang on 2017/9/16.
 */
import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')

const imgArr = ['../assets/images/img/1.jpg', '../assets/images/img/2.jpg', '../assets/images/img/3.jpg']

export default class extends Component {

  renderImg() {
    tempArr = []
    if (imgArr.length) {
      for (var i = 0; i < imgArr.length; i++) {
        tempArr.push(
          <TouchableOpacity key={i}>
            <Image style={{height: 150}} source={require('../../../assets/images/img/1.jpg')} key={i}/>
          </TouchableOpacity>
        )
      }
      return tempArr
    } else {
      return (
        <View/>
      )
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Swiper style={styles.wrapper} height={200} horizontal={false} autoplay>
          {this.renderImg()}
        </Swiper>
        <Swiper style={styles.wrapper}
                loop
                onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                dot={<View style={styles.dotStyle}/>}
                activeDot={<View style={styles.activeDot}/>}
                paginationStyle={{
                  bottom: -23, left: null, right: 10
                }}>
          <View style={styles.slide} title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
            <Image resizeMode='stretch' style={styles.image} source={require('../../../assets/images/img/1.jpg')} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
            <Image resizeMode='stretch' style={styles.image} source={require('../../../assets/images/img/2.jpg')} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
            <Image resizeMode='stretch' style={styles.image} source={require('../../../assets/images/img/3.jpg')} />
          </View>
          <View style={styles.slide} title={<Text numberOfLines={1}>Learn from Kim K to land that job</Text>}>
            <Image resizeMode='stretch' style={styles.image} source={require('../../../assets/images/img/4.jpg')} />
          </View>
        </Swiper>
      </ScrollView>
    )
  }
}

const styles = {
  container: {
    height: 400
  },

  wrapper: {
  },

  slide: {
    height: 150,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },

  image: {
    width,
    flex: 1
  },
  dotStyle: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 5,
    height: 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  activeDot: {
    backgroundColor: '#000',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  }
}