import client from './client'

export default {
  upload: (files, token = null, params = {}) => {
    return new Promise((resolve, reject) => {
      const files_copied = files instanceof Array ? [...files] : [files]
      let formData = new FormData()
      files_copied.map((file, idx) => {
        formData.append('files[' + idx + ']', file)
      })

      if (Object.keys(params).length > 0) {
        for (const [key, val] of Object.entries(params)) {
          formData.append(key, val)
        }
      }

      let options = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      if (token) options.headers.Authorization = token
      client.post('/media/images', formData, options)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },

  delete: (uid, token = null) => {
    return new Promise((resolve, reject) => {
      let options = {}
      if (token) options.headers = { Authorization: token }
      client.delete(`media/images/${uid}`, options)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },

  get: (uid = null, params = {}, token = null) => {
    return new Promise((resolve, reject) => {
      let options = {}
      let params_cloned = { ...params }
      options.params = params_cloned
      if (token) options.headers = { Authorization: token }
      const uri = uid ? `media/images/${uid}` : 'media/images';
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
