import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function Searched() {
  const [searched, setSearched] = useState([])

  const params = useParams()

  const getSearched = async (name) => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_API_KEY
      }&query=${name}`
    )
    if (!api.ok) {
      throw Error(`Problem at ${api.status}`)
    }
    const data = await api.json()
    setSearched(data.results)
  }

  useEffect(() => {
    getSearched(params.search).catch((err) => console.log(err))
  }, [params.search])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 mt-5 mx-1 lg:grid-cols-4 gap-12">
      {searched.map((recipe) => {
        return (
          <div key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="rounded-lg w-full"
              />
              <h4 className="text-center p-2 font-medium">{recipe.title}</h4>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default Searched
