import { useRef, useState } from "react"
import { flushSync } from "react-dom"
import { iframeAllowDirective } from "../../permissions-policy"

const Board = (props: { src: string; width?: number; index: number }) => {
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
  const cover = () => {
    if (!isFull) {
      setIsFull(true)
      const boards = document.querySelectorAll(".board")
      let x = 0
      for (let i = 0; i < props.index; i++) {
        x += boards[i].clientWidth + 16
      }
      setTimeout(() => {
        // ID
        document.getElementsByClassName("boardbox")[0].scrollTo({
          left: x,
          behavior: "smooth",
        })
      }, 200)
    } else {
      setIsFull(false)
    }
  }

  return (
    <div
      style={{
        minWidth: isFull ? "100vw" : props.width ?? 700,
      }}
      className="flex flex-col board"
    >
      <div className="flex p-1 bg-secondary">
        <button onClick={refresh} className="btn btn-xs btn-primary">
          刷新
        </button>
        <button onClick={cover} className="btn btn-xs btn-primary">
          {isFull ? "缩小" : "全屏"}
        </button>
      </div>
      <iframe ref={iframeRef} className="flex-1 w-full" allow={iframeAllowDirective} src={src} />
    </div>
  )
}

export default Board
