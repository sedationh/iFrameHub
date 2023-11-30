import { useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"
import { iframeAllowDirective } from "../../permissions-policy"
import { Button, Space } from "antd"
import { ContentSwitches } from "../ContentSwitches"
import { useIframesCache } from "../../context/iframesCache"

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

  const { iframesCache } = useIframesCache()
  const currentKey = `${props.pageId}-${props.index}-${props.src}`
  const [hiddenMethod, setHiddenMethod] = useState("flex")

  useEffect(() => {
    if (props.visible === true) {
      setHiddenMethod("flex")
      return
    }

    if (iframesCache.get(currentKey)) {
      setHiddenMethod("opacity-0 absolute right-96 top-96")
      return
    }
    setHiddenMethod("hidden")
  }, [iframesCache, props.visible, currentKey])

  return (
    <div
      style={{
        minWidth: props.isFull ? `calc(100vw - 64px)` : props.width ?? 700,
        transition: "all 0.25s ease-out",
      }}
      className={"flex flex-col bg-white board " + hiddenMethod}
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
        <ContentSwitches
          {...props}
          size="default"
          currentKey={currentKey}
        ></ContentSwitches>
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
