// pages/moudleA/pages/systemItem/systemItem.js
const app = getApp();
const winWidth = wx.getSystemInfoSync().windowWidth;
import extractNetwork from "../../../../utils/extractNetwork.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topDistance: app.globalData.systemInfo.navBarHeight + app.globalData.systemInfo.navBarExtendHeight,
    title: '',
    systemItemData: [],
    titleScrollLeft: 0,
    current: 0,
    articleList: [],
    pageNum: 0,
    top:0,
    isFirstRequest: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log("options.url=" + options.title);
    that.setData({
      title: options.title,
      systemItemData: app.globalData.systemItemData
    })
    that.toShowList(that.data.pageNum, app.globalData.systemItemData[0].id, that)
  },

  /**
   * 网络请求
   */
  toShowList(page, id, that) {
    extractNetwork.getSystemUrlList(page, id).then(function (res) {
      //成功操作  
      console.log(res)
      if (that.data.isFirstRequest) {
        that.setData({
          articleList: res.data.data.datas,
          top: 0
        })
      }else{
        that.data.articleList = that.data.articleList.concat(res.data.data.datas)
        that.setData({
          articleList: that.data.articleList
        })
      }
      //console.log(that.data.articleList)
    }, function (error) {
      console.log(error)
    }).catch(function () {
      console.error("get location failed")
    })
  },

  /**
   * 点击小标题
   */
  switchTitle: function(e) {
    let that = this
    let current = e.currentTarget.dataset.current
    //scroll-view左滑动距离
    let scrollLeft = 0
    //点击item距离屏幕左边距
    let leftDistance = 0
    //点击item的宽
    let itemWidth = 0
    //需要移动的距离
    let move = 0
    let valueAll = Promise.all([that.promiseScroll(), that.promiseView(current)])
    valueAll.then((data) => {
        //console.log(data)
        data.forEach((item) => {
          if(item.id == 'scrollView'){
            scrollLeft = item.scrollLeft
          }else{
            leftDistance = item.left
            itemWidth = item.width
          }
        })
      //假如点击按钮距离屏幕左侧+自身宽/2 > 屏幕/2,则一定可以移动到中央
      if ((leftDistance + itemWidth / 2) > winWidth / 2) {
        move = scrollLeft + leftDistance + itemWidth / 2 - winWidth / 2
        that.setData({
          titleScrollLeft: move,
          current: current,
          isFirstRequest: true,
          pageNum: 0,
        })
      } else if ((leftDistance + itemWidth / 2) < winWidth / 2) {
        //再根据总长来判断
        if ((scrollLeft + leftDistance + itemWidth / 2) >= winWidth / 2) {
          move = scrollLeft - winWidth / 2 + leftDistance + itemWidth / 2
          that.setData({
            titleScrollLeft: move,
            current: current,
            isFirstRequest: true,
            pageNum: 0,
          })
        }else{
          that.setData({
            titleScrollLeft: 0,
            current: current,
            isFirstRequest: true,
            pageNum: 0,
          })
        }
      }else{
        //相等时则不需要滑动操作
        that.setData({
          current: current,
          isFirstRequest: true,
          pageNum: 0,
        })
      }
      that.toShowList(that.data.pageNum, app.globalData.systemItemData[current].id, that)  
    })
  },

  promiseScroll() {
    let value = new Promise((resolve, reject) => {
      let query = wx.createSelectorQuery();
      //获取节点的水平、垂直滚动的位置等。节点必须是scroll-view或者viewport
      query.select('#scrollView').scrollOffset(function (res) {
        resolve(res)
        //   console.log(res.scrollLeft)
      }).exec();
    })
    return value
  },

  promiseView(current) {
    let value =new Promise((resolve, reject) => {
      let query = wx.createSelectorQuery();
      //能够动态获取view元素的高度、宽度等属性
      query.select('#item' + current).boundingClientRect(function (rect) {
        resolve(rect) 
        //   console.log(rect.height)
        //   console.log(rect.width)
        //   console.log(rect.left)
        //   console.log(rect.right)
      }).exec();
    })
    return value
  },

  /**
   * 滚动到底部
   */
  bindscrolltolower: function (e) {
    let that = this
    that.setData({
      pageNum: that.data.pageNum + 1,
      isFirstRequest: false
    })
    that.toShowList(that.data.pageNum, app.globalData.systemItemData[that.data.current].id, that)  
  },

  /**
   * 点击去详情页
   */
  clickDetail: function(e) {
    const url = e.currentTarget.dataset.link;
    console.log(url)
    wx.navigateTo({
      url: '../details/details?url=' + url + '&isNavigation=0',
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

  }
})