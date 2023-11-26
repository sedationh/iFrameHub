import { useEffect, useState } from "react"
import usePage from "../../hooks/usePage"
import Board from "../Board"
import classNames from "classnames"

const Page = ({ pageId, hidden }) => {
  const page = usePage()
  const [hasScrollBar, setHasScrollBar] = useState(false)

  const handleResize = (entries) => {
    for (const entry of entries) {
      if (entry.target.clientWidth < entry.target.scrollWidth) {
        setHasScrollBar(true)
        return
      }
      setHasScrollBar(false)
    }
  }
  useEffect(() => {
    const page = document.getElementById(pageId)

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(page)

    return () => {
      resizeObserver.disconnect()
    }
  }, [pageId])

  useEffect(() => {
    const page = document.getElementById(pageId)
    page.onwheel = (e) => {
      e.preventDefault()
      page.scrollLeft += e.deltaY
    }
    return () => {
      page.onwheel = null
    }
  }, [pageId])

  return (
    <div
      className={classNames([
        "flex gap-4 h-full overflow-x-auto ",
        hasScrollBar && "pb-2",
        !hidden && "hidden",
      ])}
      // 在CSS选择器中，以数字开头的选择器是无效的，所以设置以 page- 开头
      id={pageId}
    >
      {page?.contents?.map((item, index) => (
        <Board
          key={`${index}-${page.title}`}
          index={index}
          pageId={pageId}
          {...item}
        />
      ))}
    </div>
  )
}

export default Page
