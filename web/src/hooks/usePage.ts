import { useParams } from "react-router-dom"
import { config } from "../config"

const usePage = () => {
  const params = useParams()

  const page = config.find((item) => item.title === params.page)

  return page
}

export default usePage
