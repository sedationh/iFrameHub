import { Space, Switch } from "antd"
import { SwitchProps } from "antd/es/switch"

export const Switches = ({ switches }: { switches: SwitchProps[] }) => {
  return (
    <Space>
      {switches.map((item, index) => (
        <Switch key={index} {...item} />
      ))}
    </Space>
  )
}
