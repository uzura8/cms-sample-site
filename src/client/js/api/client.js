import axios from 'axios'
import site from '@/util/site'

export default axios.create({
  baseURL: site.uri('api/'),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  //withCredentials: true,
  responseType: 'json',
})
