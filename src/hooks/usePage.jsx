import { useContext } from "react"
import PageContext from "../context/PageProvider"

const usePage = () => {
    return useContext(PageContext)
}

export default usePage