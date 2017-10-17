/**
 * Created by guangqiang on 2017/9/16.
 */
import React, { Component } from 'react'
import {
  Modal
} from 'react-native'

import ImageViewer from 'react-native-image-zoom-viewer'

const images = [{
  url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
}, {
  url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
}, {
  url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
}]

class ImgZoom extends React.Component {
  render() {
    return (
      <Modal visible={true} transparent={true}>
        <ImageViewer imageUrls={images}/>
      </Modal>
    )
  }
}

export {ImgZoom}