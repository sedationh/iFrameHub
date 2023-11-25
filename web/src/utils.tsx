import { cloneDeep } from "lodash-es"
import { ContentSwitches } from "./components/ContentSwitches"
import { Tooltip } from "antd"

export const isJSON = (data: string) => {
  try {
    JSON.parse(data)
    return true
  } catch (error) {
    return false
  }
}

export const jumpBoard = (index, pageId) => {
  const boards = document.querySelectorAll(`#${pageId} .board`)
  let x = 0
  for (let i = 0; i < index; i++) {
    x += boards[i].clientWidth + 16
  }
  setTimeout(() => {
    const $page = document.getElementById(pageId)
    $page.scrollTo({
      left: x,
      behavior: "smooth",
    })
  }, 200)
}

export const buildTreeDataFromConfig = (configRow, searchValue, onSelect) => {
  const treeData = []
  const config = cloneDeep(configRow)

  for (let i = 0; i < config.length; i++) {
    const item = config[i]
    item.key = i + "_" + item.title

    if (!item.contents) {
      continue
    }

    const children = []
    for (let index = 0; index < item.contents.length; index++) {
      const srcItem = item.contents[index]
      const url = new URL(srcItem.src)
      const pathname = url.pathname.replace(/^(\s|\/)+|(\s|\/)+$/g, "") //去掉url.pathname首尾斜杠
      const host = url.host.split(".")
      const lastSecondElement = host[host.length - 2]
      const title =
        srcItem.title || pathname || lastSecondElement || srcItem.src

      if (
        searchValue &&
        !title.includes(searchValue) &&
        !srcItem.src.includes(searchValue)
      ) {
        continue
      }

      const key = item.key + "_" + index + "_" + srcItem.src
      children.push({
        key,
        title: (
          <span
            onClick={() => {
              onSelect(key)
            }}
            className="flex"
          >
            <Tooltip title={srcItem.src} color="#9F85FA" mouseLeaveDelay={0}>
              <span className="truncate inline-block w-40">{title}</span>
            </Tooltip>

            <ContentSwitches
              {...srcItem}
              selectKey={key}
              onSelect={onSelect}
              size="small"
            ></ContentSwitches>
          </span>
        ),
      })
    }

    item.children = children
    treeData[i] = item
  }
  return treeData
}
