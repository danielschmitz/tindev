import axios from 'axios'

export default axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})
