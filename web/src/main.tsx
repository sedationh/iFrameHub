import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Page from "./components/Page/index.tsx"
import Setting from "./components/Setting/index.tsx"
import { GlobalConfigProvider } from "./context/globalConfig.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "p/:page",
        element: <Page />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalConfigProvider>
      <RouterProvider router={router} />
    </GlobalConfigProvider>
  </React.StrictMode>
)
