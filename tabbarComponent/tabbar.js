// tabbarComponent/tabbar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#1c1c1b",
        "list": [
          {
            "pagePath": "/pages/index/index",
            "iconPath": "icon/homepage.png",
            "selectedIconPath": "icon/homepage_fill.png",
            "text": "首页"
          },
          {
            "pagePath": "/pages/middle/middle",
            "iconPath": "icon/addition_fill.png",
            "isSpecial": true,
            "text": ""
          },
          {
            "pagePath": "/pages/mine/mine",
            "iconPath": "icon/people.png",
            "selectedIconPath": "icon/people_fill.png",
            "text": "我的"
          }
        ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.globalData.systemInfoBottom.model.search('iPhone X') != -1 ? true : false
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
