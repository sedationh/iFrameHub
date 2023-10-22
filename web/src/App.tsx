import { Outlet, useNavigate } from "react-router-dom"
import Nav from "./components/Nav"
import { useEffect } from "react";
import { config } from "./config"
import usePage from "./hooks/usePage";

function App() {
  const navigate = useNavigate();

  const page = usePage()

  useEffect(() => {
    if (page) {
      return
    }

    if(config[0].title) {
      navigate(`/p/${config[0].title}`)
    }
  }, [page]);

  return (
    <div className="h-screen flex p-2">
      <Nav />
      <Outlet />
    </div>
  )
}

export default App
