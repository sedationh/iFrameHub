import usePage from "../../hooks/usePage"
import Board from "../Board"

const Page = () => {
  const page = usePage()

  return (
    <div className="flex gap-4 h-full">
      {page?.content?.map((item, index) => (
        <Board key={index} {...item} />
      ))}
    </div>
  )
}

export default Page
