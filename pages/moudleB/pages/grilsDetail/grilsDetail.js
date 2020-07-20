// pages/moudleB/pages/grilsDetail/grilsDetail.js
const app = getApp()
let xStart = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topDistance: app.globalData.systemInfo.navBarHeight + app.globalData.systemInfo.navBarExtendHeight,
    url:'',
    boardArea:{
      x:600,
      y:902
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options.url=" + options.url);
    let url = "https" + options.url.substring(4, options.url.length)
    console.log("options.desc=" + url)
    this.setData({
      url: url
    })
  },

  saveImage(){
    let that = this
    wx.showActionSheet({
      itemList: ['保存到相册'],
      success(res) {
        //let url = e.currentTarget.dataset.url;
        wx.getSetting({
          success: (res) => {
            console.log(res);
            if (!res.authSetting['scope.writePhotosAlbum']) {   // 未授权
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success: () => {
                  that.saveImgSuccess(that.data.url);
                },
                fail: (res) => {
                  console.log(res);
                  wx.showModal({
                    title: '保存失败',
                    content: '请开启访问手机相册的权限',
                    success(res) {
                      wx.openSetting()
                    }
                  })
                }
              })
            } else {  // 已授权
              that.saveImgSuccess(that.data.url);
            }
          },
          fail: (res) => {
            console.log(res);
          }
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  // 同意授权保存到相册
  saveImgSuccess(url) {
    wx.getImageInfo({
      src: url,  // 通过getImageInfo将src转换成改图片的本地路径，给saveImageToPhotosAlbum使用
      success: (res) => {
        console.log(res)
        let path = res.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,   // filePath路径不能是网络图片路径
          success: (res) => {
            console.log(res);
            wx.showToast({
              title: '已保存到相册',
            })
          },
          fail: (res) => {
            console.log(res);
          }
        })
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },

  /**
   * 返回
   */
  gobackClick() {
    const pages = getCurrentPages()
    if (pages.length >= 2) {
      wx.navigateBack({
        delta: 1
      });
    }
  },

  /**
   * 回到首页
   */
  goHome() {
    wx.reLaunch({
      url: '../../../index/index',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})