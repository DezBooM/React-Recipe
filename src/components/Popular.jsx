import React, { useEffect, useState } from "react"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css"
import { Link } from "react-router-dom"

function Popular() {
  const [popular, setPopular] = useState([])

  const getPopular = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${
        import.meta.env.VITE_API_KEY
      }&number=10`
    )
    if (!api.ok) {
      throw Error(`Problem at ${api.status}`)
    }
    const data = await api.json()
    setPopular(data.recipes)
  }

  useEffect(() => {
    getPopular().catch((err) => console.log(err))
  }, [])

  return (
    <div>
      <h3 className="my-2 font-semibold text-3xl text-green-900">
        Popular picks
      </h3>
      <Splide
        options={{
          perPage: 3,
          arrows: true,
          pagination: false,
          drag: "free",
          gap: "5rem",
          breakpoints: {
            768: {
              perPage: 1,
              snap: true,
              pagination: true,
              arrows: true,
            },
          },
        }}
      >
        {popular.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <div className="h-64 overflow-hidden rounded-lg group relative">
                <Link to={`/recipe/${recipe.id}`}>
                  <p className="-translate-x-1/2  absolute z-20 h-2/5 left-1/2 bottom-0 text-white w-full text-center font-semibold text-base flex justify-center items-center group-hover:drop-shadow-[0_0_2px_#000000]">
                    {recipe.title}
                  </p>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="rounded-lg absolute left-0 w-full h-full object-cover"
                  />
                  <div className="bg-black absolute w-full h-full z-10 group-hover:opacity-20 opacity-40" />
                </Link>
              </div>
            </SplideSlide>
          )
        })}
      </Splide>
    </div>
  )
}

export default Popular
