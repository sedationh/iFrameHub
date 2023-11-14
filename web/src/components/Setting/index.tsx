import { Editor } from "@monaco-editor/react"
import { Button, Space, message, Popconfirm } from "antd"
import { defaultValue } from "../../config.ts"
import { useGlobalConfig } from "../../context/globalConfig"
import { isJSON } from "../../utils.tsx"
import { useGetState } from "ahooks"
import useDrawer from "../../hooks/useDrawer.ts"

function Setting() {
  const { config, setConfig } = useGlobalConfig()
  const [value, setValue, getValue] = useGetState(
    JSON.stringify(config, null, 2)
  )
  const [messageApi, contextHolder] = message.useMessage()

  const submit = () => {
    if (!isJSON(getValue())) {
      messageApi.open({
        type: "error",
        content: "请使用正确的 JSON 代码",
      })
    }
    setConfig(JSON.parse(getValue()))
    format()
    messageApi.open({
      type: "success",
      content: "修改成功",
    })
  }
  const reset = () => {
    setValue(JSON.stringify(defaultValue, null, 2))
  }
  const share = () => {
    console.log("share")
  }
  const format = () => {
    const v = JSON.parse(getValue())
    setValue(JSON.stringify(v, null, 2))
  }

  useDrawer("s", submit)

  return (
    <div className="w-full">
      {contextHolder}
      <Space className="mb-2">
        <Popconfirm
          placement="bottomRight"
          title="恢复模板"
          description="恢复默认模板将丢失此次更改，是否继续？"
          okText="恢复模板"
          cancelText="取消"
          onConfirm={reset}
        >
          <Button type="primary">恢复模板</Button>
        </Popconfirm>
        <Button type="primary" onClick={share}>
          分享配置
        </Button>
        <Button type="primary" onClick={submit}>
          确认
        </Button>
      </Space>
      <Editor
        height="800px"
        language="json"
        theme="vs-dark"
        value={value}
        onChange={setValue}
      />
    </div>
  )
}
export default Setting
