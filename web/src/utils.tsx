import { cloneDeep } from "lodash-es"

export const isJSON = (data: string) => {
  try {
    JSON.parse(data)
    return true
  } catch (error) {
    return false
  }
}

export const jumpBoard = (index) => {
  const boards = document.querySelectorAll(".board")
  let x = 0
  for (let i = 0; i < index; i++) {
    x += boards[i].clientWidth + 16
  }
  setTimeout(() => {
    const $page = document.querySelector("#page")
    $page.scrollTo({
      left: x,
      behavior: "smooth",
    })
  }, 200)
}

export const builTreeDataFromConfig = (configRow, searchValue) => {
  const treeData = []
  const config = cloneDeep(configRow)

  for (let i = 0; i < config.length; i++) {
    const item = config[i]
    item.key = i + "_" + item.title

    if (!item.content) {
      continue
    }

    const children = []
    for (let index = 0; index < item.content.length; index++) {
      const srcItem = item.content[index]
      const url = new URL(srcItem.src)
      const pathname = url.pathname.replace(/^(\s|\/)+|(\s|\/)+$/g, "") //去掉url.pathname首尾斜杠
      const host = url.host.split(".")
      const lastSecondElement = host[host.length - 2]
      const title = pathname || lastSecondElement || srcItem.src

      if (searchValue && !title.includes(searchValue)) {
        continue
      }

      children.push({
        key: item.key + "_" + srcItem.src,
        title: title,
      })
    }

    item.children = children
    treeData[i] = item
  }
  return treeData
}
