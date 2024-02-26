
import { Route, Routes } from 'react-router-dom'
import Home from './Home/Home'

const Acceuil = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Home/>}/>
        </Routes>
    </>
  )
}

export default Acceuil