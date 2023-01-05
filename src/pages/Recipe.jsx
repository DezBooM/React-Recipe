import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const buttonStyle = "rounded-lg py-4 px-8 border border-solid border-gray-700 md:mr-8 mr-2 font-medium"
const inactive = "text-gray-700 bg-white"
const active = "text-white bg-gradient-to-b from-gray-500 to-gray-700"

function Recipe() {

    const [details, setDetails] = useState({})
    const [activeTab, setActiveTab] = useState("instructions")
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
    <div className="mt-5 block md:flex w-full">
        <div className="md:w-1/2 w-full flex flex-col justify-center h-1/2 items-center">
            <h2 className="md:mb-8 mb-2 font-semibold">{details.title}</h2>
            <img src={details.image} alt={details.title} />
        </div>
        <div className="md:ml-10 mx-2 md:w-1/2">
            <div className="flex mb-4 mt-2 md:mt-0 w-full justify-center">
                <button 
                    onClick={() => setActiveTab("instructions")} 
                    className={`${buttonStyle} ${activeTab === "instructions" ? active : inactive }`}>Instructions
                </button>
                <button 
                    onClick={() => setActiveTab("ingredients")} 
                    className={`${buttonStyle} ${activeTab === "ingredients" ? active : inactive }`}>Ingredients
                </button>
            </div>
            {activeTab === "instructions" && 
                <div className="tracking-tighter leading-snug">
                    <h3 className="text-center font-semibold text-2xl mb-4">Description</h3>
                    <p dangerouslySetInnerHTML={{__html: details.summary}} className="mb-4"></p>
                    <h3 className="text-center font-semibold text-2xl mb-4">Instructions</h3>
                    <p dangerouslySetInnerHTML={{__html: details.instructions}}></p>
                 </div>
            }
            <div>
                {activeTab === "ingredients" && 
                    details.extendedIngredients.map(ingredient => <li key={ingredient.id}>{ingredient.original}</li>)
                }
            </div>
            
        </div>
    </div>
  )
}

export default Recipe