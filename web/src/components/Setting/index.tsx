import { Editor } from "@monaco-editor/react"
import { Button, Space, message } from "antd"
import { defaultValue } from "../../config.ts"
import { useEffect } from "react"
import { useGlobalConfig } from "../../context/globalConfig"
import { isJSON } from "../../utils.tsx"
import { useGetState } from "ahooks"

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
  useEffect(() => {
    document.addEventListener("keydown", handleSaveKeyboardAction, false)
    return () => {
      document.removeEventListener("keydown", handleSaveKeyboardAction, false)
    }
  }, [])

  const handleSaveKeyboardAction = (e) => {
    if ((e.ctrlKey && e.key === "s") || (e.metaKey && e.key === "s")) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="w-full">
      {contextHolder}
      <Space className="mb-2">
        <Button type="primary" onClick={reset}>
          恢复模板
        </Button>
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
