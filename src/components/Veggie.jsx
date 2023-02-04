import React, { useEffect, useState } from "react"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css"
import { Link } from "react-router-dom"

function Veggie() {
  const [veggie, setVeggie] = useState([])

  const getVeggie = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${
        import.meta.env.VITE_API_KEY
      }&number=10&type=vegetarian`
    )
    if (!api.ok) {
      throw Error(`Problem at ${api.status}`)
    }
    const data = await api.json()
    setVeggie(data.recipes)
  }

  useEffect(() => {
    getVeggie().catch((err) => console.log(err))
  }, [])

  return (
    <div className="mt-5">
      <h3 className="mb-2 font-semibold text-2xl text-green-900">
        Vegetarian picks
      </h3>
      <Splide
        options={{
          perPage: 4,
          arrows: true,
          pagination: false,
          drag: "free",
          gap: "5rem",
          breakpoints: {
            768: {
              perPage: 2,
              snap: true,
              pagination: true,
              gap: "1rem",
            },
          },
        }}
      >
        {veggie.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <div className="h-64 mb-4 overflow-hidden rounded-lg group relative">
                <Link to={`/recipe/${recipe.id}`}>
                  <p className="transform -translate-x-1/2  absolute z-10 h-2/5 left-1/2 bottom-0 text-white w-full text-center font-semibold text-base flex justify-center items-center group-hover:drop-shadow-[0_0_2px_#000000]">
                    {recipe.title}
                  </p>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="rounded-lg absolute left-0 w-full h-full object-cover"
                  />
                  <div className="bg-black absolute w-full h-full z-3 group-hover:opacity-20 opacity-40" />
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
