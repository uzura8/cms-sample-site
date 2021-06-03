import utilArr from '@/util/arr'
import utilCommon from '@/util/common'

export default {
  //checkUserType: state => (type) => {
  //  if (!state.auth.state) return false
  //  if (state.auth.user == null) return false
  //  return state.auth.user.type == type
  //},

  isAdmin: state => () => {
    if (!state.auth.state) return false
    if (state.auth.user == null) return false
    return state.auth.user.isAdmin
  },

  //userInfo: state => (key) => {
  //  const acceptKey = [
  //    'uid', 'name', 'email', 'photoURL'
  //  ]
  //  if (!state.auth.state) return
  //  if (state.auth.user == null) return
  //  if (!utilArr.inArray(key, acceptKey)) return
  //  if (utilCommon.isEmpty(state.auth.user[key])) return
  //  return state.auth.user[key]
  //},

  //isEmailVerified: state => () => {
  //  if (!state.auth.state) return false
  //  if (state.auth.user == null) return false
  //  return state.auth.user.emailVerified === true
  //},
}
