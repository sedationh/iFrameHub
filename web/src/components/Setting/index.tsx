import { Editor } from "@monaco-editor/react"
import { Button, Space, message } from "antd"
import { defaultValue } from "../../config.ts"
import { useState } from "react"
import { useGlobalConfig } from "../../context/globalConfig"
import { isJSON } from "../../utils.tsx"

function Settting() {
  const { config, setConfig } = useGlobalConfig()
  const [value, setValue] = useState(JSON.stringify(config, null, 2))
  const [messageApi, contextHolder] = message.useMessage()

  const submit = () => {
    if (!isJSON(value)) {
      messageApi.open({
        type: "error",
        content: "请使用正确的 JSON 代码",
      })
    }
    setConfig(JSON.parse(value))
    messageApi.open({
      type: "success",
      content: "修改成功",
    })
  }
  const reset = () => {
    setValue(JSON.stringify(defaultValue, null, 2))
  }
  const format = () => {
    const v = JSON.parse(value)
    setValue(JSON.stringify(v, null, 2))
  }

  return (
    <div className="w-full">
      {contextHolder}
      <Editor
        height="800px"
        language="json"
        theme="vs-dark"
        value={value}
        onChange={setValue}
      />
      <Space>
        <Button type="primary" className="bg-blue-500 mt-5" onClick={reset}>
          恢复模板
        </Button>
        <Button type="primary" className="bg-blue-500 mt-5" onClick={format}>
          格式化代码
        </Button>
        <Button type="primary" className="bg-blue-500 mt-5" onClick={submit}>
          确认
        </Button>
      </Space>
    </div>
  )
}
export default Settting
