import config from '@/config/config'
import str from './str'
import common from './common'

const strageUri = (path='', isAbsolue = true) => {
  let items = [path]
  if (isAbsolue) {
    items.unshift(config.media.url)
  }
  return items.join('/')
}

const mediaUri = (type, name, size='raw', isAbsolue = true) => {
  const path = [type, size, name].join('/')
  return strageUri(path, isAbsolue)
}

export default {
  uri: (path) => {
    const validPath = str.ltrimChar(path, '/')
    const domain = config.domain
    const port = config.port ? ':' + config.port: ''
    const basePath = config.baseUrl
    if (!domain && !port) return basePath + validPath

    const schem = config.isSSL ? 'https://' : 'http://'
    let items = [schem, domain, port, basePath, validPath]
    return items.join('')
  },

  absUri: (path) => {
    const validPath = str.ltrimChar(path, '/')
    const domain = config.domain ? config.domain : window.location.host
    if (common.isEmpty(domain)) return

    const port = config.port ? ':' + config.port: ''
    const basePath = config.baseUrl
    const schem = config.isSSL ? 'https://' : 'http://'
    let items = [schem, domain, port, basePath, validPath]
    return items.join('')
  },

  baseUri: (type = 'url') => {
    const domain = config.domain
    const port = config.port ? ':' + config.port: ''
    const basePath = config.baseUrl
    if (!domain && !port) return basePath

    const schem = config.isSSL ? 'https://' : 'http://'
    let items = [domain, port]

    if (type == 'host') return items.join('')
    items.unshift(schem)
    if (type == 'origin') return items.join('')
    items.push(basePath)
    return items.join('')
  },

  strageUri: strageUri,
  mediaUri: mediaUri,

  imageUri: (name, size='raw', isAbsolue = true) => {
    return mediaUri('image', name, size, isAbsolue)
  },

  checkResponseHasErrorMessage: (err, isFieldsErrors = false) => {
    if (err == null) return false
    if (err.response == null) return false
    if (err.response.data == null) return false
    if (isFieldsErrors) {
      return err.response.data.errors != null
    }
    return err.response.data.message != null
  },

  //convFirebaseErrorCodeToI18n: (code, method = '') => {
  //  let i18nKey = ''
  //  switch (code) {
  //    //case 'auth/cancelled-popup-request':
  //    //case 'auth/popup-closed-by-user':
  //    //   return null;
  //    case 'auth/email-already-in-use':
  //      if (method.indexOf('signup') !== -1) {
  //        i18nKey = 'msg["Email is alredy in use"]'
  //      } else {
  //        i18nKey = 'msg["Email or passwords do not match our records"]'
  //      }
  //      break
  //    case 'auth/invalid-email':
  //      i18nKey = 'msg["Email is not valid"]'
  //      break
  //    case 'auth/user-disabled':
  //      i18nKey = 'msg["Service is unavailable"]'
  //      break
  //    case 'auth/user-not-found':
  //      i18nKey = 'msg["Email or passwords do not match our records"]'
  //      break
  //    case 'auth/user-mismatch':
  //      if (method === 'signin/popup') {
  //        return '認証されているユーザーと異なるアカウントが選択されました';
  //      } else {
  //        i18nKey = 'msg["Email or passwords do not match our records"]'
  //      }
  //      break
  //    case 'auth/weak-password':
  //      i18nKey = 'msg["Password must be at least 6 characters"]'
  //      break
  //    case 'auth/wrong-password':
  //      i18nKey = 'msg["Email or passwords do not match our records"]'
  //      break
  //    case 'auth/credential-already-in-use':
  //      i18nKey = 'msg["Credential already in use"]'
  //      break
  //    //case 'auth/popup-blocked':
  //    //  return '認証ポップアップがブロックされました。ポップアップブロックをご利用の場合は設定を解除してください';
  //    //case 'auth/operation-not-supported-in-this-environment':
  //    //case 'auth/auth-domain-config-required':
  //    //case 'auth/operation-not-allowed':
  //    //case 'auth/unauthorized-domain':
  //    //  return '現在この認証方法はご利用頂けません';
  //    //case 'auth/requires-recent-login':
  //    //  return '認証の有効期限が切れています';
  //    default:
  //      if (method.indexOf('signin') !== -1) {
  //        i18nKey = 'msg["Sign In failed"]'
  //      } else {
  //        i18nKey = 'msg["Error occurred"]'
  //      }
  //  }
  //  return i18nKey
  //},
}
