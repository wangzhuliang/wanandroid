// components/navBar/navBar.js
Component({
  /**
   * 组件的属性列表
   */
  options: {

  },
  properties: {
    extClass: {
      type: String,
      value: ''
    },
    //value: '#1296db',
    background: {
      type: String,
      value: '#EBA356',
      observer: '_showChange'
    },
    backgroundColorTop: {
      type: String,
      value: 'rgba(255, 255, 255, 1)',
      observer: '_showChangeBackgroundColorTop'
    },
    color: {
      type: String,
      value: '#ffffff'
    },
    title: {
      type: String,
      value: ''
    },
    back: {
      type: Boolean,
      value: false
    },
    home: {
      type: Boolean,
      value: false
    },
    iconTheme: {
      type: String,
      value: 'white'
    },
    delta: {
      type: Number,
      value: 1
    }
  },

  created: function () {
    //this.getSystemInfo();
  },

  attached: function () {
    this.setStyle(); //设置样式
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  pageLifetimes: {
    show: function () { },
    hide: function () { }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setStyle: function (life) {
      const {
        statusBarHeight,
        navBarHeight,
        capsulePosition,
        navBarExtendHeight,
        ios,
        windowWidth
      } = getApp().globalData.systemInfo;

      const { back, home, title } = this.data;
      //胶囊按钮右侧到屏幕右侧的边距
      let rightDistance = windowWidth - capsulePosition.right;
      //胶囊按钮左侧到屏幕右侧的边距
      let leftWidth = windowWidth - capsulePosition.left;

      let navigationbarinnerStyle = [
        `color: ${this.data.color}`,
        `background: ${this.data.background}`,
        `height:${navBarHeight + navBarExtendHeight}px`,
        `padding-top:${statusBarHeight}px`,
        `padding-right:${leftWidth}px`,
        `padding-bottom:${navBarExtendHeight}px`
      ].join(';');
      let navBarLeft = [];
      let navBarLeftImage = [];
      if ((back && !home) || (!back && home)) {
        navBarLeft = [`width:${capsulePosition.width}px`, `height:${capsulePosition.height}px`].join(';');
        navBarLeftImage = [`width:${capsulePosition.height-4}px`, `height:${capsulePosition.height-4}px`, `padding:2px`].join(';');

      } else if ((back && home) || title) {
        navBarLeft = [
          `width:${capsulePosition.width}px`,
          `height:${capsulePosition.height}px`,
          `margin-left:${rightDistance}px`,
        ].join(';');
        navBarLeftImage = [
          `width:${capsulePosition.height-4}px`,
          `height:${capsulePosition.height-4}px`,
          `padding:2px`
        ].join(';');
      } else {
        navBarLeft = [`width:auto`, `margin-left:0px`].join(';');
        navBarLeftImage = [`width:auto`, `margin-left:0px`].join(';');
      }
      if (life === 'created') {
        this.data = {
          navigationbarinnerStyle,
          navBarLeft,
          navBarHeight,
          capsulePosition,
          navBarExtendHeight,
          ios,
          navBarLeftImage
        };
      } else {
        this.setData({
          navigationbarinnerStyle,
          navBarLeft,
          navBarHeight,
          capsulePosition,
          navBarExtendHeight,
          ios,
          navBarLeftImage
        });
      }
    },
    _showChange: function (value) {
      this.setStyle();
    },
    // 返回事件
    back: function () {
      this.triggerEvent('back', { delta: this.data.delta });
    },
    home: function () {
      this.triggerEvent('home', {});
    },
  }
})
