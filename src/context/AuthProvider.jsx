import { createContext, useState } from "react"
import propTypes from 'prop-types'
 
const AuthContext = createContext()

const AuthProvider = ({children})=>{
    const [auth, setAuth] = useState()

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )

}

AuthProvider.propTypes = {
    children: propTypes.any
}

export {AuthProvider}

export default AuthContext