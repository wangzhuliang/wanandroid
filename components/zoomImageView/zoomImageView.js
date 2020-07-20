// components/zoomImageView/zoomImageView.js

//记录上次触摸时手指的点
var lastTouchPoint = { x: 0, y: 0 };
//本次触摸事件双指间距
var newDist = 0;
//上次触摸事件双指间距
var oldDist = 0;

var app = getApp();

var winWidth = wx.getSystemInfoSync().windowWidth;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 图片地址
    img_src: {
      type: String
    },
    // 可视区域的大小
    view_width: {
      type: String
    },
    view_height: {
      type: String
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgWidth: 0,
    imgHeight: 0,
    marginTop: 0,
    marginLeft: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 图片加载完成方法
     */
    imgLoad: function (event) {
      this.setData({
        imgWidth: this.data.view_width,
        imgHeight: this.data.view_height,
        marginLeft: 75,
        marginTop: 75,
      })
    },

    /**
     * 触摸开始事件
     */
    touchStart: function () {
      lastTouchPoint = { x: 0, y: 0 }
      oldDist = 0
    },

    /**
     * 手指移动事件
     */
    touchMove: function (e) {
      // 单指移动事件
      if (e.touches.length == 1) {
        if (lastTouchPoint.x == 0 && lastTouchPoint.y == 0) {
          lastTouchPoint.x = e.touches[0].clientX
          lastTouchPoint.y = e.touches[0].clientY
        } else {
          var xOffset = e.touches[0].clientX - lastTouchPoint.x
          var yOffset = e.touches[0].clientY - lastTouchPoint.y
          this.setData({
            marginTop: this.data.marginTop + yOffset,
            marginLeft: this.data.marginLeft + xOffset,
          })
          lastTouchPoint.x = e.touches[0].clientX
          lastTouchPoint.y = e.touches[0].clientY
        }
      }
      // 双指缩放事件
      if (e.touches.length == 2) {
        if (oldDist == 0) {
          oldDist = this._spacing(e);
        } else {
          newDist = this._spacing(e);
          if (newDist > oldDist + 1) {
            this._zoom(newDist / oldDist, e);
            oldDist = newDist;
          }
          if (newDist < oldDist - 1) {
            this._zoom(newDist / oldDist, e);
            oldDist = newDist;
          }
        }
      }
    },
    
    /**
     * 触摸事件结束
     */
    touchEnd: function () {
      this._reboundAnimation();
    },

    /**
     * 计算x轴上的双指中心点比例
     */
    _calcXRatio: function (event) {
      var xRatio = ((event.touches[0].clientX + event.touches[1].clientX) / 2 - this.data.marginLeft) / this.data.imgWidth
      return xRatio
    },

    /**
     * 计算y轴上的双指中心点比例 注意是图片的中心点
     */
    _calcYRatio: function (event) {
      let max, min;
      if (app.globalData.systemInfo.screenHeight > app.globalData.systemInfo.screenWidth) {
        max = app.globalData.systemInfo.screenHeight;
        min = app.globalData.systemInfo.screenWidth;
      } else {
        min = app.globalData.systemInfo.screenHeight;
        max = app.globalData.systemInfo.screenWidth;
      }
      let top;
      if (app.globalData.systemInfo.deviceOrientation === 'portrait') {
        top = 0.75 * min + 35 + 42;
      } else {
        if (app.globalData.systemInfo.model.indexOf('iPad') > -1) {
          top = 0.03 * max;
        } else {
          top = (min - 0.421875 * max) / 2;
        }
      }
      var yRatio = ((event.touches[0].clientY + event.touches[1].clientY) / 2 - this.data.marginTop - top) / this.data.imgHeight
      return yRatio
    },

    /**
     * 双指缩放
     */
    _zoom: function (f, event) {
      var xRatio = this._calcXRatio(event)
      var yRatio = this._calcYRatio(event)
      if (this.data.imgWidth <= this.data.view_width && f < 1) {
        var ratio = this.data.view_width / this.data.imgWidth
        this.setData({
          imgWidth: this.data.imgWidth * ratio,
          imgHeight: this.data.imgHeight * ratio
        })
        return;
      }
      if (this.data.imgHeight <= this.data.view_height && f < 1) {
        var ratio = this.data.view_height / this.data.imgHeight
        this.setData({
          imgWidth: this.data.imgWidth * ratio,
          imgHeight: this.data.imgHeight * ratio
        })
        return;
      }
      // this.setData({
      //   // 此处的ratio为双指中心点在图片的百分比
      //   marginLeft: this.data.marginLeft + xRatio * this.data.imgWidth * (1 - f),
      //   marginTop: this.data.marginTop + yRatio * this.data.imgHeight * (1 - f),
      //   imgWidth: this.data.imgWidth * f,
      //   imgHeight: this.data.imgHeight * f,
      // })

      this.setData({
        // 此处的ratio为双指中心点在图片的百分比
        marginLeft: this.data.marginLeft - this.data.imgWidth * (f-1) / 2,
        marginTop: this.data.marginTop - this.data.imgHeight * (f-1) / 2,
        imgWidth: this.data.imgWidth * f,
        imgHeight: this.data.imgHeight * f,
      })
    },

    /**
    * 计算两指间距
    */
    _spacing: function (event) {
      var x = event.touches[0].clientX - event.touches[1].clientX;
      var y = event.touches[0].clientY - event.touches[1].clientY;
      return Math.sqrt(x * x + y * y);//平方根
    },

    /**
     * 边界的回弹动画
     */
    _reboundAnimation: function () {
      if (this.data.marginTop > 0) {
        this.setData({
          marginTop: 75
        })
      }
      if (this.data.marginLeft > 0) {
        this.setData({
          marginLeft: 75
        })
      }
      if (this.data.marginLeft < 0 && (this.data.imgWidth - Math.abs(this.data.marginLeft)) < this.data.view_width) {
        this.setData({
          marginLeft: this.data.view_width - this.data.imgWidth + 75
        })
      }
      if (this.data.marginTop < 0 && (this.data.imgHeight - Math.abs(this.data.marginTop)) < this.data.view_height) {
        this.setData({
          marginTop: this.data.view_height - this.data.imgHeight + 75
        })
      }
    },

    // 强制图片宽高缩放为1
    initImgSize(size) {
      this.setData({
        imgWidth: size.x,
        imgHeight: size.y,
        marginLeft: 75,
        marginTop: 75,
      })
    },

    // saveImage(){
    //   this.triggerEvent('saveImage', { msg: true });
    // }

  }
})
