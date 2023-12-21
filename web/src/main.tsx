import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Setting from "./components/Setting/index.tsx"
import { GlobalConfigProvider } from "./context/globalConfig.tsx"
import { Home } from "./components/Home/index.tsx"
import { IframesCacheProvider } from "./context/iframesCache.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "p/:page",
        element: <Home />,
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
      <IframesCacheProvider>
        <RouterProvider router={router} />
      </IframesCacheProvider>
    </GlobalConfigProvider>
  </React.StrictMode>
)
