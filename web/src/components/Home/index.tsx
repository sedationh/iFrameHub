import { useGlobalConfig } from "../../context/globalConfig"
import usePage from "../../hooks/usePage"
import Page from "../Page"

export const Home = () => {
  const { config } = useGlobalConfig()
  const page = usePage()

  return (
    <>
      {config.map((item, index) => (
        <div
          className={item === page ? "inline-block overflow-x-auto" : "hidden"}
        >
          <Page id={`a${index}-${page.title}`}></Page>
        </div>
      ))}
    </>
  )
}
