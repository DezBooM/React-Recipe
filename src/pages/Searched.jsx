import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function Searched() {

    const [searched, setSearched] = useState([])

    const params = useParams()

    const getSearched = async name => {
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&query=${name}`)
        const data = await api.json()
        setSearched(data.results)
    }

    useEffect(() => {
        getSearched(params.search).catch(err => console.log(err))
    }, [params.search])

    const searchedEl = searched.map(recipe => {
        return (
            <div key={recipe.id} >
                <Link to={`/recipe/${recipe.id}`}>
                    <img src={recipe.image} alt={recipe.title} className="rounded-lg w-full" />
                    <h4 className="text-center p-2 font-medium">{recipe.title}</h4>
                </Link>
                
            </div>
        )
    })

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(15rem,_1fr))] gap-12">
        {searchedEl}
    </div>
  )
}

export default Searched