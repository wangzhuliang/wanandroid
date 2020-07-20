// pages/moudleA/pages/navigation/navigation.js
const app = getApp()
import extractNetwork from "../../../../utils/extractNetwork.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topDistance: app.globalData.systemInfo.navBarHeight + app.globalData.systemInfo.navBarExtendHeight,
    leftList: [],
    rightList: [],
    showIndex: 0,
    rightTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.showNavigation(that)
  },

  /**
   * 导航网络请求
   */
  showNavigation(that) {
    extractNetwork.getNavigationList().then(function (res) {
      //成功操作  
      console.log(res)
      that.setData({
        leftList: res.data.data,
        rightList: res.data.data[0].articles
      })
    }, function (error) {
      console.log(error)
    }).catch(function () {
      console.error("get location failed")
    })
  },

  /**
   * 选择小标题
   */
  choiceTitle: function(e) {
    let that = this;
    let index = e.currentTarget.dataset.index
    that.setData({
      showIndex: index,
      rightList: that.data.leftList[index].articles,
      rightTop: 0
    })
  },

  /**
   * 
   */
  toShowDetail: function(e) {
    const url = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: '../details/details?url=' + url + '&isNavigation=0',
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