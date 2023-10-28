import { useEffect } from "react"
import usePage from "../../hooks/usePage"
import Board from "../Board"

const Page = () => {
  const page = usePage()

  useEffect(() => {
    const page = document.getElementById("page")
    resizeObserver.observe(page)
  })

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.target.clientWidth < entry.target.scrollWidth) {
        entry.target.classList.add("pb-2")
        return
      }
      entry.target.classList.remove("pb-2")
    }
  })

  return (
    <div className="flex gap-4 h-full overflow-x-auto pb-2" id="page">
      {page?.content?.map((item, index) => (
        <Board key={`${index}-${page.title}`} index={index} {...item} />
      ))}
    </div>
  )
}

export default Page
