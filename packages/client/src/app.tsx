import React, { useEffect } from "react"
import { Router } from "react-router"
import { useStore } from "effector-react"
import { useRouterHistories } from "@lib/histories"
import { $assetsLoaded, loadAssetsFx } from "@lib/pixi"
import { routes } from "./pages"
import { Splash } from "./ui/organisms"

export function App() {
  const { memory } = useRouterHistories()
  const assetsLoaded = useStore($assetsLoaded)

  useEffect(() => {
    if (!assetsLoaded) {
      loadAssetsFx()
    }
  }, [assetsLoaded])

  if (!assetsLoaded) {
    return <Splash />
  }

  return <Router history={memory}>{routes}</Router>
}
