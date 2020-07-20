// pages/moudleC/pages/waterRipple/waterRipple.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCan: true,

    isCan1: true,
    isCan2: true,
    isCan3: true,
    isCan4: true,
    isCan5: true
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

  containerTap:function(res){
    let that = this
    console.log(res.touches[0]);

    let x=res.touches[0].pageX-25;
    let y=res.touches[0].pageY+25;

    if(that.data.isCan1){
      console.log("1")
      that.data.isCan1 = false
      this.setData({
        rippleStyle1:'top:'+y+'px;left:'+x+'px;animation:ripple 0.4s linear;'
      });
      setTimeout(function(){
        that.data.isCan1 = true
        that.setData({
          rippleStyle1: ''
        });
      },500)
    }else if(that.data.isCan2){
      console.log("2")
      that.data.isCan2 = false
      this.setData({
        rippleStyle2:'top:'+y+'px;left:'+x+'px;-webkit-animation: ripple 0.4s linear;animation:ripple 0.4s linear;'
      });
      setTimeout(function(){
        that.data.isCan2 = true
        that.setData({
          rippleStyle2: ''
        });
      },500)
    }else if(that.data.isCan3){
      console.log("3")
      that.data.isCan3 = false
      this.setData({
        rippleStyle3:'top:'+y+'px;left:'+x+'px;-webkit-animation: ripple 0.4s linear;animation:ripple 0.4s linear;'
      });
      setTimeout(function(){
        that.data.isCan3 = true
        that.setData({
          rippleStyle3: ''
        });
      },500)
    }else if(that.data.isCan4){
      console.log("4")
      that.data.isCan4 = false
      this.setData({
        rippleStyle4:'top:'+y+'px;left:'+x+'px;-webkit-animation: ripple 0.4s linear;animation:ripple 0.4s linear;'
      });
      setTimeout(function(){
        that.data.isCan4 = true
        that.setData({
          rippleStyle4: ''
        });
      },500)
    }else if(that.data.isCan5){
      console.log("5")
      that.data.isCan5 = false
      this.setData({
        rippleStyle5:'top:'+y+'px;left:'+x+'px;-webkit-animation: ripple 0.4s linear;animation:ripple 0.4s linear;'
      });
      setTimeout(function(){
        that.data.isCan5 = true
        that.setData({
          rippleStyle5: ''
        });
      },500)
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