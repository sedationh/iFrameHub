import { Outlet, useNavigate, useMatches } from "react-router-dom"
import Nav from "./components/Nav"
import { useEffect } from "react"
import usePage from "./hooks/usePage"
import { useGlobalConfig } from "./context/globalConfig"

function App() {
  const { config } = useGlobalConfig()
  const navigate = useNavigate()
  const page = usePage()

  const matchs = useMatches()

  useEffect(() => {
    if (matchs.length !== 1) {
      return
    }

    if (config[0].title) {
      navigate(`/p/${config[0].title}`)
    }
  }, [page])

  return (
    <div className="h-screen flex p-2">
      <Nav />
      <Outlet />
    </div>
  )
}

export default App
