import { useLocalStorageState } from "ahooks"
import { createContext, useContext } from "react"
import { Config, defaultValue } from "../config"
import { produce } from "immer"
export const GlobalConfig = createContext(null)

export const GlobalConfigProvider = ({ children }) => {
  const [config, setConfig] = useLocalStorageState("config", {
    defaultValue: defaultValue,
  })

  if (!config) {
    setConfig(defaultValue)
  }

  const updateConfig = (updater: (draft: Config) => void) => {
    setConfig((prevConfig: Config) =>
      produce(prevConfig, (draft: Config) => {
        updater(draft)
      })
    )
  }
  const updateConfigItem = (src: string, newContent) => {
    updateConfig((draft) => {
      for (const page of draft) {
        let target = page.contents.find((content) => content.src === src)
        if (target) {
          target = Object.assign(target, newContent)
          break
        }
      }
      return draft
    })
  }

  return (
    <GlobalConfig.Provider value={{ config, setConfig, updateConfigItem }}>
      {children}
    </GlobalConfig.Provider>
  )
}

export const useGlobalConfig = () => {
  return useContext(GlobalConfig)
}
