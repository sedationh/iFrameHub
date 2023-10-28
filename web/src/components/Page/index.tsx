import { useEffect, useState } from "react"
import usePage from "../../hooks/usePage"
import Board from "../Board"
import classNames from "classnames"

const Page = () => {
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
    const page = document.getElementById("page")

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(page)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      className={classNames([
        "flex gap-4 h-full overflow-x-auto ",
        hasScrollBar && "pb-2",
      ])}
      id="page"
    >
      {page?.content?.map((item, index) => (
        <Board key={`${index}-${page.title}`} index={index} {...item} />
      ))}
    </div>
  )
}

export default Page
