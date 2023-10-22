import { Outlet } from "react-router-dom"
import Nav from "./components/Nav"

function App() {
  return (
    <div className="h-screen flex p-2">
      <Nav />
      <Outlet />
    </div>
  )
}

export default App
