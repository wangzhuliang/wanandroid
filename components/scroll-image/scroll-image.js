// components/scroll-image/scroll-image.js
var winWidth = wx.getSystemInfoSync().windowWidth;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    heightNumber: {
      type: Number,
      value: 0,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showCanvasImage() {
      //canvas组建封装，需要后加个this
      let context = wx.createCanvasContext('imageCanvas',this)
      context.drawImage('../../images/splash.png', 0, this.data.heightNumber, winWidth, winWidth*1920/1080)
      context.draw();
    }
  }
})
