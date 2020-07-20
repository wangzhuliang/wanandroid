// pages/moudleB/pages/about/about.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgArr:[
      { src:'../../imgs/iv_navigation.png', srca:'../../imgs/splash.png',isturn:false, zIndex:4},
      { src:'../../imgs/iv_project.png', srca:'../../imgs/splash.png',isturn:false, zIndex:3},
      { src:'../../imgs/iv_system.png', srca:'../../imgs/splash.png',isturn:false, zIndex:1},
      { src:'../../imgs/iv_top_search.png', srca:'../../imgs/splash.png',isturn:false, zIndex:1},
      { src:'../../imgs/iv_widget.png', srca:'../../imgs/splash.png',isturn:false, zIndex:1},
    ],
    imgArr1:[
      { src:'../../imgs/a1.png', srca:'../../imgs/a2.png',isturn:false, zIndex:4},
      { src:'../../imgs/a3.png', srca:'../../imgs/a4.png',isturn:false, zIndex:3},
      { src:'../../imgs/a5.png', srca:'../../imgs/a6.png',isturn:false, zIndex:1}
    ],
    topDistance: app.globalData.systemInfo.navBarHeight + app.globalData.systemInfo.navBarExtendHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 点击图片切换类名来控制翻页效果
  change(e) {
    let that = this
    //if (this.data.flag) {
      //this.data.flag = true;
      let index = e.currentTarget.dataset.index;
      let imgs = that.data.imgArr;
      imgs.map((ele, i) => {
        if (index == i) {
          imgs[i].isturn = !imgs[i].isturn;
          imgs[i].zIndex = 4;
        } else {
          imgs[i].zIndex = 1;
        }
      })
      if (index - 1 >= 0) {
        imgs[index - 1].zIndex = 3;
      }
      if (index + 1 < imgs.length) {
        imgs[index + 1].zIndex = 3;
      }
      if (index - 2 >= 0) {
        imgs[index - 2].zIndex = 2;
      }
      if (index + 2 < imgs.length) {
        imgs[index + 2].zIndex = 2;
      }
      this.setData({
        imgArr: imgs
      })
    //}
  },

  changeA(e) {
    let that = this
    //if (this.data.flag) {
      //this.data.flag = true;
      let index = e.currentTarget.dataset.index;
      let imgs = that.data.imgArr1;
      imgs.map((ele, i) => {
        if (index == i) {
          imgs[i].isturn = !imgs[i].isturn;
          imgs[i].zIndex = 4;
        } else {
          imgs[i].zIndex = 1;
        }
      })
      if (index - 1 >= 0) {
        imgs[index - 1].zIndex = 3;
      }
      if (index + 1 < imgs.length) {
        imgs[index + 1].zIndex = 3;
      }
      if (index - 2 >= 0) {
        imgs[index - 2].zIndex = 2;
      }
      if (index + 2 < imgs.length) {
        imgs[index + 2].zIndex = 2;
      }
      this.setData({
        imgArr1: imgs
      })
    //}
  },

  saveImage(){
    let that = this
    wx.showActionSheet({
      itemList: ['保存到相册'],
      success(res) {
        //let url = e.currentTarget.dataset.url;
        wx.getSetting({
          success: (res) => {
            console.log(res);
            if (!res.authSetting['scope.writePhotosAlbum']) {   // 未授权
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success: () => {
                  that.saveImgSuccess();
                },
                fail: (res) => {
                  console.log(res);
                  wx.showModal({
                    title: '保存失败',
                    content: '请开启访问手机相册的权限',
                    success(res) {
                      wx.openSetting()
                    }
                  })
                }
              })
            } else {  // 已授权
              that.saveImgSuccess();
            }
          },
          fail: (res) => {
            console.log(res);
          }
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  // 同意授权保存到相册
  saveImgSuccess() {
    wx.getImageInfo({
      src: "../../imgs/come.png",  // 通过getImageInfo将src转换成改图片的本地路径，给saveImageToPhotosAlbum使用
      success: (res) => {
        console.log(res)
        let path = res.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,   // filePath路径不能是网络图片路径
          success: (res) => {
            console.log(res);
            wx.showToast({
              title: '已保存到相册',
            })
          },
          fail: (res) => {
            console.log(res);
          }
        })
      },
      fail: (res) => {
        console.log(res);
      }
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