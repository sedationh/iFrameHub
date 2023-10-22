import { useRef, useState } from "react"
import { flushSync } from "react-dom"
import { iframeAllowDirective } from "../../permissions-policy"
import { Button } from "antd"

export type BoardType = {
  src: string
  width?: number
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
  return (
    <div
      style={{
        minWidth: props.width ?? 700,
      }}
      className="flex flex-col bg-white"
    >
      <div className="flex p-1 bg-accent">
        <Button size="small" type="link" onClick={refresh}>
          刷新
        </Button>
      </div>
      <iframe ref={iframeRef} className="flex-1 w-full" allow={iframeAllowDirective} src={src} />
    </div>
  )
}

export default Board
