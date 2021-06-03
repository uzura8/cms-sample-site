import client from './client'

export default {
  get: (configKey = '') => {
    return new Promise((resolve, reject) => {
      let options = {}
      client.get(`site_config/${configKey}`, options)
        .then((res) => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
}
