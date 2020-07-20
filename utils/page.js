/**
 * 使用方法：
 * 1、app.js 引入此文件：const page = require('xx/xx/page);
 * 2、app.js onLaunch 的时候 Page = page
 */
const originalPage = Page;
import proxy from './promisify';

function page(conf) {
  let hooks = ['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage'];
  conf.wx = proxy;
  Object.keys(conf).map(v => {
    if(typeof conf[v] === 'function' && hooks.indexOf(v) === -1) {
      let cusFunc = conf[v]
      conf[v] = function(e) {
        // 交互事件
        console.log('e', e);
        if (e && e.type) {
          let dataset = e.currentTarget.dataset, //组件data-xx参数集合
          pages = getCurrentPages(),
          currPage = pages[pages.length - 1],
          prevPage = pages[pages.length - 2];
          switch(e.type) {
            case 'tap':
              break;
          }
        }
      }
    }
  })
}