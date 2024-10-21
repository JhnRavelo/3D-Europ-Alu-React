import { useContext } from 'react'
import ParticipantContext from '../context/ParticipantContext'

const useParticipant = () => {
  return useContext(ParticipantContext)
}

export default useParticipant
