/**
 * url:请求的url
 * header:请求头
 * params:请求参数
 * message:loading提示信息
 * success:成功的回调
 * fail:失败的回调
 */

// //get请求
// function getRequest(url, header, params, message, onSuccess, onFailed) {
//   requestLoading(url, header, params, "GET", message, onSuccess, onFailed)
// }

// //post请求
// function postRequest(url, header, params, message, onSuccess, onFailed) {
//   requestLoading(url, header, params, "POST", message, onSuccess, onFailed)
// }

// function requestLoading(url, header, params, method, message, onSuccess, onFailed) {
//   if (message != "") {
//     wx.showLoading({
//       title: message,
//     })
//   }
//   const getRequestTask = wx.request({
//     url: url,
//     data: dealParams(params),
//     header: dealHeader(header,method),
//     method: method,
//     success: function (res) {
//       if (message != "") {
//         wx.hideLoading()
//       }
//       if (res.statusCode == 200) {
//         onSuccess(res.data)
//       } else {
//         onFailed(res)
//       }
//     },
//     fail: function (res) {
//       if (message != "") {
//         wx.hideLoading()
//       }
//       onFailed(res)
//     }
//   })
// }

const requestPost = (url, header, params) => {
  return request(url, header, params, 'POST')
}

const requestGet = (url, header, params) => {
  return request(url, header, params,'GET')
}

const request = (url, header, params, method) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: dealParams(params),
      header: dealHeader(header, method),
      method: method,
      success: function (res) {
        let statusCode = res.statusCode
        if (statusCode == 200) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}

/**
 * function: 根据需求处理请求头：添加固定请求头
 */
function dealHeader(header, method) {
  if(method == "GET"){
    header['content-type'] = 'application/json'
  }else{
    header['content-type'] = 'application/x-www-form-urlencoded'
  }
  //console.log(header)
  return header;
}

/**
 * function: 根据需求处理请求参数：添加固定参数配置等
 * @params 请求参数
 */
function dealParams(params) {
  //params = {}
  //params['content-type'] = 'application/json'
  return params;
}

// 1.通过module.exports方式提供给外部调用
module.exports = {
  postRequest: requestPost,
  getRequest: requestGet,
}