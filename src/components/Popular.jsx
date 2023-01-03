import React, { useEffect } from 'react'

function Popular() {

    const getPopular = async ()  => {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY}&number=10`)
        if (!api.ok) {
          throw new Error(`HTTP error! status: ${api.status}`)
        }
        const data = await api.json()
        console.log(data)
    }

    useEffect(() => {
        getPopular().catch(err => console.log(err))
    }, [])

  return (
    <div>Popular</div>
  )
}

export default Popular