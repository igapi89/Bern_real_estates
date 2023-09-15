import axios from 'axios'

const API_BASE_URL = 'https://blattcodeservices.com/pct/search'

// Get a list of real estates
export const getItems = () => {
  return axios.get(`${API_BASE_URL}`)
}
