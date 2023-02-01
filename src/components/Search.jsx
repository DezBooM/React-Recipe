import { useState } from "react"
import { BiSearchAlt } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

function Search() {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/searched/${search}`)
  }

  return (
    <form className="flex justify-center my-2 w-full" onSubmit={handleSubmit}>
      <BiSearchAlt
        onClick={handleSubmit}
        className="relative cursor-pointer top-3 left-6 z-10 fill-white text-lg"
      />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        required
        placeholder="Search for recipe..."
        className="mr-4 md:mr-0 border-none rounded-lg placeholder:text-gray-300 outline-none relative bg-gradient-to-b from-gray-500 to-gray-700 px-7 py-2 w-full md:w-1/2 text-white focus:bg-gradient-to-b focus:from-green-700 focus:to-green-900"
      />
    </form>
  )
}

export default Search
