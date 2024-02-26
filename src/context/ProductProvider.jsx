import { createContext, useState } from "react"
import propTypes from 'prop-types'
 
const ProductContext = createContext()

const ProductProvider = ({children})=>{
    const [dataFetch, setDataFetch] = useState([])

    return (
        <ProductContext.Provider value={{dataFetch, setDataFetch}}>
            {children}
        </ProductContext.Provider>
    )

}

ProductProvider.propTypes = {
    children: propTypes.any
}

export {ProductProvider}

export default ProductContext