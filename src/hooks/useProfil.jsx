import { useContext } from 'react'
import ProfilContext from '../context/ProfilContext'

const useProfil = () => {
  return useContext(ProfilContext)
}

export default useProfil