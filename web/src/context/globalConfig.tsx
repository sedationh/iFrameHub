import { useLocalStorageState } from "ahooks"
import { createContext, useContext } from "react"
import { defaultValue } from "../config"

export const GlobalConfig = createContext(null)

export const GlobalConfigProvider = ({ children }) => {
  const [config, setConfig] = useLocalStorageState("config", {
    defaultValue: defaultValue,
  })

  if (!config) {
    setConfig(defaultValue)
  }

  return (
    <GlobalConfig.Provider value={{ config, setConfig }}>
      {children}
    </GlobalConfig.Provider>
  )
}

export const useGlobalConfig = () => {
  return useContext(GlobalConfig)
}
