import * as types from './mutation-types'
import arr from '@/util/arr'

export default {
  [types.SET_COMMON_LOADING] (state, isLoading) {
    state.common.isLoading = isLoading
  },

  //[types.AUTH_SET_USER] (state, payload) {
  //  state.auth.user = payload
  //},

  //[types.AUTH_UPDATE_USER_INFO] (state, payload) {
  //  const acceptKeys = ['uid', 'name', 'email', 'emailVerified', 'isAdmin', 'isAnonymous']
  //  if (!arr.inArray(payload.key, acceptKeys)) new Error('Invalid  argument')
  //  state.auth.user[payload.key] = payload.value
  //},

  //[types.AUTH_SET_TOKEN] (state, payload) {
  //  state.auth.token = payload
  //},

  //[types.AUTH_UPDATE_STATE] (state, payload) {
  //  state.auth.state = payload
  //},

  [types.SET_COMMON_HEADER_MENU_OPEN] (state, isOpen) {
    state.common.isHeaderMenuOpen = isOpen
  },
}

