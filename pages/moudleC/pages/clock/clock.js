// pages/moudleC/pages/clock/clock.js

let ctx;
let canvas;
let radius;
let windowWidth;

function degToRad(degree) {
  var factor = Math.PI / 180;
  return degree * factor;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: function(res) {
          windowWidth = res.windowWidth
          radius = windowWidth/750*500/2
      }
  });
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
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this
    const query = wx.createSelectorQuery()
    query.select('#clockOne')
      .fields({ node: true, size: true })
      .exec((res) => {
        canvas = res[0].node
        ctx = canvas.getContext('2d')

        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        
        ctx.scale(dpr, dpr)

        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 17;
        ctx.lineCap = 'round';
        
        that.play(that)
        
      })
  },

  play(that){
    if(that.data.timer){
      clearTimeout(that.data.timer)
    }
    that.renderTime();
    that.data.timer = setTimeout(() => {
      that.play(that)
    }, 900);
  },

  renderTime(){
    //标准时间 now = Sat Jul 04 2020 11:02:36 GMT+0800
    let now = new Date()
    //今天的日期Sat Jul 04 2020
    let today = now.toDateString()
    //上午11:02:36
    let time = now.toLocaleTimeString()
    //小时 11
    let hrs = now.getHours()
    //分钟 2
    let min = now.getMinutes()
    //秒 36
    let sec = now.getSeconds()
    //毫秒数 638
    let mil = now.getMilliseconds()
    //秒数总和：36.638
    let smoothsec = sec + (mil / 1000)
    //分钟+秒数：2.36638
    let smoothmin = min + (smoothsec / 60)
    
    //Background
    //let gradient = ctx.createCircularGradient(radius, radius, radius + 50)
    //ctx.save();
    //gradient.addColorStop(0, "#03303a");
    //gradient.addColorStop(1, "black");
    //ctx.setFillStyle(gradient);
    //ctx.fillRect(0, 0, 500, 500);
    //ctx.restore();

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    /** text begin**/
    //ctx.setShadow(0, 0, 2, '#28d1fa');
    //Date
    //ctx.save();
    ctx.fontsize = '12'
    ctx.fillStyle = "#333333"
    ctx.fillText(today, radius*2, radius-12)

    //Time
    //ctx.save();
    ctx.fontsize = '12';
    ctx.fillStyle = "#333333"
    ctx.fillText(time, radius*2, radius)
    //ctx.restore();
    
    //Hours
    if(hrs <= 12){
      ctx.beginPath();
      ctx.arc(radius, radius, radius - 50, degToRad(-90), degToRad(hrs/12*360-90), false);
      ctx.stroke();
    }else{
      ctx.beginPath();
      ctx.arc(radius, radius, radius - 50, degToRad(-90), degToRad((hrs-12)/12*360-90), false);
      ctx.stroke();
    }
    
    
    //Minutes
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 80, degToRad(-90), degToRad((smoothmin * 6) - 90), false);
    ctx.stroke();

    //Seconds
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 110, degToRad(-90), degToRad((smoothsec * 6) - 90), false);
    ctx.stroke();
    
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
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    clearTimeout(this.data.timer);
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