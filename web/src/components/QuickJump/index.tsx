import { useMemo, useState } from "react"
import { Input, Tree } from "antd"
import { useGlobalConfig } from "../../context/globalConfig"
import { useNavigate } from "react-router-dom"
import { jumpBoard } from "../../utils"

const { Search } = Input

export const QuickJump = ({ setOpen }) => {
  const [expandedKeys, setExpandedKeys] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys)
    setAutoExpandParent(false)
  }
  const { config } = useGlobalConfig()

  const treeData = useMemo(() => {
    return config.map((item, index) => {
      item.key = index + "_" + item.title
      if (item.content) {
        item.children = item.content.map((c) => {
          const url = new URL(c.src)
          const pathname = url.pathname.replace(/^(\s|\/)+|(\s|\/)+$/g, "") //去掉url.pathname首尾斜杠
          const host = url.host.split(".").at(-2)
          const title = pathname || host || c.src
          return {
            key: item.key + "_" + c.src,
            title:
              title.includes(searchValue) && searchValue.trim() ? (
                <span className="bg-blue-100">{title}</span>
              ) : (
                <span>{title}</span>
              ),
          }
        })
      }
      return item
    })
  }, [searchValue, config])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const newExpandedKeys = []

    treeData.forEach((item) => {
      const parentKey = item.key
      item.children.forEach((s) => {
        const childrenTitle = s.title.props.children
        if (childrenTitle.includes(value)) {
          newExpandedKeys.push(parentKey)
        }
        return s
      })
    })

    setExpandedKeys(newExpandedKeys)
    setSearchValue(value)
    setAutoExpandParent(true)
  }

  const navigate = useNavigate()

  const onSelect = (selectedKeys) => {
    const parentIndex = selectedKeys[0].split("_")[0]
    const selectParent = selectedKeys[0].split("_")[1]

    const index = treeData[parentIndex].children.findIndex(
      (item) => item.key === selectedKeys[0]
    )

    navigate(`/p/${selectParent}`)

    setTimeout(() => {
      jumpBoard(index === -1 ? 0 : index)
    }, 300)

    setOpen(false)
  }

  return (
    <div>
      <Search
        style={{ marginBottom: 8 }}
        placeholder="Search"
        onChange={onChange}
      />
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
        onSelect={onSelect}
      />
    </div>
  )
}
