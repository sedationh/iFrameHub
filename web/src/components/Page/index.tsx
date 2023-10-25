import usePage from "../../hooks/usePage"
import Board from "../Board"

const Page = () => {
  const page = usePage()
  return (
    // TODO: why
    <div className="flex gap-4 h-full overflow-x-scroll" id="page">
      {page?.content?.map((item, index) => (
        <Board key={index} index={index} {...item} />
      ))}
    </div>
  )
}

export default Page
