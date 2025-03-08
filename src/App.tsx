import "@fontsource/inter/index.css"
import SideBar from './components/sidebar'
import { cn } from "./utils"

function App() {
  return (
    <div className={cn("h-screen flex items-stretch antialiased overflow-hidden")}>
      <SideBar />
      <div className="flex-grow"></div>
    </div>
  )
}

export default App
