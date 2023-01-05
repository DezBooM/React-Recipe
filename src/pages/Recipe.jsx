import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const buttonStyle = "rounded-lg py-4 px-8 border border-solid border-gray-700 mr-8 font-medium"
const inactive = "text-gray-700 bg-white"
const active = "text-white bg-gradient-to-b from-gray-500 to-gray-700"

function Recipe() {

    const [details, setDetails] = useState({})
    const [activeTab, setActiveTab] = useState("Instructions")
    const params = useParams()

    const getRecipe = async () => {
        const api = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${import.meta.env.VITE_API_KEY}`)
        const data = await api.json()
        setDetails(data)
    }

    useEffect(() => {
        getRecipe()
    }, [params.name])

  return (
    <div className="mt-5 flex w-full">
        <div className="w-1/2 flex flex-col justify-center h-1/2 items-center">
            <h2 className="mb-8 font-semibold">{details.title}</h2>
            <img src={details.image} alt={details.title} />
        </div>
        <div className="ml-10 w-1/2">
            <div className="flex mb-4">
                <button 
                    onClick={() => setActiveTab("Instructions")} 
                    className={`${buttonStyle} ${activeTab === "Instructions" ? active : inactive }`}>Instructions
                </button>
                <button 
                    onClick={() => setActiveTab("Ingredients")} 
                    className={`${buttonStyle} ${activeTab === "Ingredients" ? active : inactive }`}>Ingredients
                </button>
            </div>
            {activeTab === "Instructions" && 
                <div className="tracking-tighter leading-snug">
                    <p dangerouslySetInnerHTML={{__html: details.summary}} className="mb-4"></p>
                    <p dangerouslySetInnerHTML={{__html: details.instructions}}></p>
                 </div>
            }
            <div>
                {activeTab === "Ingredients" && 
                    details.extendedIngredients.map(ingredient => <li key={ingredient.id}>{ingredient.original}</li>)
                }
            </div>
            
        </div>
    </div>
  )
}

export default Recipe