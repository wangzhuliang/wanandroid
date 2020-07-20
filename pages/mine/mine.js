// pages/mine/mine.js
const app = getApp();
let ctx;
let img;
let canvas;
let winWidth = wx.getSystemInfoSync().windowWidth;
let aaa = 0.5
import extractNetwork from "../../utils/extractNetwork.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    isIphoneX: app.globalData.systemInfoBottom.model.search('iPhone X') != -1 ? true : false,
    userName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar()
    let user = wx.getStorageSync('user')
    if (user == null || user == undefined || user == ''){
      this.setData({
        userName: ''
      })
    }else{
      this.setData({
        userName: user.username
      })
    }
    //this.toCanvasImage()
  },

  // start: function(e) {
  //   aaa = (img.height - img.width * 300 / 750) / img.height
  //   canvas.requestAnimationFrame(() => this.moveL());
  // },
  
  // moveL:function(){
  //   ctx.drawImage(img,
  //          0,
  //     img.height * (aaa),
  //         img.width, img.width * 300 / 750,
  //         0, 0,
  //         winWidth, 300 * winWidth / 750)
  //         if(aaa <= 0){
  //           return
  //         }
  //         aaa =  aaa-0.001
  //   canvas.requestAnimationFrame(() => this.moveL());
  // },

  /**
   * 画图
   */
  toCanvasImage() {
    let that = this
    //2d
    const query = wx.createSelectorQuery()
    query.select('.imageCanvasA')
      .fields({ node: true, size: true })
      .exec((res) => {
        console.log(res)
        canvas = res[0].node
        ctx = canvas.getContext('2d')
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
        img = canvas.createImage()
        img.src = 'https://ae01.alicdn.com/kf/U342d19a853e44274918a64c53b64c3a0j.jpg'
        img.onload = () => {
          ctx.drawImage(img,
            0, img.height - img.width * 300 / 750,
            img.width, img.width * 300 / 750,
            0, 0,
            winWidth, 300 * winWidth / 750)
          that.setData({
            imageHeight: img.height * 750 / img.width
          })
          console.log(that.data.imageHeight * winWidth / 750 + "wangwangwang")
          console.log(that.data.middleHeight)
        }
      })
  },

  /**
   * 登录/注册
   */
  loginOrRegister: function(e) {
    wx.navigateTo({
      url: '../moudleB/pages/login/login',
    })
  },

  /**
   * 收藏
   */
  collect: function(e){
    let that = this
    let sessionid = wx.getStorageSync('sessionid')
    if (sessionid == null || sessionid == undefined || sessionid == '') {
      wx.navigateTo({
        url: '../moudleB/pages/login/login',
      })
    }else {
      wx.navigateTo({
        url: '../moudleB/pages/collect/collect',
      })
    }
  },

  /**
   * 自定义控件
   */
  widget: function(e){
    wx.navigateTo({
      url: '../moudleC/pages/widgetList/widgetList',
    })
  },

  /**
   * 妹子图
   */
  girls: function(e){
    wx.navigateTo({
      url: '../moudleB/pages/girls/girls',
    })
  },

  /**
   * 福利
   */
  welfare: function(e) {
    wx.navigateTo({
      url: '../moudleB/pages/about/about',
    })
  },

  /**
   * 关于开发
   */
  aboutUs: function(e){
    wx.showToast({
      title: '尽请期待',
      icon: 'none',
      duration: 2000
    })
  },

  /**
   * 退出登录
   */
  goOut: function(e){
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否确定退出当前账号',
      success(res) {
        if (res.confirm) {
          //console.log('用户点击确定')
          that.goOutNetWork()
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
  },

  goOutNetWork(){
    let that = this
    extractNetwork.getLogoutUrl().then(function (res) {
      //成功操作  
      console.log(res)
      if(res.data.errorCode == 0){
        wx.setStorageSync("user", "");
        wx.setStorageSync("sessionid", "");
        that.setData({
          userName: ''
        })
      }else{
        wx.showToast({
          title: '退出登录失败',
          icon: 'none',
          duration: 2000
        })
      }
    }, function (error) {
      console.log(error)
    }).catch(function () {
      console.error("get location failed")
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