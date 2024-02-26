import axios from 'axios'

const defaultAxios = axios.create({
  withCredentials: true,
})

const privateAxios = axios.create({
  withCredentials: true,
  headers:{"Content-Type":'application/json'}
})

export default defaultAxios

export {privateAxios}

