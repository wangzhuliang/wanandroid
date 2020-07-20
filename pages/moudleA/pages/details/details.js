// pages/moudleA/pages/details/details.js
let network = require('../../../../utils/network.js');
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    isCopy: false,
    isFirst: true,
    url : '',
    topDistance: app.globalData.systemInfo.navBarHeight + app.globalData.systemInfo.navBarExtendHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log("options.url=" + options.url);
    console.log("options.isNavigation=" + options.isNavigation)
    if (options.isNavigation === undefined){
      if (options.url.match('https://mp.weixin.qq.com') || options.url.match('https://juejin.im')
        || options.url.match('www.jianshu.com') || options.url.match('https://blog.csdn.net')) {
        that.setData({
          isShow: false,
          url: options.url
        })
      } else {
        that.setData({
          isShow: true,
          url: options.url
        })
        network.getRequest(options.url, {}, {}).then(function (res) {
          console.log(res)
          /**
          * WxParse.wxParse(bindName , type, data, target,imagePadding)
          * 1.bindName绑定的数据名(必填)
          * 2.type可以为html或者md(必填)
          * 3.data为传入的具体数据(必填)
          * 4.target为Page对象,一般为this(必填)
          * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
          */
          WxParse.wxParse('details', 'html', res.data, that, 5)
        }, function (error) {
          console.log(error)
        }).catch(function () {
          console.error("get location failed")
        })
        that.toCopy()
      }
    }else{
      that.setData({
        isShow: false,
        url: options.url
      })
    }
  },

  /**
   * 复制
   */
  toCopy: function(){
    let that = this
    if (that.data.isFirst){
      that.setData({
        isFirst : false
      })
      wx.setClipboardData({
        data: that.data.url,
        success: function (res) {
          wx.hideToast();
          that.setData({
            isCopy: true,
          })
          that.animation(that)
        }
      })
    }
  },

  /**
   * 消失动画
   */
  animation(that) {
    setTimeout(() => {
      let animation = wx.createAnimation({
        duration: 1000
      })
      animation.opacity(0).step();
      that.setData({
        vanish: animation.export()
      })
      setTimeout(() => {
        that.setData({
          isCopy: false,
        })
      }, 1000)
    }, 3000)
  },

  gobackClick() {
    const pages = getCurrentPages();
    if (pages.length >= 2) {
      wx.navigateBack({
        delta: 1
      });
    }
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

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})