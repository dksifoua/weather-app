import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@/index.css"
import { App } from "@/App.tsx"
import { UnitSystemContextProvider } from "@/context/UnitSystemContext"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <UnitSystemContextProvider>
            <App/>
        </UnitSystemContextProvider>
    </StrictMode>,
)
