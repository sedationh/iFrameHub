import { Space, Switch } from "antd"
import { SwitchProps, SwitchSize } from "antd/es/switch"
import { useGlobalConfig } from "../../context/globalConfig"
import { Content } from "../../config"
import { jumpBoard } from "../../utils"

type ContentSwitchesProps = Partial<Content> & {
  size: SwitchSize
  index: number
  pageId: string
}

export const ContentSwitches = (props: ContentSwitchesProps) => {
  const { updateConfigItem } = useGlobalConfig()
  const switches: SwitchProps[] = [
    {
      checkedChildren: "全屏",
      unCheckedChildren: "小屏",
      size: props.size,
      checked: props.isFull,
      onClick: (checked) => {
        updateConfigItem(props.src, { isFull: checked })
        jumpBoard(props.index, props.pageId)
      },
    },
    {
      checkedChildren: "显示",
      unCheckedChildren: "隐藏",
      checked: props.visible,
      size: props.size,
      onClick: (checked, e) => {
        e.stopPropagation()
        updateConfigItem(props.src, { visible: checked })
      },
    },
  ]
  return (
    <Space>
      {switches.map((item, index) => (
        <Switch key={index} {...item} />
      ))}
    </Space>
  )
}
