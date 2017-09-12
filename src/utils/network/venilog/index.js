/**
 * Created by guangqiang on 2017/8/31.
 */

let header = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

const LogRequest = {
  post(url, params = {}) {
    if (typeof params === 'object') {
      return fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(params)
      })
        .then((response) => response.json())
        .catch((error) => {
          console.log(error)
        })
        .then((response) => {
          if (response !== null && response !== undefined) {
            if (response.code === 200) {
              // 请求成功
              if (response.data === null || response.data === undefined) {
                return {success: true}
              } else {
                return response.data
              }
            } else {
              return Promise.reject(response)
            }
          } else {
            return Promise.reject(response)
          }
        })
    } else {
      throw new Error(
        'Wrong Type of Arguments, should be Object, now is ' + typeof params
      )
    }
  }
}

export { LogRequest }