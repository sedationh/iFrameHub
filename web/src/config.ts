export const defaultValue = [
  {
    title: "页面1",
    content: [
      {
        src: "https://poe.com/ChatGPT",
      },
      {
        src: "https://github.com/",
      },
      {
        src: "https://crdt-collaborative-edit.sedationh.top/",
      },
      {
        src: "https://reading-helper.vercel.app/",
      },
      {
        src: "https://developer.mozilla.org/en-US/",
      },
      {
        src: "https://meego.feishu.cn/enterprise_application/userGantt/fryhmDmIR",
      },
    ],
  },
  {
    title: "Page2",
    content: [
      {
        src: "https://meego.feishu.cn/enterprise_application/userGantt/fryhmDmIR",
      },
    ],
  },
]

export const config = JSON.parse(localStorage.getItem('config')) || defaultValue