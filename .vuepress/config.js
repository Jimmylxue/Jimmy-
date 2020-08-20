module.exports = {
  title: 'jimmy的个人空间',
  description: 'jimmy_study',
  dest: 'public',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/small.png',
      },
    ],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
  ],
  theme: 'reco', // 主题
  themeConfig: {
    huawei: true,
    mode: 'dark', // 默认黑色主题
    noFoundPageByTencent: false, // 关闭404带来的页面
    // 博客配置
    nav: [
      {
        text: 'Home',
        link: '/',
        icon: 'reco-home',
      },
      {
        text: 'TimeLine',
        link: '/timeline/',
        icon: 'reco-date',
      },
      {
        text: 'About',
        icon: 'reco-message',
        items: [
          {
            text: 'about-author',
            link: '/docs/introduct/aboutme',
          },
        ],
      },
      {
        text: 'Contact',
        icon: 'reco-message',
        items: [
          {
            text: 'GitHub',
            link: 'https://gitee.com/jimmyxuexue',
            icon: 'reco-github',
          },
        ],
      },
    ],
    sidebar: {
      // '/docs/theme-reco/': ['', 'theme', 'plugin', 'api'],
      themeConfig: {
        sidebar: 'auto', //在所有页面中启用自动生成侧栏
      },
    },
    type: 'blog',
    blogConfig: {
      category: {
        location: 2,
        text: 'Category',
      },
      tag: {
        location: 3,
        text: 'Tag',
      },
    },
    // 下访导航栏
    friendLink: [
      {
        title: 'CSDN',
        desc: 'Jimmy 的其他技术博客',
        email: '1002661758@qq.com',
        link: 'https://me.csdn.net/weixin_46240162',
      },
      {
        title: 'GitHub',
        desc: 'Jimmy的github仓库',
        email: '1002661758@qq.com',
        avatar: '/github.jpg',
        link: 'https://github.com/Jimmylxue',
      },
      {
        title: 'GIT码云',
        desc: 'Jimmy的Git码云仓库',
        email: '1002661758@qq.com',
        avatar: 'git.jpg',
        link: 'https://gitee.com/jimmyxuexue',
      },
      {
        title: 'Jimmy的个人空间',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        avatar:
          'https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png',
        link: 'https://vuepress-theme-reco.recoluan.com',
      },
    ],
    logo: '/small.png',
    search: true, //展示搜索
    searchMaxSuggestions: 10,
    lastUpdated: 'Last Updated',
    author: 'jimmy', //  作者
    authorAvatar: '/small.png', //  作者头像
    record: 'xxxx',
    startYear: '2020',
    locales: {
      '/': {
        lang: 'zh-CN',
      },
      '/en/': {
        lang: 'en-US',
      },
    },
  },
  markdown: {
    lineNumbers: true,
  },
  locales: {
    '/': {
      lang: 'zh-CN',
    },
    '/en/': {
      lang: 'en-US',
    },
  },
  plugins: [
    [
      'cursor-effects',
      {
        size: 2, // size of the particle, default: 2
        shape: ['star' | 'circle'], // shape of the particle, default: 'star'
        zIndex: 999999999, // z-index property of the canvas, default: 999999999
      },
    ],
  ],
}
