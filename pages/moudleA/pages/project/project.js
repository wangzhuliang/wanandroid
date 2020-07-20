// pages/moudleA/pages/project/project.js
const app = getApp()
import extractNetwork from "../../../../utils/extractNetwork.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topDistance: app.globalData.systemInfo.navBarHeight + app.globalData.systemInfo.navBarExtendHeight,
    isFirstRequest: true,
    projectList:[],
    pageNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.showProject(that)
  },

  /**
   * 项目网络请求
   */
  showProject(that) {
    extractNetwork.getProjectList(that.data.pageNum).then(function (res) {
      console.log(res)
      if (that.data.isFirstRequest) {
        that.setData({
          projectList: res.data.data.datas
        })
      } else {
        that.data.projectList = that.data.projectList.concat(res.data.data.datas)
        that.setData({
          projectList: that.data.projectList
        })
      }
    }, function (error) {
      console.log(error)
    }).catch(function () {
      console.error("get location failed")
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
    that.showProject(that)
  },

  /**
   * 跳转详情页
   */
  toDetails: function(e) {
    app.globalData.projectItemData = e.currentTarget.dataset.details;
    wx.navigateTo({
      url: '../projectItem/projectItem',
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