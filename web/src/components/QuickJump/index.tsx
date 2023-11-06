import { Input, Tree } from "antd"
import { useGlobalConfig } from "../../context/globalConfig"
import { useNavigate } from "react-router-dom"
import { buildTreeDataFromConfig, jumpBoard } from "../../utils"
import { useState } from "react"

export const QuickJump = ({ setOpen }) => {
  const { config } = useGlobalConfig()
  const [searchValue, setSearchValue] = useState("")

  const navigate = useNavigate()

  const onSelect = (selectedKey) => {
    const parentIndex = selectedKey.split("_")[0]
    const selectParent = selectedKey.split("_")[1]

    const index = treeData[parentIndex].children.findIndex(
      (item) => item.key === selectedKey
    )

    navigate(`/p/${selectParent}`)

    setTimeout(() => {
      jumpBoard(index === -1 ? 0 : index, `page-${parentIndex}-${selectParent}`)
    }, 300)

    setOpen(false)
  }

  const treeData = buildTreeDataFromConfig(config, searchValue.trim(), onSelect)

  return (
    <div>
      <Input
        style={{ marginBottom: 8 }}
        placeholder="Search"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Tree treeData={treeData} defaultExpandAll={true} />
    </div>
  )
}
