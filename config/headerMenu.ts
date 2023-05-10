export default [
  {
    path: '/',
    name: "首页"
  },
  {
    path: "/article/1/30",
    name: "文章"
  },
  {
    path: "/tool",
    name: "工具"
  },
  {
    path: "learn",
    name: "学习"
  },
  {
    path: "/admin",
    access: "canAdmin",
    name: "管理",
    children: [
      {
        name: '用户管理',
        path: '/admin/user/1/30',
      },
      {
        name: '文章管理',
        path: '/admin/article/1/30',
      },
    ]
  }
]
