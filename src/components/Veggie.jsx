import React, { useEffect, useState } from "react"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

function Veggie() {

  const [veggie, setVeggie] = useState([])
  
  const getVeggie = async ()  => {

        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY}&number=10&type=vegetarian`)
        const data = await api.json()
        setVeggie(data.recipes)
  }

  useEffect(() => {
      getVeggie().catch(err => console.log(err))
  }, [])

  return (
     <div className="mt-5">
      <h3 className="mb-2 font-semibold text-2xl text-green-900">Vegetarian picks</h3>
      <Splide options={{
        perPage: 4,
        arrows: false,
        pagination: false,
        drag: "free",
        gap: "5rem"
      }}>
        {veggie.map(recipe => {
          return (
            <SplideSlide key={recipe.id}>
              <div className="h-64 overflow-hidden rounded-lg relative">
                <Link to={`/recipe/${recipe.id}`}>
                  <p className="transform -translate-x-1/2  absolute z-10 h-2/5 left-1/2 bottom-0 text-white w-full text-center font-semibold text-base flex justify-center items-center">{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} className="rounded-lg absolute left-0 w-full h-full object-cover" />
                  <div className="bg-black absolute w-full h-full z-3 opacity-30" />
                </Link>
              </div>
            </SplideSlide>
          )
        })}
      </Splide>
    </div>
  )
}

export default Veggie