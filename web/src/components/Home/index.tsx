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
        ></Page> //在CSS选择器中，以数字开头的选择器是无效的，所以设置以 page- 开头
      ))}
    </div>
  )
}
