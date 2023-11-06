export interface Content {
  src: string
  title: string
  visible: boolean
  isFull: boolean
}

interface Page {
  title: string
  contents: Content[]
}

export type Config = Page[]

export const defaultValue: Config = [
  {
    title: "页面1",
    contents: [
      {
        src: "https://reading-helper.vercel.app/",
        title: "vercel",
        visible: true,
        isFull: false,
      },
      {
        src: "https://devtool.tech/",
        title: "devtool",
        visible: true,
        isFull: false,
      },
      {
        src: "https://www.bilibili.com/",
        title: "bilibili",
        visible: true,
        isFull: false,
      },
    ],
  },
  {
    title: "页面2",
    contents: [
      {
        src: "https://www.typescriptlang.org/",
        title: "typescriptlang",
        visible: true,
        isFull: false,
      },
    ],
  },
]
