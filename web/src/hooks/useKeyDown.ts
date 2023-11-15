import { useEffect } from "react"

const useDrawer = (keyname: string, handler: () => void) => {
  useEffect(() => {
    const handleKeyDownAction = (e) => {
      if (
        (e.ctrlKey && e.key === keyname) ||
        (e.metaKey && e.key === keyname)
      ) {
        e.preventDefault()
        handler()
      }
    }

    document.addEventListener("keydown", handleKeyDownAction, false)

    return () => {
      document.removeEventListener("keydown", handleKeyDownAction, false)
    }
  }, [handler, keyname])
}

export default useDrawer
