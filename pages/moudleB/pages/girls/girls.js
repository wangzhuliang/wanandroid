// pages/moudleB/pages/girls/girls.js
//let network = require('../../../../utils/network.js');
const app = getApp()
import extractNetwork from "../../../../utils/extractNetwork.js";
//引入图片预加载组件
const ImgLoader = require('../../../../utils/img-loader.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topDistance: app.globalData.systemInfo.navBarHeight + app.globalData.systemInfo.navBarExtendHeight,
    isFirstRequest: true,
    girlsList: [],
    pageNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始化图片预加载组件，并指定统一的加载完成回调
    this.imgLoader = new ImgLoader(this, this.imageOnLoad.bind(this))
    let that = this
    that.showGirls(that)
  },

  showGirls(that){
    // wx.showLoading({
    //   title: '加载中...',
    // })
    extractNetwork.getGankGirlsList(that.data.pageNum).then(function (res) {
      wx.hideLoading({
        complete: (res) => {},
      })
      //成功操作
      if (that.data.isFirstRequest) {
        console.log(res.data.data)
        res.data.data.forEach(function (item, index) {
          res.data.data[index].loaded = false
        })
        that.setData({
          girlsList: res.data.data
        })
        res.data.data.forEach(item => {
          that.imgLoader.load(item.url)
        })
      } else {
        console.log(res.data.data)
        res.data.data.forEach(function (item, index) {
          res.data.data[index].loaded = false
        })
        that.data.girlsList = that.data.girlsList.concat(res.data.data)
        that.setData({
          girlsList: that.data.girlsList
        })
        that.data.girlsList.forEach(item => {
          that.imgLoader.load(item.url)
        })
      }
      
    }, function (error) {
      console.log(error)
      wx.hideLoading({
        complete: (res) => {},
      })
    }).catch(function () {
      console.error("get location failed")
      wx.hideLoading({
        complete: (res) => {},
      })
    })
  },

  //加载完成后的回调
  imageOnLoad(err, data) {
    console.log('图片加载完成', err, data.src)

    const girlsList = this.data.girlsList.map(item => {
      if (item.url == data.src)
        item.loaded = true
      return item
    })
    this.setData({ girlsList })
  },

  toDetails: function(e){
    let details = e.currentTarget.dataset.details
    console.log(details)
    wx.navigateTo({
      url: '../grilsDetail/grilsDetail?url=' + details.images[0] + '&desc=' + details.desc,
    })
  },

  /**
   * 滑动到底部
   */
  bindscrolltolower: function (e) {
    let that = this
    that.setData({
      pageNum: that.data.pageNum + 1,
      isFirstRequest: false
    })
    that.showGirls(that)
  },

  /**
   * 返回按钮
   */
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
})