import axios from 'axios'
import site from '@/util/site'

export default axios.create({
  baseURL: site.uri('api/'),
  headers: {
    'ContentType': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  responseType: 'json',
})

