import { Editor } from "@monaco-editor/react"
import { Button, Space, message, Popconfirm, Popover } from "antd"
import { defaultValue } from "../../config.ts"
import { useGlobalConfig } from "../../context/globalConfig"
import { isJSON } from "../../utils.tsx"
import { useGetState, useLocalStorageState } from "ahooks"
import useKeyDown from "../../hooks/useKeyDown.ts"
import { produce } from "immer"
import dayjs from "dayjs"

function Setting() {
  const { config, setConfig } = useGlobalConfig()
  const [value, setValue, getValue] = useGetState(
    JSON.stringify(config, null, 2)
  )
  const [messageApi, contextHolder] = message.useMessage()
  const [configHistory, setConfigHistory] = useLocalStorageState(
    "configHistory",
    {
      defaultValue: [],
    }
  )

  const updateConfigHistory = (updater) => {
    setConfigHistory((prevConfig) =>
      produce(prevConfig, (draft) => {
        updater(draft)
      })
    )
  }

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

    //存入历史记录中
    if (getValue() === configHistory[0]?.value) {
      return
    }
    updateConfigHistory((draft) => {
      if (configHistory.length >= 10) {
        draft.pop()
        return draft
      }
      draft.unshift({
        time: dayjs(),
        value: getValue(),
      })
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
  const deleteHistory = (item) => {
    updateConfigHistory((draft) => {
      const index = draft.findIndex((config) => config.time === item.time)
      draft.splice(index, 1)
    })
  }

  const content =
    configHistory.length === 0 ? (
      <div>暂无历史记录</div>
    ) : (
      <div>
        {configHistory.map((item, index) => {
          const editor = (
            <Editor
              width="500px"
              height="800px"
              language="json"
              theme="vs-dark"
              value={item.value}
              options={{ readOnly: true }}
            />
          )
          return (
            <Popover placement="right" content={editor}>
              <div className="px-2 py-1 rounded-md w-96 hover:bg-green-200 flex items-center justify-between">
                <div className=" w-4/5 truncate text-ellipsis mr-3">
                  <span className="mr-3">{index}.</span>
                  {dayjs(item.time).format("YYYY-MM-DD HH:mm")}
                </div>
                <Space>
                  <Button type="primary" onClick={() => deleteHistory(item)}>
                    删除
                  </Button>
                  <Button type="primary" onClick={() => setValue(item.value)}>
                    恢复
                  </Button>
                </Space>
              </div>
            </Popover>
          )
        })}
      </div>
    )

  useKeyDown("s", submit)

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
        <Popover placement="right" content={content}>
          <Button type="primary">历史记录</Button>
        </Popover>
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
