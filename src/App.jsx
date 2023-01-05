import Category from "./components/Category"
import Pages from "./pages/Pages"
import Search from "./components/Search"
import { GiForkKnifeSpoon } from "react-icons/gi"
import { Link } from "react-router-dom"


function App() {
return (
    <div>
      <nav>
        <Link to="/" className="flex">
          <GiForkKnifeSpoon className="text-3xl mt-1 fill-green-800" />
          <p className="text-4xl font-passion text-green-800 ml-1 active:underline">React Recipe</p>
        </Link>
      </nav>
      <Search />
      <Category />
      <Pages />
    </div>
    
      
  )
}

export default App
