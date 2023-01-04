import React, { useEffect, useState } from "react"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css";

function Veggie() {

  const [veggie, setVeggie] = useState([])
  
  const getVeggie = async ()  => {

      const check = localStorage.getItem("veggie")

      if(check) {
        setVeggie(JSON.parse(check))
      } else {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY}&number=10&type=vegetarian`)
        if (!api.ok) {
          throw new Error(`Reached limit :(`)
        }
        const data = await api.json()
        localStorage.setItem("veggie", JSON.stringify(data.recipes))
        setVeggie(data.recipes)
      }
  }

  useEffect(() => {
      getVeggie().catch(err => console.log(err))
  }, [])

  const VeggieEl = veggie.map(recipe => {
    return (
      <SplideSlide key={recipe.id}>
        <div className="h-64 overflow-hidden rounded-lg relative">
          <p className="transform -translate-x-1/2  absolute z-10 h-2/5 left-1/2 bottom-0 text-white w-full text-center font-semibold text-base flex justify-center items-center">{recipe.title}</p>
          <img src={recipe.image} alt={recipe.title} className="rounded-lg absolute left-0 w-full h-full object-cover" />
          <div className="bg-black absolute w-full h-full z-3 opacity-30" />
        </div>
      </SplideSlide>
    )
  })

  return (
     <div className="my-16 mx-0">
      <h3 className="mb-2 font-bold">Vegetarian picks</h3>
      <Splide options={{
        perPage: 4,
        arrows: false,
        pagination: false,
        drag: "free",
        gap: "5rem"
      }}>
        {VeggieEl}
      </Splide>
    </div>
  )
}

export default Veggie