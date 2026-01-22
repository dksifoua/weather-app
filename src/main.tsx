import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@/index.css"
import { App } from "@/App.tsx"
import { UnitsContextProvider } from "@/providers/UnitsContextProvider"
import { WeatherContextProvider } from "@/providers/WeatherContextProvider"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <UnitsContextProvider>
            <WeatherContextProvider>
                <App/>
            </WeatherContextProvider>
        </UnitsContextProvider>
    </StrictMode>,
)
