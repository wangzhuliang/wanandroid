// pages/moudleA/pages/search/search.js
const app = getApp()
import extractNetwork from "../../../../utils/extractNetwork.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topDistance: app.globalData.systemInfo.navBarHeight + app.globalData.systemInfo.navBarExtendHeight,
    inputShowed: false,
    inputVal: "",
    pageNum: 0,
    searchList: [],
    hotList: [],
    isFirstRequest: true,
    top: 0,
    name:'',

    inputShowed: false,
    inputVal: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      search: that.search.bind(that)
    })
    that.toHotKey(that)
  },

  toHotKey(that) {
    extractNetwork.getHotKeyList().then(function (res) {
      //成功操作  
      console.log(res)
      that.setData({
        hotList: res.data.data
      })
    }, function (error) {
      console.log(error)
    }).catch(function () {
      console.error("get location failed")
    })
  },

  search: function (value) {
    console.log(value)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          { text: value, value: 1 }, 
        ])
      }, 200)
    })
  },

  bindfocus: function (e) {
    console.log('bindfocus', e)
  },

  bindblur: function (e) {
    console.log('bindblur', e)
  },
  
  selectResult: function (e) {
    let that = this
    console.log('select result', e.detail.item.text)
    that.setData({
      name: e.detail.item.text
    })
    let params = {
      k: e.detail.item.text
    }
    that.toSearchList(that.data.pageNum, params, that)
  },

  /**
   * 滚动到底部
   */
  bindscrolltolower: function (e) {
    let that = this
    that.setData({
      pageNum: that.data.pageNum + 1,
      isFirstRequest: false,
      top: 0
    })
    let params = {
      k: that.data.name
    }
    that.toSearchList(that.data.pageNum, params, that)
  },

  /**
   * 搜索结果
   */
  toSearchList(pageNum, params, that){
    extractNetwork.postAnswerUrlList(pageNum, params).then(function (res) {
      //成功操作  
      console.log(res)
      if (that.data.isFirstRequest) {
        that.setData({
          searchList: res.data.data.datas,
          top: 0
        })
      } else {
        that.data.searchList = that.data.searchList.concat(res.data.data.datas)
        that.setData({
          searchList: that.data.searchList
        })
      }
    }, function (error) {
      console.log(error)
    }).catch(function () {
      console.error("get location failed")
    })
  },

  toSearchTitle: function(e) {
    let that = this
    that.setData({
      isFirstRequest: true
    })
    let name = e.currentTarget.dataset.title
    let params = {
      k: name
    }
    that.toSearchList(that.data.pageNum, params, that)
  },

  /**
   * 点击去详情页
   */
  clickDetail: function (e) {
    const url = e.currentTarget.dataset.link
    console.log(url)
    wx.navigateTo({
      url: '../details/details?url=' + url,
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