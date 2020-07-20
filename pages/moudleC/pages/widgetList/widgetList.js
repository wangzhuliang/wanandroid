// pages/moudleC//pages/widgetList/widgetList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topDistance: app.globalData.systemInfo.navBarHeight + app.globalData.systemInfo.navBarExtendHeight,
    widgetList:[
      "文字跑马灯",
      "触摸水波涟漪",
      "数字累加",
      "时钟效果"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  itemClick: function(e) {
    let index = e.currentTarget.dataset.index
    switch(index){
      case 0:
        wx.navigateTo({
          url: '../wordsRun/wordsRun',
        })
        break
      case 1:
        wx.navigateTo({
          url: '../waterRipple/waterRipple',
        })
        break
      case 2:
        wx.navigateTo({
          url: '../figures/figures',
        })
        break
      case 3:
        wx.navigateTo({
          url: '../clock/clock',
        })
        break
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