// pages/moudleB//pages/register/register.js
import extractNetwork from "../../../../utils/extractNetwork.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    password: '',
    repassword: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync('user')
    if (user == null || user == undefined || user == '') {
      this.setData({
        userName: ''
      })
    } else {
      this.setData({
        userName: user.username
      })
    }
  },

  /**
   * 输入用户名
   */
  onNameChange: function (e) {
    console.log(e.detail.value);
    var strReturn = '';
    var len = 0;
    for (var i = 0; i < e.detail.value.length; i++) {
      //正则表达式判断中文
      if (/[\u4e00-\u9fa5]/.test(e.detail.value[i])) {
        len += 2;
      } else {
        len++;
      }
      if (len <= 20) {
        strReturn = strReturn + e.detail.value[i];
      }
    }
    if (len > 12) {
      this.setData({
        userName: strReturn
      })
    } else {
      this.setData({
        userName: e.detail.value
      })
    }
  },

  /**
   * 输入密码
   */
  onPwdChange: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  /**
   * 输入确认密码
   */
  onRePwdChange: function(e) {
    this.setData({
      repassword: e.detail.value
    })
  },

  /**
   * 注册
   */
  register: function(e) {
    let that = this
    if(that.data.userName.length != 0 && that.data.password.length != 0 && that.data.repassword.length != 0){
      if(that.data.password == that.data.repassword){
        let params = {
          username: that.data.userName, 
          password: that.data.password, 
          repassword: that.data.repassword
        }
        extractNetwork.postRegisterUrl(params).then(function (res) {
          //成功操作  
          console.log(res)
          if(res.data.errorCode == 0){
            wx.setStorageSync('user', res.data.data)
            wx.setStorageSync("sessionid", res.header['Set-Cookie']);
            let pages = getCurrentPages()
            let beforePage = pages[pages.length - 3]
            beforePage.onLoad()
            wx.navigateBack({
              delta: 2
            })
          }else{
            that.showToast(res.data.errorMsg)
          }
        }, function (error) {
          console.log(error)
        }).catch(function () {
          console.error("get location failed")
        })
      }else{
        that.showToast('密码输入不一致')
      }
    }else {
      that.showToast('请输入完整信息')
    }
  },

  showToast(message) {
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 2000
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

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})