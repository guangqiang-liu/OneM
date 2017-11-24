/**
 * Created by guangqiang on 2017/11/15.
 */
import {AsyncStorage} from 'react-native'
import Storage from 'react-native-storage'
import {sync} from './sync'

let storage = undefined
let defaultExpires = 1000 * 3600 * 24
let size = 1000

const createStorage = () => {

  storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: size,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: defaultExpires,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法
    // 或是在任何时候，直接对storage.sync进行赋值修改
    // 或是写到另一个文件里，这里require引入
    sync: sync
  })
}

const initStorage = () => {
  if (!storage) {
    createStorage()
  }
}

const _storage = {

  // 使用key来保存数据。这些数据一般是全局独有的，常常需要调用的。
  // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。
  save(key, obj) {
    initStorage()
    storage.save({
      key: key,  // 注意: 请不要在key中使用_下划线符号!
      data: obj,
      // 如果不指定过期时间，则会使用defaultExpires参数
      // 如果设为null，则永不过期
      expires: defaultExpires
    })
  },

  // 取数据
  load(key, callBack) {
    initStorage()
    storage.load({
      key: key,
      // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
      autoSync: true,
      // syncInBackground(默认为true)意味着如果数据过期，
      // 在调用sync方法的同时先返回已经过期的数据。
      // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
      syncInBackground: true,
      // 你还可以给sync方法传递额外的参数
      syncParams: {
        extraFetchOptions: { // 各种参数
        },
        someFlag: true,
      }
    }).then(ret => {
      // 如果找到数据，则在then方法中返回
      // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
      // 你只能在then这个方法内继续处理ret数据
      // 而不能在then以外处理
      // 也没有办法“变成”同步返回
      // 你也可以使用“看似”同步的async/await语法
      callBack && callBack(ret)
      return ret
    }).catch(err => {
      //如果没有找到数据且没有sync方法，
      //或者有其他异常，则在catch中返回
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          // TODO
          break
        case 'ExpiredError':
          // TODO
          break
      }
    })
  },

  // 获取某个key下的所有id(仅key-id数据)
  getIdsForKey(id, callback) {
    initStorage()
    storage.getIdsForKey(id).then(ids => {
      callback && callback(ids)
    })
  },

  // 获取某个key下的所有数据(仅key-id数据)
  getAllDataForKey(key, callback) {
    initStorage()
    storage.getAllDataForKey(key).then(users => {
      callback && callback(users)
    })
  },

  // !! 清除某个key下的所有数据(仅key-id数据)
  clearMapForKey(key) {
    initStorage()
    storage.clearMapForKey(key)
  },

  // 删除单个数据
  remove(key) {
    initStorage()
    storage.remove({
      key: key
    })
  },

  // !! 清空map，移除所有"key-id"数据（但会保留只有key的数据）
  clearMap() {
    initStorage()
    storage.clearMap()
  }
}

export {_storage as storage}