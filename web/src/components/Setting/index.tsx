import { Editor } from "@monaco-editor/react"
import { Button, Space, message } from "antd"
import { defaultValue } from "../../config.ts"
import { useEffect, useState } from "react"
import { useGlobalConfig } from "../../context/globalConfig"
import { isJSON } from "../../utils.ts"

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
    const v = JSON.parse(value)
    setValue(JSON.stringify(v, null, 2))
  }
  useEffect(() => {
    document.addEventListener("keydown", PopupKeyUp, false)
    return () => {
      document.removeEventListener("keydown", PopupKeyUp, false)
    }
  })
  const PopupKeyUp = (e) => {
    if ((e.ctrlKey && e.key === "s") || (e.metaKey && e.key === "s")) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="w-full">
      {contextHolder}
      <Space className="mb-2 float-right">
        <Button type="primary" className="bg-blue-500" onClick={reset}>
          恢复模板
        </Button>
        <Button type="primary" className="bg-blue-500" onClick={share}>
          分享配置
        </Button>
        <Button type="primary" className="bg-blue-500" onClick={submit}>
          确认
        </Button>
      </Space>
      <Editor
        height="800px"
        language="json"
        theme="vs-dark"
        value={value}
        onChange={setValue}
        options={{ formatOnPaste: true, formatOnType: true }}
      />
    </div>
  )
}
export default Settting
