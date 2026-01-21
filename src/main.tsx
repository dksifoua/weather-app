import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@/index.css"
import { App } from "@/App.tsx"
import { UnitsContextProvider } from "@/contexts/UnitsContext"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <UnitsContextProvider>
            <App/>
        </UnitsContextProvider>
    </StrictMode>,
)
