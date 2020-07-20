//index.js
//获取应用实例
const app = getApp()
import extractNetwork from "../../utils/extractNetwork.js";
let network = require('../../utils/network.js');
let winWidth = wx.getSystemInfoSync().windowWidth;
let winHeight = wx.getSystemInfoSync().windowHeight;
let ctx;
let img;
let isHeader = true;
let isBottom = true;
let timer = '';
Page({
  data: {
    tabbar: {},
    topDistance: app.globalData.systemInfo.navBarHeight + app.globalData.systemInfo.navBarExtendHeight,
    isIphoneX: app.globalData.systemInfoBottom.model.search('iPhone X') != -1 ? true : false,
    isFirst:false,
    interval: 3000,
    duration: 800,
    bannerData: [],
    homeData: [],
    pageNum: 0,
    heightNumber:0,
    imageHeight:0,
    isOpacity:1,
    swiperIndex:0,
    isFirstRequest:true,
    isShow:true,
    //顶部栏到底部栏距离
    middleHeight: winHeight - (app.globalData.systemInfo.navBarHeight + app.globalData.systemInfo.navBarExtendHeight) - (app.globalData.systemInfoBottom.model.search('iPhone X') != -1 ? 164 * winWidth / 750 : 98 * winWidth / 750),
    //图片即将从底部栏进入距离
    toShowTop: (1510 + 440) * winWidth / 750 - (winHeight - (app.globalData.systemInfo.navBarHeight + app.globalData.systemInfo.navBarExtendHeight) - (app.globalData.systemInfoBottom.model.search('iPhone X') != -1 ? 164 * winWidth / 750 : 98 * winWidth / 750)),
    //图片全部从底部栏进入距离
    toShowAll: (1810 + 440) * winWidth / 750 - (winHeight - (app.globalData.systemInfo.navBarHeight + app.globalData.systemInfo.navBarExtendHeight) - (app.globalData.systemInfoBottom.model.search('iPhone X') != -1 ? 164 * winWidth / 750 : 98 * winWidth / 750)),
    //图片头部即将离开顶部栏距离
    toleaveTop: (1510 + 440) * winWidth / 750,
    //图片全部即将离开顶部栏距离
    toleaveAll: (1810 + 440) * winWidth / 750
  }, 
  onLoad: function () {
    
    app.editTabbar();
    let that = this;

    that.toChoiceFirst(that);
    that.toBanner(that);
    that.toHomeList(that);
    //that.toShowGirl(that);
  },

  //判断提示添加我的小程序
  toChoiceFirst(that) {
    wx.getFileSystemManager().readFile({
      filePath: `${wx.env.USER_DATA_PATH}/wang.txt`,
      encoding: 'utf-8',
      success: res => {
        //返回临时文件路径
        console.log(res.data)
        that.setData({
          isFirst: false,
        })
        console.log("wang不是第一次")
      },
      fail: function () {
        // 在本地用户文件目录下创建一个文件 hello.txt，写入内容 "hello, world"
        const fs = wx.getFileSystemManager()
        fs.writeFileSync(`${wx.env.USER_DATA_PATH}/wang.txt`, 'first', 'utf8')
        that.setData({
          isFirst: true,
        })
        console.log("wang是第一次")
        setTimeout(() => {
          let animation = wx.createAnimation({
            duration: 1000
          })
          animation.opacity(0).step();
          that.setData({
            vanish: animation.export()
          })
          setTimeout(() => {
            that.setData({
              isFirst: false,
            })
          }, 1000)
        }, 2000)
      }
    })
  },

  /**
  * 请求轮播图
  */
  toBanner(that) {
    extractNetwork.getHomeBanner().then(function (res) {
      //成功操作  
      res.data.data.forEach(function (item, index) {
        res.data.data[index]["isOpenFilp"] = false
      })
      that.setData({
        bannerData: res.data.data
      })
      console.log(res)
    }, function (error) {
      console.log(error)
    }).catch(function () {
      console.error("get location failed")
    })
  },

  /**
   * 请求首页列表
   */
  toHomeList(that) {
    let header = {
      cookie: wx.getStorageSync('sessionid')
    }
    extractNetwork.getHomeList(that.data.pageNum,header).then(function (res) {
      console.log(res)
      if (that.data.isFirstRequest){
        that.setData({
          homeData: res.data.data.datas
        })
        that.toCanvasImage()
      }else{
        that.data.homeData = that.data.homeData.concat(res.data.data.datas)
        that.setData({
          homeData: that.data.homeData
        })
      }
      //that.scrollImage = that.selectComponent("#scrollImage");
      //that.scrollImage.showCanvasImage();
      // for (let i in that.data.homeData) {
      //   wx.createIntersectionObserver().relativeToViewport(that.data.isIphoneX ? {bottom: -164 * winWidth / 750}:{bottom: -98 * winWidth / 750}).observe('.item-' + i, (ret) => {
      //     if (ret.intersectionRatio > 0) {
      //       if(i == 5){
      //         console.log("wangwangwang")
      //       }
      //     }
      //   })
      // }
    }, function (error) {
      console.log(error)
    }).catch(function () {
      console.error("get location failed")
    })
  },

  /**
   * 妹子图
   */
  // toShowGirl(that) {
  //   network.getRequest('https://gank.io/api/v2/data/category/Girl/type/Girl/page/1/count/1', {}, {}).then(function (res) {
  //     //成功操作  
  //     console.log(res)
  //   }, function (error) {
  //     console.log(error)
  //   }).catch(function () {
  //     console.error("get location failed")
  //   })
  // },

  //横向滚动
  swiperChange:function(e) {
    let that = this
    that.setData({
      swiperIndex: e.detail.current
    })
  },

  // 卡牌切换
  switchFlip:function(e) {
    const that = this;
    const index = e.currentTarget.dataset.index;
    const bannerData = that.data.bannerData;
    if (!that.data.bannerData[index].isOpenFilp){
      bannerData.forEach(function (item, index) {
        if (item.isOpenFilp) {
          bannerData[index].isOpenFilp = false
        }
      }) 
    }
    const isOpenFilp = that.data.bannerData[index].isOpenFilp ? false : true;
    bannerData[index].isOpenFilp = isOpenFilp;
    that.setData({
      bannerData
    });
  },

  /**
   * 竖向滚动
   */
  bindScroll: function(e){
    if (e.detail.scrollTop > this.data.toShowAll + this.data.middleHeight - this.data.imageHeight * winWidth / 750){ 
      isBottom = true
      if (e.detail.scrollTop > this.data.toleaveTop){
        if (isHeader){
          isHeader = false
          this.setData({
            isOpacity: 1,
            isShow: true,
          })
          ctx.clearRect(0, 0, winWidth, 300 * winWidth / 750)
          ctx.drawImage(img,
            0, 0,
            img.width, img.width * 300 / 750,
            0, 0,
            winWidth, 300 * winWidth / 750)
        }
      }else{
        isBottom = true
        isHeader = true
        // console.log(Math.round(img.height * (1 - (e.detail.scrollTop - this.data.toShowTop) / this.data.middleHeight) - img.width * 300 / 750))
        if (img.height * (1 - (e.detail.scrollTop - this.data.toShowTop) / this.data.middleHeight) >= img.height - img.width * 300 / 750){
          // ctx.clearRect(0, 0, winWidth, 300 * winWidth / 750)
          // ctx.drawImage(img,
          //   0,
          //   img.height - img.width * 300 / 750,
          //   img.width, img.width * 300 / 750,
          //   0, 0,
          //   winWidth, 300 * winWidth / 750)
        }else{
          this.setData({
            isShow: false,
            isOpacity: 0
          })
          // ctx.drawImage(img,
          //   0,
          //   img.height * (1 - (e.detail.scrollTop - this.data.toShowTop) / this.data.middleHeight),
          //   img.width, img.width * 300 / 750,
          //   0, 0,
          //   winWidth, 300 * winWidth / 750)
        }
      }
    }else{
      isHeader = true
      if(isBottom){
        isBottom = false
        this.setData({
          isShow: true,
          isOpacity: 1
        })
        ctx.clearRect(0, 0, winWidth, 300 * winWidth / 750)
        ctx.drawImage(img,
          0,
          img.height - img.width * 300 / 750,
          img.width, img.width * 300 / 750,
          0, 0,
          winWidth, 300 * winWidth / 750)
      }
    }
  },

  /**上拉加载更多 */
  bindscrolltolower: function(e){
    let that = this
    that.setData({
      pageNum: that.data.pageNum+1,
      isFirstRequest: false
    })
    that.toHomeList(that)
  },

  /**
   * 下拉刷新
   */
  refresh: function(e){
    // let that = this
    // that.data.isFirstRequest = true
    // that.data.pageNum = 0
    // that.toBanner(that);
    // that.toHomeList(that);
  },

  /**
   * 收藏
   */
  onCollect: function(e) {
    let that = this
    let sessionid = wx.getStorageSync('sessionid')
    if (sessionid == null || sessionid == undefined || sessionid == '') {
      wx.navigateTo({
        url: '../moudleB/pages/login/login',
      })
    }else{
      let collect = e.currentTarget.dataset.collect
      let id = e.currentTarget.dataset.id
      let index = e.currentTarget.dataset.index
      let collectString = ''
      if (!collect){
        collectString = 'collect'
      }else{
        collectString = 'uncollect_originId'
      }
      let header = {
        cookie: wx.getStorageSync('sessionid')
      }
      extractNetwork.postCollectUrl(collectString, id, header).then(function (res) {
        console.log(res)
        if(res.data.errorCode == -1001){
          wx.showToast({
            title: res.data.errorMsg,
            icon: 'none',
            duration: 2000
          })
        }else{
          if (!collect) {
            that.data.homeData[index].collect = true
          } else {
            that.data.homeData[index].collect = false
          }
          that.setData({
            homeData: that.data.homeData
          })
        }
      }, function (error) {
        console.log(error)
      }).catch(function () {
        console.error("get location failed")
      })
    }
  },

  //详情页
  toDetails: function(e) {
    const url = e.currentTarget.dataset.link;
    console.log(url)
    wx.navigateTo({
      url: '../moudleA/pages/details/details?url=' + url + '&isNavigation=0',
    })
  },

  /**
   * 画图
   */
  toCanvasImage() {
    let that = this
    /**
     * 绘制图像到画布
    CanvasContext.drawImage(string imageResource, number sx, number sy,
    number sWidth, number sHeight,
    number dx, number dy,
    number dWidth, number dHeight)

    string imageResource 所要绘制的图片资源（网络图片要通过 getImageInfo / downloadFile 先下载）
    number sx 需要绘制到画布中的，imageResource的矩形（裁剪）选择框的左上角 x 坐标
    number sy 需要绘制到画布中的，imageResource的矩形（裁剪）选择框的左上角 y 坐标
    number sWidth 需要绘制到画布中的，imageResource的矩形（裁剪）选择框的宽度
    number sHeight 需要绘制到画布中的，imageResource的矩形（裁剪）选择框的高度
    number dx imageResource的左上角在目标 canvas 上 x 轴的位置
    number dy imageResource的左上角在目标 canvas 上 y 轴的位置
    number dWidth 在目标画布上绘制imageResource的宽度，允许对绘制的imageResource进行缩放
    number dHeight 在目标画布上绘制imageResource的高度，允许对绘制的imageResource进行缩放
    drawImage(imageResource, dx, dy)
    drawImage(imageResource, dx, dy, dWidth, dHeight)
    drawImage(imageResource, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) 从 1.9.0 起支持
    */

    // 使用 wx.createContext 获取绘图上下文 context 旧接口放弃
    // let context = wx.createCanvasContext('imageCanvasOld')
    // context.drawImage('../../images/splash.png', 0, this.data.heightNumber, winWidth, winWidth * 1920 / 1080)
    // context.draw()

    //2d
    const query = wx.createSelectorQuery()
    query.select('.imageCanvasA')
      .fields({ node: true, size: true })
      .exec((res) => {
        console.log(res)
        let canvas = res[0].node
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
          console.log(that.data.imageHeight * winWidth / 750 +"wangwangwang")
          console.log(that.data.middleHeight)
        }
      })
  },

  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  }

})
