import { useRef, useState } from "react"
import { flushSync } from "react-dom"
import { iframeAllowDirective } from "../../permissions-policy"
import { Button, Space } from "antd"
import { jumpBoard } from "../../utils"
import { useGlobalConfig } from "../../context/globalConfig"
import { SwitchType, Switches } from "../Switches"

export type BoardType = {
  src: string
  width?: number
  index: number
  pageId: string
  visible: boolean
  isFull: boolean
}

const Board = (props: BoardType) => {
  const iframeRef = useRef(null)
  const [src, setSrc] = useState(props.src)
  const { updateConfigItem } = useGlobalConfig()

  const refresh = () => {
    const srcObj = new URL(src)
    flushSync(() => {
      srcObj.searchParams.set("t", String(Date.now()))
      setSrc(srcObj.toString())
    })
    srcObj.searchParams.delete("t")
    setSrc(srcObj.toString())
  }

  const openNewWindow = () => {
    window.open(src)
  }

  const switches: SwitchType[] = [
    {
      checkedChildren: "全屏",
      unCheckedChildren: "小屏",
      defaultChecked: props.isFull,
      size: "default",
      checked: props.isFull,
      onClick: (checked, e) => {
        e.stopPropagation()
        updateConfigItem(props.src, { isFull: checked })
        console.log({ checked })
        if (checked) {
          jumpBoard(props.index, props.pageId)
        }
      },
    },
    {
      checkedChildren: "显示",
      unCheckedChildren: "隐藏",
      defaultChecked: props.visible,
      checked: props.visible,
      size: "default",
      onClick: (checked, e) => {
        e.stopPropagation()
        updateConfigItem(props.src, { visible: checked })
      },
    },
  ]

  return (
    <div
      style={{
        minWidth: props.isFull ? `calc(100vw - 56px)` : props.width ?? 700,
      }}
      className="flex flex-col bg-white board"
    >
      <div className="flex p-1 bg-accent justify-between">
        <Space>
          <Button size="small" type="link" onClick={refresh}>
            刷新
          </Button>
          <Button size="small" type="link" onClick={openNewWindow}>
            新窗口打开
          </Button>
        </Space>
        <Switches switches={switches}></Switches>
      </div>
      <iframe
        ref={iframeRef}
        className="flex-1 w-full border-none"
        allow={iframeAllowDirective}
        src={src}
      />
    </div>
  )
}

export default Board
