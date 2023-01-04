import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function Cuisine() {

    const [cuisine, setCuisine] = useState([])

    const params = useParams()

    const getCuisine = async name => {
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&cuisine=${name}`)
        if (!api.ok) {
            throw new Error(`Reached limit :(`)
          }
        const data = await api.json()
        setCuisine(data.results)
    }

    useEffect(() => {
        getCuisine(params.type).catch(err => console.log(err))
    }, [params.type])

    const cuisineEl = cuisine.map(recipe => {
        return (
            <div key={recipe.id} >
                <img src={recipe.image} alt={recipe.title} className="rounded-lg w-full" />
                <h4 className="text-center p-2 font-medium">{recipe.title}</h4>
            </div>
        )
    })

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(20rem,_1fr))] gap-12">
        {cuisineEl}
    </div>
  )
}

export default Cuisine