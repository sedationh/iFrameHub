import { useParams } from "react-router-dom"
import { useGlobalConfig } from "../context/globalConfig"

const usePage = () => {
  const params = useParams()

  const {config} = useGlobalConfig()

  const page = config.find((item) => item.title === params.page)

  return page
}

export default usePage
