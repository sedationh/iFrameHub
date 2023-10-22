import { useRef, useState } from "react"
import { flushSync } from "react-dom"
import { iframeAllowDirective } from "../../permissions-policy"
import { Button, Space } from "antd"

export type BoardType = {
  src: string
  width?: number
  index: number
}

const Board = (props: BoardType) => {
  const iframeRef = useRef(null)

  const [src, setSrc] = useState(props.src)
  const [isFull, setIsFull] = useState(false)

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

      return
    }
    setIsFull(true)
    const boards = document.querySelectorAll(".board")
    let x = 0
    for (let i = 0; i < props.index; i++) {
      x += boards[i].clientWidth + 16
    }
    setTimeout(() => {
      const $page = document.querySelector("#page")
      $page.scrollTo({
        left: x,
        behavior: "smooth",
      })
    }, 200)
  }

  return (
    <div
      style={{
        minWidth: isFull ? "100vw" : props.width ?? 700,
      }}
      className="flex flex-col bg-white board"
    >
      <div className="flex p-1 bg-accent">
        <Space>
          <Button size="small" type="link" onClick={refresh}>
            刷新
          </Button>
          <Button size="small" type="link" onClick={handleFullChange}>
            {isFull ? "缩小" : "全屏"}
          </Button>
        </Space>
      </div>
      <iframe
        ref={iframeRef}
        className="flex-1 w-full"
        allow={iframeAllowDirective}
        src={src}
      />
    </div>
  )
}

export default Board
