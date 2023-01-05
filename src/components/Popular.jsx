import React, { useEffect, useState } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';

function Popular() {

  const [popular, setPopular] = useState([])
  
  const getPopular = async ()  => {

      const check = localStorage.getItem("popular")

      if(check) {
        setPopular(JSON.parse(check))
      } else {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY}&number=10`)
        const data = await api.json()
        localStorage.setItem("popular", JSON.stringify(data.recipes))
        setPopular(data.recipes)
      }
  }

  useEffect(() => {
      getPopular().catch(err => console.log(err))
  }, [])

  const popularEl = popular.map(recipe => {
    return (
      <SplideSlide key={recipe.id}>
        <div className="h-64 overflow-hidden rounded-lg relative">
          <Link to={`/recipe/${recipe.id}`}>
            <p className="transform -translate-x-1/2  absolute z-10 h-2/5 left-1/2 bottom-0 text-white w-full text-center font-semibold text-base flex justify-center items-center">{recipe.title}</p>
            <img src={recipe.image} alt={recipe.title} className="rounded-lg absolute left-0 w-full h-full object-cover" />
            <div className='bg-black absolute w-full h-full z-3 opacity-30' />
          </Link>
        </div>
      </SplideSlide>
    )
  })

  return (
     <div>
      <h3 className='my-2 font-semibold text-3xl text-green-900'>Popular picks</h3>
      <Splide options={{
        perPage: 3,
        arrows: false,
        pagination: false,
        drag: "free",
        gap: "5rem"
      }}>
        {popularEl}
      </Splide>
    </div>
  )
}

export default Popular