import { Space, Switch } from "antd"
import { SwitchClickEventHandler, SwitchSize } from "antd/es/switch"

export type SwitchType = {
  checkedChildren: string
  unCheckedChildren: string
  defaultChecked: boolean
  size: SwitchSize
  onClick: SwitchClickEventHandler
  checked: boolean
}

export const Switches = ({ switches }: { switches: SwitchType[] }) => {
  return (
    <Space>
      {switches.map((item, index) => (
        <Switch
          key={index}
          checkedChildren={item.checkedChildren}
          unCheckedChildren={item.unCheckedChildren}
          checked={item.checked}
          size={item.size}
          onClick={item.onClick}
        />
      ))}
    </Space>
  )
}
