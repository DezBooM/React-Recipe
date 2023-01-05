import {FaHamburger, FaPizzaSlice} from "react-icons/fa"
import {GiChopsticks, GiNoodles} from "react-icons/gi"
import { NavLink } from "react-router-dom"

const styleBg = "rounded-full flex flex-col justify-center items-center w-24 h-24 cursor-pointer bg-gradient-to-b from-gray-500 to-gray-700 no-underline transfrom scale-[0.8] current:bg-gradient-to-b current:from-green-700 current:to-green-900"
const styleH4 = "text-white text-sm"
const StyleIcon = "fill-white text-3xl"

function Category() {
  return (
    <div className="flex justify-center">
      <NavLink to={"/cuisine/italian"} className={styleBg}>
        <FaPizzaSlice className={StyleIcon} />
        <h4 className={styleH4}>Italian</h4>
      </NavLink>
      <NavLink to={"/cuisine/american"} className={styleBg}>
        <FaHamburger className={StyleIcon} />
       <h4 className={styleH4}>American</h4>
      </NavLink>
      <NavLink to={"/cuisine/thai"} className={styleBg}>
        <GiNoodles className={StyleIcon} />
        <h4 className={styleH4}>Thai</h4>
      </NavLink>
      <NavLink to={"/cuisine/japanese"} className={styleBg}>
        <GiChopsticks className={StyleIcon} />
        <h4 className={styleH4}>Japanese</h4>
      </NavLink>
    </div>
  )
}

export default Category