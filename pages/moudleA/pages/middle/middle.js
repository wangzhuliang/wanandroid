// pages/moudleA//pages/middle/middle.js
const app = getApp()
const winWidth = wx.getSystemInfoSync().windowWidth;
const leftFirst = 75;
const topFirst = 100;
const idList = ['#cardOne', '#cardTwo','#cardThree'];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    left: leftFirst,
    top: topFirst,
    topDistance: app.globalData.systemInfo.navBarHeight + app.globalData.systemInfo.navBarExtendHeight,
    widthHalf: app.globalData.systemInfo.windowWidth / 2,
    startX: 0,
    startY: 0,
    indexThree: 1,
    indexTwo: 2,
    indexOne: 3,
    isCanMove: true,
    nameThree: '',
    nameTwo: '',
    nameOne: '',
    imageThree: '',
    imageTwo: '',
    imageOne: '',
    numberThree: 2,
    numberTwo: 1,
    numberOne: 0,
    list: [
      { name: '体系', image: '../../imgs/iv_system.png' },
      { name: '热搜', image: '../../imgs/iv_top_search.png' },
      { name: '项目', image: '../../imgs/iv_project.png' },
      { name: '导航', image: '../../imgs/iv_navigation.png' }
    ],
    changeMode:true,
    cardOneHidden: false,
    cardTwoHidden: false,
    cardThreeHidden: false
  },
  //{ name: '控件', image: '../../imgs/iv_widget.png' }

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    //初始动画
    that.animate(idList[1], [
      { scale: [0.9, 0.9], translateY: 60 * winWidth / 750}
    ], 100, function () {
        that.clearAnimation(idList[1], function () {
      })
      }.bind(that))
    that.animate(idList[2], [
      { scale: [0.8, 0.8], translateY: 136 * winWidth / 750}
    ], 100, function () {
        that.clearAnimation(idList[2], function () {
      })
      }.bind(that))
    //初始数据
    that.setData({
      nameThree: that.data.list[that.data.numberThree].name,
      nameTwo: that.data.list[that.data.numberTwo].name,
      nameOne: that.data.list[that.data.numberOne].name,
      imageThree: that.data.list[that.data.numberThree].image,
      imageTwo: that.data.list[that.data.numberTwo].image,
      imageOne: that.data.list[that.data.numberOne].image
    })
  },

  /**
   * 开始按下
   */
  bindtouchstart: function(event) {
    this.setData({
      startX: event.touches[0].clientX,
      startY: event.touches[0].clientY
    })
  },

  /**
   * 拖动
   */
  bindtouchmove: function (event) {
    let that = this;
    if(that.data.isCanMove){
      if (event.currentTarget.id == 'cardOne' && !that.data.cardOneHidden){
        that.toMove(event,that)
      } else if (event.currentTarget.id == 'cardTwo' && !that.data.cardTwoHidden){
        that.toMove(event, that)
      } else if (event.currentTarget.id == 'cardThree' && !that.data.cardThreeHidden){
        that.toMove(event, that)
      }
    }
  },

  toMove(event, that){
    let distanceX = event.changedTouches[0].clientX - this.data.startX
    let distanceY = event.changedTouches[0].clientY - this.data.startY
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      that.animate('#' + event.currentTarget.id, [
        { translateX: distanceX, rotate: distanceX / that.data.widthHalf * 20 }
      ], 100, function () {
        that.clearAnimation('#' + event.currentTarget.id, function () {

        })
      }.bind(that))
    }
  },

  /**
   * 手指离开
   */
  bindtouchend: function (event) {
    let that = this;
    if (that.data.isCanMove) {
      if (event.currentTarget.id == 'cardOne' && !that.data.cardOneHidden) {
        that.toEnd(event, that)
      } else if (event.currentTarget.id == 'cardTwo' && !that.data.cardTwoHidden) {
        that.toEnd(event, that)
      } else if (event.currentTarget.id == 'cardThree' && !that.data.cardThreeHidden) {
        that.toEnd(event, that)
      }
    }
  },

  toEnd(event, that){
    that.setData({
      isCanMove: false
    })
    let distanceX = event.changedTouches[0].clientX - that.data.startX
    if (distanceX > 93.75) {
      that.toMoveNext('right', distanceX, event.currentTarget.id)
    } else if (distanceX < -93.75) {
      that.toMoveNext('left', distanceX, event.currentTarget.id)
    } else {
      that.toHoming(that, event.currentTarget.id, distanceX)
    }
  },

  /**
   * 切换，第一个到最后一个
   */
  toMoveNext(direction, distanceX, id){
    let that = this
    setTimeout(function () {
      if (id == 'cardOne') {
        that.setData({
          indexThree: 2,
          indexTwo: 3,
          indexOne: 1,
        })
      } else if (id == 'cardTwo') {
        that.setData({
          indexThree: 3,
          indexTwo: 1,
          indexOne: 2,
        })
      } else {
        that.setData({
          indexThree: 1,
          indexTwo: 2,
          indexOne: 3,
        })
      }
    }, 250)

    that.toAddList(direction, id, that)

    if (direction == 'left') {
      that.toDirection(id, -500, -45, that, distanceX)
    } else {
      that.toDirection(id, 500, 45, that, distanceX)
    }

    if (id == 'cardOne') {
      that.toChangeTwo('#cardTwo', '#cardThree', that, that.data.numberTwo, that.data.numberThree)
    } else if (id == 'cardTwo') {
      that.toChangeTwo('#cardThree', '#cardOne', that, that.data.numberThree, that.data.numberOne)
    } else {
      that.toChangeTwo('#cardOne', '#cardTwo', that, that.data.numberOne, that.data.numberTwo)
    }
  },

  /**
   * 添加滑动方向
   */
  toAddList(direction, id, that){
    if (id == 'cardOne') {
      that.data.list[that.data.numberOne % that.data.list.length]['direction'] = direction
      that.setData({
        list: that.data.list
      })
    } else if (id == 'cardTwo') {
      that.data.list[that.data.numberTwo % that.data.list.length]['direction'] = direction
      that.setData({
        list: that.data.list
      })
    } else {
      that.data.list[that.data.numberThree % that.data.list.length]['direction'] = direction
      that.setData({
        list: that.data.list
      })
    }
  },

  /**
   * 左右方向判断
   */
  toDirection(id, translateXNew, rotateNew, that, distanceX){
    //模式判断
    if(that.data.changeMode){
      that.animate('#' + id, [
        { translateX: distanceX, rotate: distanceX / that.data.widthHalf * 20, opacity: 1, scale: [1, 1], translateY: 0 },
        { translateX: translateXNew, rotate: rotateNew, opacity: 1, scale: [1, 1], translateY: 0 },
        { translateX: 0, rotate: 0, opacity: 1, scale: [0.8, 0.8], translateY: 136 * winWidth / 750 }
      ], 500, function () {
        //   that.clearAnimation('#' + id, function () {
        // })
        that.setData({
          isCanMove: true
        })
        if (id == "cardOne") {
          that.setData({
            nameOne: that.data.list[(that.data.numberOne + 3) % that.data.list.length].name,
            imageOne: that.data.list[(that.data.numberOne + 3) % that.data.list.length].image,
            numberOne: that.data.numberOne + 3
          })
        } else if (id == "cardTwo") {
          that.setData({
            nameTwo: that.data.list[(that.data.numberTwo + 3) % that.data.list.length].name,
            imageTwo: that.data.list[(that.data.numberTwo + 3) % that.data.list.length].image,
            numberTwo: that.data.numberTwo + 3
          })
        } else {
          that.setData({
            nameThree: that.data.list[(that.data.numberThree + 3) % that.data.list.length].name,
            imageThree: that.data.list[(that.data.numberThree + 3) % that.data.list.length].image,
            numberThree: that.data.numberThree + 3
          })
        }
      }.bind(that))
    }else{
      if (id == "cardOne") {
        if(that.data.numberOne + 3 >= that.data.list.length) {
          that.changedPagesMore(id, distanceX, translateXNew, rotateNew, that)
        } else {
          that.changedPages(id, distanceX, translateXNew, rotateNew, that)
        }
      } else if (id == "cardTwo") {
        if (that.data.numberTwo + 3 >= that.data.list.length) {
          that.changedPagesMore(id, distanceX, translateXNew, rotateNew, that)
        } else {
          that.changedPages(id, distanceX, translateXNew, rotateNew, that)
        }
      } else {
        if (that.data.numberThree + 3 >= that.data.list.length) {
          that.changedPagesMore(id, distanceX, translateXNew, rotateNew, that)
        } else {
          that.changedPages(id, distanceX, translateXNew, rotateNew, that)
        }
      }
    }
  },

  /**
   * 当大于等于总数时
   */
  changedPagesMore(id, distanceX, translateXNew, rotateNew, that){
    //不需要回来动画的
    that.animate('#' + id, [
      { translateX: distanceX, rotate: distanceX / that.data.widthHalf * 20, opacity: 1, scale: [1, 1], translateY: 0 },
      { translateX: translateXNew, rotate: rotateNew, opacity: 0, scale: [1, 1], translateY: 0 },
      { translateX: 0, rotate: 0, opacity: 0, scale: [0.8, 0.8], translateY: 136 * winWidth / 750 }
    ], 500, function () {
      // that.clearAnimation('#' + id, function () {
      // })
      that.setData({
        isCanMove: true
      })
      if (id == "cardOne") {
        that.setData({
          numberOne: that.data.numberOne + 3,
          cardOneHidden: true
        })
      } else if (id == "cardTwo") {
        that.setData({
          numberTwo: that.data.numberTwo + 3,
          cardTwoHidden: true
        })
      } else {
        that.setData({
          numberThree: that.data.numberThree + 3,
          cardThreeHidden: true
        })
      }
    }.bind(that))
  },

  /**
   * 当小于总数时
   */
  changedPages(id, distanceX, translateXNew, rotateNew, that){
    //不需要回来动画的
    that.animate('#' + id, [
      { translateX: distanceX, rotate: distanceX / that.data.widthHalf * 20, opacity: 1, scale: [1, 1], translateY: 0 },
      { translateX: translateXNew, rotate: rotateNew, opacity: 0, scale: [1, 1], translateY: 0 },
      { translateX: 0, rotate: 0, opacity: 0, scale: [0.8, 0.8], translateY: 136 * winWidth / 750 },
      { translateX: 0, rotate: 0, opacity: 1, scale: [0.8, 0.8], translateY: 136 * winWidth / 750 }
    ], 500, function () {
      // that.clearAnimation('#' + id, function () {
      // })
      that.setData({
        isCanMove: true
      })
      if (id == "cardOne") {
        that.setData({
          nameOne: that.data.list[(that.data.numberOne + 3) % that.data.list.length].name,
          imageOne: that.data.list[(that.data.numberOne + 3) % that.data.list.length].image,
          numberOne: that.data.numberOne + 3
        })
      } else if (id == "cardTwo") {
        that.setData({
          nameTwo: that.data.list[(that.data.numberTwo + 3) % that.data.list.length].name,
          imageTwo: that.data.list[(that.data.numberTwo + 3) % that.data.list.length].image,
          numberTwo: that.data.numberTwo + 3
        })
      } else {
        that.setData({
          nameThree: that.data.list[(that.data.numberThree + 3) % that.data.list.length].name,
          imageThree: that.data.list[(that.data.numberThree + 3) % that.data.list.length].image,
          numberThree: that.data.numberThree + 3
        })
      }
    }.bind(that))
  },

  /**
   * 修改另外两个卡片状态
   */
  toChangeTwo(idOne, idTwo, that, numberOne, numberTwo){
    if(that.data.changeMode){
      that.animate(idOne, [
        { scale: [0.9, 0.9], translateY: 60 * winWidth / 750 },
        { scale: [1, 1], translateY: 0 }
      ], 500, function () {
        //   that.clearAnimation(idOne, function () {
        // })
      }.bind(that))
      that.animate(idTwo, [
        { scale: [0.8, 0.8], translateY: 136 * winWidth / 750 },
        { scale: [0.9, 0.9], translateY: 60 * winWidth / 750 }
      ], 500, function () {
        //   that.clearAnimation(idTwo, function () {
        // })
      }.bind(that))
    }else{
      if (numberOne < that.data.list.length){
        that.animate(idOne, [
          { scale: [0.9, 0.9], translateY: 60 * winWidth / 750 },
          { scale: [1, 1], translateY: 0 }
        ], 500, function () {
          //   that.clearAnimation(idOne, function () {
          // })
        }.bind(that))
      }
      if (numberTwo < that.data.list.length){
        that.animate(idTwo, [
          { scale: [0.8, 0.8], translateY: 136 * winWidth / 750 },
          { scale: [0.9, 0.9], translateY: 60 * winWidth / 750 }
        ], 500, function () {
          //   that.clearAnimation(idTwo, function () {
          // })
        }.bind(that))
      }
    }
  },

  /**
   * 归位
   */
  toHoming(that, id, distanceX){
    that.animate('#'+ id, [
      { translateX: distanceX, rotate: distanceX / that.data.widthHalf * 20 },
      { translateX: 0, rotate: 0 }
    ], 500, function () {
      that.clearAnimation('#' + id, function () { 
      })
      that.setData({
        isCanMove: true
      })
    }.bind(that))
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
    // wx.showModal({
    //   title: '你点击了返回',
    //   content: '是否确认放回',
    //   success: e => {
    //     if (e.confirm) {
    //       const pages = getCurrentPages();
    //       if (pages.length >= 2) {
    //         wx.navigateBack({
    //           delta: 1
    //         });
    //       }
    //     }
    //   }
    // });
  },

  /**
   * 上一页
   */
  previousPage: function(){
    let that = this
    if(that.data.isCanMove){
      if (that.data.indexOne == 1) {
        if (that.toCompareZero(that.data.numberOne)){
          if(that.data.cardOneHidden){
            that.setData({
              cardOneHidden:false
            })
          }
          let data = {
          indexThree: 1,
          indexTwo: 2,
          indexOne: 3,
          nameOne: that.data.list[(that.data.numberOne - 3) % that.data.list.length].name,
          imageOne: that.data.list[(that.data.numberOne - 3) % that.data.list.length].image,
          numberOne: that.data.numberOne - 3
        }
          that.toPrevious(that.data.numberOne, data, that.data.list[(that.data.numberOne - 3) % that.data.list.length].direction, '#cardOne', '#cardTwo', '#cardThree', that)
        }else{
          wx.showToast({
            title: '已经到头了',
            icon: 'none',
          })
        }
      } else if (that.data.indexTwo == 1) {
        if(that.toCompareZero(that.data.numberTwo)){
          if (that.data.cardTwoHidden) {
            that.setData({
              cardTwoHidden: false
            })
          }
          let data = {
            indexThree: 2,
            indexTwo: 3,
            indexOne: 1,
            nameTwo: that.data.list[(that.data.numberTwo - 3) % that.data.list.length].name,
            imageTwo: that.data.list[(that.data.numberTwo - 3) % that.data.list.length].image,
            numberTwo: that.data.numberTwo - 3
          }
          that.toPrevious(that.data.numberTwo, data, that.data.list[(that.data.numberTwo - 3) % that.data.list.length].direction, '#cardTwo', '#cardThree', '#cardOne', that)
        }else{
          wx.showToast({
            title: '已经到头了',
            icon: 'none',
          })
        }
      } else {
        if (that.toCompareZero(that.data.numberThree)){
          if (that.data.cardThreeHidden) {
            that.setData({
              cardThreeHidden: false
            })
          }
          let data = {
            indexThree: 3,
            indexTwo: 1,
            indexOne: 2,
            nameThree: that.data.list[(that.data.numberThree - 3) % that.data.list.length].name,
            imageThree: that.data.list[(that.data.numberThree - 3) % that.data.list.length].image,
            numberThree: that.data.numberThree - 3
          }
          that.toPrevious(that.data.numberThree, data, that.data.list[(that.data.numberThree - 3) % that.data.list.length].direction, '#cardThree', '#cardOne', '#cardTwo', that)
        }else{
          wx.showToast({
            title: '已经到头了',
            icon: 'none',
          })
        }
      }
    }
  },

  /**
   * 比较是否小于0
   */
  toCompareZero(number){
    if (number - 3 >= 0) {
      return true
    }else{
      return false
    }
  },
  
  /**
   * 判断返回
   */
  toPrevious(number, data, direction, idOne, idTwo, idThree, that) {
    setTimeout(function () {
      that.setData(data)
    }, 250)
    if (direction == 'left') {
      that.toShowAnimation(-500, -45, idOne, idTwo, idThree, that)
    } else {
      that.toShowAnimation(500, 45, idOne, idTwo, idThree, that)
    }
  },

  /**
   * 返回动画
   */
  toShowAnimation(translateXNew, rotateNew, idOne, idTwo, idThree, that){
    that.animate(idOne, [
      { translateX: 0, rotate: 0, opacity: 1, scale: [0.8, 0.8], translateY: 136 * winWidth / 750 },
      { translateX: translateXNew, rotate: rotateNew, opacity: 1, scale: [1, 1], translateY: 0 },
      { translateX: 0, rotate: 0, opacity: 1, scale: [1, 1], translateY: 0 },
    ], 500, function () {
      //   that.clearAnimation('#' + id, function () {
      // })
      that.setData({
        isCanMove: true
      })
    }.bind(that))
    that.animate(idTwo, [
      { scale: [1, 1], translateY: 0 },
      { scale: [0.9, 0.9], translateY: 60 * winWidth / 750 }
    ], 500, function () {
      //   that.clearAnimation(idOne, function () {
      // })
    }.bind(that))
    that.animate(idThree, [
      { scale: [0.9, 0.9], translateY: 60 * winWidth / 750 },
      { scale: [0.8, 0.8], translateY: 136 * winWidth / 750 }
    ], 500, function () {
      //   that.clearAnimation(idTwo, function () {
      // })
    }.bind(that))
  },

  /**
   * 重置
   * { name: '控件', image: '../../imgs/iv_widget.png' }
   */
  reset: function() {
    let that = this;
    let listNew = [
      { name: '体系', image: '../../imgs/iv_system.png' },
      { name: '热搜', image: '../../imgs/iv_top_search.png' },
      { name: '项目', image: '../../imgs/iv_project.png' },
      { name: '导航', image: '../../imgs/iv_navigation.png' }
    ]
    that.setData({
      list:listNew,
      left: leftFirst,
      top: topFirst,
      startX: 0,
      startY: 0,
      indexThree: 1,
      indexTwo: 2,
      indexOne: 3,
      isCanMove: true,
      nameThree: '',
      nameTwo: '',
      nameOne: '',
      numberThree: 2,
      numberTwo: 1,
      numberOne: 0,
      imageThree: listNew[2].image,
      imageTwo: listNew[1].image,
      imageOne: listNew[0].image,
      nameThree: listNew[2].name,
      nameTwo: listNew[1].name,
      nameOne: listNew[0].name,
      cardOneHidden: false,
      cardTwoHidden: false,
      cardThreeHidden: false
    })

    that.animate(idList[0], [
      { scale: [1, 1], translateY: 0, opacity: 1}
    ], 100, function () {
      that.clearAnimation(idList[0], function () {
      })
    }.bind(that))
    that.animate(idList[1], [
      { scale: [0.9, 0.9], translateY: 60 * winWidth / 750, opacity: 1}
    ], 100, function () {
      that.clearAnimation(idList[1], function () {
      })
    }.bind(that))
    that.animate(idList[2], [
      { scale: [0.8, 0.8], translateY: 136 * winWidth / 750, opacity: 1}
    ], 100, function () {
      that.clearAnimation(idList[2], function () {
      })
    }.bind(that))
  },
  
  /**
   * 循环模式
   */
  circulationMode: function(){
    let that = this
    that.reset()
    that.setData({
      changeMode: true
    })
  },

  /**
   * 递减模式
   */
  decreaseMode: function(){
    let that = this
    that.reset()
    that.setData({
      changeMode: false
    })
  },

  /**
   * 前往各个模式
   */
  toPattern: function(e) {
    let that = this
    let id = e.currentTarget.id
    if (id == "cardOne") {
      that.toNavigateTo(that.data.nameOne)
    } else if (id == "cardTwo") {
      that.toNavigateTo(that.data.nameTwo)
    } else {
      that.toNavigateTo(that.data.nameThree)
    }
    
  },

  /**
   * 前往各个页面
   */
  toNavigateTo(name) {
    let that = this
    that.setData({
      isCanMove: true
    })
    if (name == "体系") {
      wx.navigateTo({
        url: '../system/system'
      })
    } else if (name == "热搜") {
      wx.navigateTo({
        url: '../search/search'
      })
    } else if (name == "项目") {
      wx.navigateTo({
        url: '../project/project'
      })
    } else if (name == "导航") {
      wx.navigateTo({
        url: '../navigation/navigation'
      })
    } else {
      wx.navigateTo({
        url: '../widget/widget'
      })
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