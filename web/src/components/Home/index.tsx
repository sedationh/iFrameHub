import { useGlobalConfig } from "../../context/globalConfig"
import usePage from "../../hooks/usePage"
import Page from "../Page"

export const Home = () => {
  const { config } = useGlobalConfig()
  const page = usePage()

  return (
    <div className="flex overflow-x-auto">
      {config.map((item, index) => (
        <Page
          key={`page-${index}-${item.title}`}
          pageId={`page-${index}-${item.title}`}
          hidden={item === page}
        />
      ))}
    </div>
  )
}
