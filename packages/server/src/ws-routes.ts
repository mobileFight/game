import { wsRouter, LocationPaths, PVEPaths, requestMiddleware } from "./ws"
import { handlePVE, handleLocation } from "./features"

export function registerRoutes() {
  wsRouter
    .addRoute(LocationPaths.getLocation, requestMiddleware, handleLocation)
    .addRoute(PVEPaths.goToPVE, requestMiddleware, handlePVE)
}
