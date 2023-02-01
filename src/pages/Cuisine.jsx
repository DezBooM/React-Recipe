import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function Cuisine() {
  const [cuisine, setCuisine] = useState([])
  const params = useParams()

  const getCuisine = async (name) => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_API_KEY
      }&number=24&cuisine=${name}`
    )
    if (!api.ok) {
      throw Error(`Problem at ${api.statuss}`)
    }
    const data = await api.json()
    setCuisine(data.results)
  }

  useEffect(() => {
    getCuisine(params.type).catch((err) => console.log(err))
  }, [params.type])

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 mt-5 mx-1 lg:grid-cols-4 gap-12"
    >
      {cuisine.map((recipe) => {
        return (
          <div key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="rounded-lg w-full"
              />
              <h4 className="text-center p-2 font-semibold">{recipe.title}</h4>
            </Link>
          </div>
        )
      })}
    </motion.div>
  )
}

export default Cuisine
