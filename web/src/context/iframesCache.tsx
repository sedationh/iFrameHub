import { createContext, useContext } from "react"
import { useGlobalConfig } from "./globalConfig"
import { LRUCache } from "lru-cache"

export const IframesCache = createContext(null)

export const IframesCacheProvider = ({ children }) => {
  const { config } = useGlobalConfig()
  const iframesCache = new LRUCache({
    max: 5,
  })

  for (let i = 0; i < config.length; i++) {
    const page = config[i]
    for (let j = 0; j < page.contents.length; j++) {
      const iframe = page.contents[j]
      const key = `page-${i}-${page.title}-${j}-${iframe.src}`
      if (iframe.visible) {
        iframesCache.set(key, true)
      }
    }
  }

  return (
    <IframesCache.Provider value={{ iframesCache }}>
      {children}
    </IframesCache.Provider>
  )
}

export const useIframesCache = () => {
  return useContext(IframesCache)
}
