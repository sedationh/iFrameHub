import { Editor } from "@monaco-editor/react"
import { Button, Space } from "antd"
import { useState } from "react"
import { config, defaultValue } from "../../config.ts"
function Settting() {
  const [value, setValue] = useState(JSON.stringify(config))
  const submit = () => {
    localStorage.setItem("config", value)
  }
  const reset = () => {
    setValue(JSON.stringify(defaultValue))
  }

  return (
    <div className="w-full">
      <Editor
        height="800px"
        language="typescript"
        theme="vs-dark"
        value={value}
        onChange={setValue}
      />
      <Space>
        <Button type="primary" className="bg-blue-500 mt-5" onClick={reset}>
          恢复模板
        </Button>
        <Button type="primary" className="bg-blue-500 mt-5" onClick={submit}>
          确认
        </Button>
      </Space>
    </div>
  )
}
export default Settting
