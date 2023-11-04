import { useRef, useState } from "react"
import { flushSync } from "react-dom"
import { iframeAllowDirective } from "../../permissions-policy"
import { Button, Space } from "antd"
import { jumpBoard } from "../../utils"
import { useGlobalConfig } from "../../context/globalConfig"

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
  const [isFull, setIsFull] = useState(props.isFull)
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

  const handleFullChange = () => {
    if (isFull) {
      setIsFull(false)
      updateConfigItem(props.src, { isFull: false })
      return
    }

    setIsFull(true)
    updateConfigItem(props.src, { isFull: true })
    jumpBoard(props.index, props.pageId)
  }

  const openNewWindow = () => {
    window.open(src)
  }

  return (
    <div
      style={{
        minWidth: isFull ? `calc(100vw - 56px)` : props.width ?? 700,
      }}
      className="flex flex-col bg-white board"
    >
      <div className="flex p-1 bg-accent">
        <Space>
          <Button size="small" type="link" onClick={refresh}>
            刷新
          </Button>
          <Button size="small" type="link" onClick={handleFullChange}>
            {isFull ? "恢复" : "全屏"}
          </Button>
          <Button size="small" type="link" onClick={openNewWindow}>
            新窗口打开
          </Button>
        </Space>
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
