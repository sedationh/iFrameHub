import usePage from "../../hooks/usePage"
import Board from "../Board"

const Page = () => {
  const page = usePage()
  return (
    <div className="flex gap-4 h-full overflow-x-scroll" id="page">
      {page?.content?.map((item, index) => (
        <Board key={`${index}-${page.title}`} index={index} {...item} />
      ))}
    </div>
  )
}

export default Page
