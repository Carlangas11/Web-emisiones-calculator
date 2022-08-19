import { useEffect, useState } from 'react'

export const useScreenSize = () => {
  const [screenWidth, setScreenWidth] = useState<number>(0)
  const [screenHeight, setScreenHeight] = useState<number>(0)

  const updateSize = () => {
    setScreenWidth(window?.innerWidth)
    setScreenHeight(window?.innerHeight)
  }

  useEffect(() => {
    window?.addEventListener('resize', updateSize)
    window?.addEventListener('load', updateSize)
    updateSize()

    return () => {
      window?.removeEventListener('resize', updateSize)
      window?.removeEventListener('load', updateSize)
    }
  }, [])

  return {
    screenWidth,
    screenHeight
  }
}
