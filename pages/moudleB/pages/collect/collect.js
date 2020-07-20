// pages/moudleB/pages/collect/collect.js
const app = getApp();
import extractNetwork from "../../../../utils/extractNetwork.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topDistance: app.globalData.systemInfo.navBarHeight + app.globalData.systemInfo.navBarExtendHeight,
    collectData: [],
    pageNum: 0,
    isFirstRequest: true,
    delBtnWidth: 180,
    canScrolly: true,
    isShowMove:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // that.setData({
    //   slideButtons: [{
    //     type: 'warn',
    //     text: '删除',
    //     extClass: 'test',
    //     data:'aaaaa'
    //   }],
    // })
    that.showCollectList(that)
  },

  slideButtonTap(e) {
    let that = this
    console.log('slide button tap', e)
    // if(e.detail.index == 0){
    //   //取消收藏
    //   console.log('取消收藏')
    // }
    // that.data.collectData.splice(e.detail.index,1)
    // that.setData({
    //   collectData: that.data.collectData
    // })
  },

  /**
   * 收藏列表
   */
  showCollectList(that){
    let header = {
      cookie: wx.getStorageSync('sessionid')
    }
    extractNetwork.getCollectList(that.data.pageNum, header).then(function (res) {
      console.log(res)
      if (that.data.isFirstRequest) {
        // res.data.data.datas.forEach(function (item, index) {
        //   item['slideButtons'] = [{type: 'warn', text: '删除', extClass: 'test', data:index}]
        // })
        that.setData({
          collectData: res.data.data.datas
        })
      } else {
        that.data.collectData = that.data.collectData.concat(res.data.data.datas)
        that.setData({
          collectData: that.data.collectData
        })
      }
    }, function (error) {
      console.log(error)
    }).catch(function () {
      console.error("get location failed")
    })
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
    that.showCollectList(that)
  },

  /**
   * 点击去详情页
   */
  clickDetail: function (e) {
    const url = e.currentTarget.dataset.link;
    console.log(url)
    wx.navigateTo({
      url: '../../../moudleA/pages/details/details?url=' + url + '&isNavigation=0',
    })
  },

  /**
   * 删除
   */
  delItem: function(e) {
    let that = this
    let id = e.currentTarget.dataset.id
    let collectString = 'uncollect_originId'
    let index = e.currentTarget.dataset.index
    // wx.showToast({
    //   title: '此功能暂未开放',
    //   icon: 'none',
    //   duration: 2000
    // })
    //id不同无法使用
    let header = {
      cookie: wx.getStorageSync('sessionid')
    }
    extractNetwork.postCollectUrl(collectString, id, header).then(function (res) {
      console.log(res)
      if (res.data.errorCode == -1001) {
        wx.showToast({
          title: res.data.errorMsg,
          icon: 'none',
          duration: 2000
        })
      } else {
        that.data.collectData.splice(index,1)
        that.setData({
          collectData: that.data.collectData
        })
      }
    }, function (error) {
      console.log(error)
    }).catch(function () {
      console.error("get location failed")
    })
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

  scrollymove:function(e){
    if(this.data.isShowMove){
      console.log(e)
      this.data.isShowMove=false
      let list = this.data.collectData;
      for (let i in list) {
        list[i].txtStyle = "left:-" + 0 + "rpx";
      }
      this.setData({
        collectData: list
      });
    }
  },

  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY
      });
    }
  },

  touchM: function (e) {
    console.log('移动移动'+e)
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      var moveY = e.touches[0].clientY
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var disY = this.data.startY - moveY;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (Math.abs(disX) > Math.abs(disY) && disX > 10) {
        var list = this.data.collectData;
        if(this.data.isShowMove){
          console.log('循环循环循环')
          this.data.isShowMove = false
          for (let i in list) {
            list[i].txtStyle = "left:-" + 0 + "rpx";
          }
        }
        this.setData({
          canScrolly: false
        })
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "rpx";
        } else {
          txtStyle = "left:-" + disX + "rpx";
        }
        //获取手指触摸的是哪一项
        var index = e.currentTarget.dataset.index;
        list[index].txtStyle = txtStyle;
        //更新列表的状态
        this.setData({
          collectData: list
        });
      } else if (Math.abs(disX) > Math.abs(disY) && disX < -10) {

        var index = e.currentTarget.dataset.index;
        var list = this.data.collectData;
        this.setData({
          canScrolly: false
        })
        if (list[index].txtStyle == null) {
          //console.log(list[index].txtStyle);
        } else {
          if (list[index].txtStyle == 'left:-0rpx' || list[index].txtStyle == 'left:0rpx') {
            //console.log(list[index].txtStyle);
          } else {
            if (Math.abs(disX) >= delBtnWidth) {
              //控制手指移动距离最大值为删除按钮的宽度
              txtStyle = "left:-" + 0 + "rpx";
            } else {
              txtStyle = "left:-" + (delBtnWidth + disX) + "rpx";
            }
            //获取手指触摸的是哪一项
            var index = e.currentTarget.dataset.index;
            var list = this.data.collectData;
            list[index].txtStyle = txtStyle;
            //更新列表的状态
            this.setData({
              collectData: list
            });
          }
        }
      } else {
        this.setData({
          canScrolly: true
        })
      }
    }
  },

  touchE: function (e) {
    console.log('结束结束'+e)
    this.setData({
      canScrolly: true
    })
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      var endY = e.changedTouches[0].clientY;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var disY = this.data.startY - endY;
      var delBtnWidth = this.data.delBtnWidth;
      console.log(disX)
      console.log(disY)
      if (Math.abs(disX) > Math.abs(disY) && disX > 10) {
        //如果距离小于删除按钮的1/2，不显示删除按钮
        var txtStyle = disX > delBtnWidth / 4 ? "left:-" + delBtnWidth + "rpx" : "left:0rpx";
        //获取手指触摸的是哪一项
        var index = e.currentTarget.dataset.index;
        var list = this.data.collectData;
        list[index].txtStyle = txtStyle;
        this.data.isShowMove = true
        //更新列表的状态
        this.setData({
          collectData: list
        });
      } else if (Math.abs(disX) > Math.abs(disY) && disX < -10) {
        var txtStyle = "left:-0rpx";
        //如果距离小于删除按钮的1/2，不显示删除按钮
        //var txtStyle = disX > delBtnWidth / 4 ? "left:-" + delBtnWidth + "rpx" : "left:0rpx";
        //获取手指触摸的是哪一项
        var index = e.currentTarget.dataset.index;
        var list = this.data.collectData;
        list[index].txtStyle = txtStyle;
        this.data.isShowMove = false
        //更新列表的状态
        this.setData({
          collectData: list
        });
      }else{
        var txtStyle = "left:-0rpx";
        var index = e.currentTarget.dataset.index;
        var list = this.data.collectData;
        list[index].txtStyle = txtStyle;
        this.data.isShowMove = false
        //更新列表的状态
        this.setData({
          collectData: list
        });
      }
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

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})