// pages/moudleA/pages/system/system.js
const app = getApp()
import extractNetwork from "../../../../utils/extractNetwork.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topDistance: app.globalData.systemInfo.navBarHeight + app.globalData.systemInfo.navBarExtendHeight,
    systemData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    extractNetwork.getSystemUrl().then(function (res) {
      //成功操作  
      console.log(res)
      that.setData({
        systemData:res.data.data
      })
    }, function (error) {
      console.log(error)
    }).catch(function () {
      console.error("get location failed")
    })
  },

  /**
   * 返回
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
   * 回到首页
   */
  goHome() {
    wx.reLaunch({
      url: '../../../index/index',
    })
  },

  toSystemItem: function(e) {
    app.globalData.systemItemData = e.currentTarget.dataset.itemdata.children;
    wx.navigateTo({
      url: '../systemItem/systemItem?title=' + e.currentTarget.dataset.itemdata.name,
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