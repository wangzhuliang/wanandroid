let configurl = require('../utils/config.js');
let network = require('../utils/network.js');

export default {

  //首页轮播图
  getHomeBanner() {
    const result = network.getRequest(configurl.bannerUrl, {}, {})
    return result
  },

  //首页文章
  getHomeList(page,header) {
    const result = network.getRequest(configurl.homeListUrl + page + "/json", header, {})
    return result
  },

  //知识体系
  getSystemUrl() {
    const result = network.getRequest(configurl.systemUrl, {}, {})
    return result
  },

  //知识体系分类小标题文章
  getSystemUrlList(page,id) {
    const result = network.getRequest(configurl.systemUrlList + page + "/json?cid=" + id, {}, {})
    return result
  },

  //搜索结果
  postAnswerUrlList(page, params) {
    const result = network.postRequest(configurl.answerUrl + page + "/json", {}, params)
    return result
  },

  //关键字
  getHotKeyList() {
    const result = network.getRequest(configurl.hotKeyList, {}, {})
    return result
  },

  //导航列表
  getNavigationList() {
    const result = network.getRequest(configurl.navigationList, {}, {})
    return result
  },

  //项目列表
  getProjectList(page) {
    const result = network.getRequest(configurl.projectList + page + "/json", {}, {})
    return result
  },

  //登录
  postLoginUrl(header,params) {
    const result = network.postRequest(configurl.loginUrl, header, params)
    return result
  },

  //注册
  postRegisterUrl(params) {
    const result = network.postRequest(configurl.registerUrl, {}, params)
    return result
  },

  //收藏or取消收藏
  postCollectUrl(collect, id, header){
    const result = network.postRequest(configurl.collectUrl + collect + '/' + id + "/json", header, {})
    return result
  },

  //退出登录
  getLogoutUrl(){
    const result = network.getRequest(configurl.logoutUrl, {}, {})
    return result
  },

  //我的收藏
  getCollectList(page,header){
    const result = network.getRequest(configurl.collectList + page + "/json", header, {})
    return result
  },

  // --------------------------------------------------------------------------------------------------------
  
  //gank妹子图
  getGankGirlsList(page) {
    const result = network.getRequest(configurl.grilsList + page + "/count/10", {}, {})
    return result
  }

}