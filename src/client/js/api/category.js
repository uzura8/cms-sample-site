import client from './client'

export default {
  get: (serviceId, identifer = '', params = {}, token = null) => {
    return new Promise((resolve, reject) => {
      let options = {}
      let params_cloned = { ...params }
      options.params = params_cloned
      if (token) options.headers = { Authorization: token }
      const uri = identifer ? `categories/${serviceId}/${identifer}` : `categories/${serviceId}`
      client.get(uri, options)
        .then((res) => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
}
