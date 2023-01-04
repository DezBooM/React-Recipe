import React from "react"
import { Route, Routes } from "react-router-dom"
import Cuisine from "./Cuisine"
import Home from "./Home"

function Pages() {
  return (
    <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route path="/cuisine/:type" element={ <Cuisine />} />
    </Routes>
  )
}

export default Pages