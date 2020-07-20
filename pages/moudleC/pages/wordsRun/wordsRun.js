// pages/moudleC/pages/wordsRun/wordsRun.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    text: '这是一条会滚动的文字跑马灯，啦啦啦',
    scrollDistance: 0,//效果一初始滚动距离
    scrollDistance2: 0,//效果二初始滚动距离
    scroll2copy_status:false,//是否展示紧跟的文字
    scroll2_margin: 100,//两个条目的间距
    scrollPace: 1,//滚动速度
    orientation: 'left',//滚动方向
    interval: 20, // 时间间隔
    intervalTime1: "",
    intervalTime2: "",
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
    let that = this
    if (pages.length >= 2) {
      wx.navigateBack({
        delta: 1
      });
      clearInterval(that.data.intervalTime1);
      clearInterval(that.data.intervalTime2);
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
    let that = this;
    let query = wx.createSelectorQuery();
    query.select('.scroll_text').boundingClientRect(function (rect) {
      console.log(rect.width)
      let textLength = rect.width//文字长度
      let windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
      that.setData({
        textLength: textLength,
        windowWidth: windowWidth,
        scroll2_margin: textLength < windowWidth ? windowWidth - textLength : that.data.scroll2_margin//当文字长度小于屏幕长度时，需要增加补白
      })
      that.scroll1() //水平一行字滚动完了再按照原来的方向滚动
      that.scroll2();// 第一个字消失后立即从右边出现
    }).exec();
    
  },

  scroll1: function() {
    let that = this
    that.data.intervalTime1 = setInterval(function () {
      if(-that.data.scrollDistance < that.data.textLength){
        that.setData({
          scrollDistance: that.data.scrollDistance - that.data.scrollPace,
        })
      }else{
        clearInterval(that.data.intervalTime1)
        that.setData({
          scrollDistance: that.data.windowWidth
        });
        that.scroll1()
      }
      console.log("...")
    }, that.data.interval)
  },

  scroll2: function () {
    let that = this;
    that.data.intervalTime2 = setInterval(function () {
      if (-that.data.scrollDistance2 < that.data.textLength) {
        // 如果文字滚动到出现scroll2_margin=100px的白边，就接着显示
        that.setData({
          scrollDistance2: that.data.scrollDistance2 - that.data.scrollPace,
          scroll2copy_status: that.data.textLength + that.data.scrollDistance2 <= 
          that.data.windowWidth + that.data.scroll2_margin,
        })
      } else {
        if (-that.data.scrollDistance2 >= that.data.scroll2_margin) { // 当第二条文字滚动到最左边时
          that.setData({
            scrollDistance2: that.data.scroll2_margin // 直接重新滚动
          })
          clearInterval(that.data.intervalTime2)
          that.scroll2()
        } else {
          clearInterval(that.data.intervalTime2)
          that.setData({
            scrollDistance2: -that.data.windowWidth
          });
          that.scroll2()
        }
      }
      console.log("ccc")
    }, that.data.interval);
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