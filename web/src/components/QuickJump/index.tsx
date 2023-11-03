import { Input, Tree } from "antd"
import { useGlobalConfig } from "../../context/globalConfig"
import { useNavigate } from "react-router-dom"
import { buildTreeDataFromConfig, jumpBoard } from "../../utils"
import { useState } from "react"

export const QuickJump = ({ setOpen }) => {
  const { config } = useGlobalConfig()
  const [searchValue, setSearchValue] = useState("")

  const treeData = buildTreeDataFromConfig(config, searchValue.trim())

  const navigate = useNavigate()

  const onSelect = (selectedKeys) => {
    const parentIndex = selectedKeys[0].split("_")[0]
    const selectParent = selectedKeys[0].split("_")[1]

    const index = treeData[parentIndex].children.findIndex(
      (item) => item.key === selectedKeys[0]
    )

    navigate(`/p/${selectParent}`)
    setTimeout(() => {
      jumpBoard(index === -1 ? 0 : index, `page-${parentIndex}-${selectParent}`)
    }, 300)

    setOpen(false)
  }

  return (
    <div>
      <Input
        style={{ marginBottom: 8 }}
        placeholder="Search"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Tree treeData={treeData} onSelect={onSelect} defaultExpandAll={true} />
    </div>
  )
}
