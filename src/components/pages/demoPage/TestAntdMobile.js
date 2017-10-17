/**
 * Created by guangqiang on 2017/10/13.
 */
import React, {Component} from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import { ImagePicker, PickerView } from 'antd-mobile'

const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
]

const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}]

export default class TestAntdMobile extends Component {
  state = {
    value: null,
    files: data,
  }

  pickerViewOnChange = (value) => {
    console.log(value)
    this.setState({
      value,
    })
  }


  imagePickerOnChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    })
  }

  onAddImageClick = (e) => {
    alert('添加图片，需访问相册')
    // // e.preventDefault()
    // this.setState({
    //   files: this.state.files.concat({
    //     url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    //     id: '3',
    //   }),
    // })
  }

  onTabChange = (key) => {
    console.log(key)
  }

  render() {
    const { files } = this.state
    return (
      <View>
        <View style={{marginVertical: 50}}>
          <ImagePicker
            files={files}
            onChange={this.imagePickerOnChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 5}
            onAddImageClick={this.onAddImageClick}
          />
        </View>
        <View>
          <PickerView
            onChange={this.pickerViewOnChange}
            value={this.state.value}
            data={seasons}
            cascade={false}
          />
        </View>
      </View>
    )
  }
}