const host = 'https://www.wanandroid.com/';
const gank = 'https://gank.io/api/v2/';

const config = {

  //轮播图地址
  bannerUrl: host + 'banner/json',

  //首页文章
  homeListUrl: host + 'article/list/',

  //知识体系
  systemUrl: host + 'tree/json',

  //知识体系小标题文章列表
  systemUrlList: host + 'article/list/',

  //搜索结果
  answerUrl: host + 'article/query/',

  //关键字
  hotKeyList: host + 'hotkey/json',

  //导航列表
  navigationList: host + 'navi/json',

  //项目列表
  projectList: host + 'article/listproject/',

  //登录
  loginUrl: host + 'user/login',

  //注册
  registerUrl: host + 'user/register',

  //收藏or取消收藏
  collectUrl: host + 'lg/',

  //退出登录
  logoutUrl: host + 'user/logout/json',

  //收藏列表
  collectList: host + '/lg/collect/list/',

  //妹子图
  grilsList: gank + 'data/category/Girl/type/Girl/page/'

}

module.exports = config