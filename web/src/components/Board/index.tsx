import { useRef, useState } from "react"
import { flushSync } from "react-dom"
import { iframeAllowDirective } from "../../permissions-policy"
import { Button, Space } from "antd"
import { ContentSwitches } from "../ContentSwitches"

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

  return (
    <div
      style={{
        minWidth: props.isFull ? `calc(100vw - 64px)` : props.width ?? 700,
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
        <ContentSwitches {...props} size="default"></ContentSwitches>
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
