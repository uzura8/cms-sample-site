import * as types from './mutation-types'
import { Admin } from '@/api'
//import firebase from 'firebase/app'
//import 'firebase/auth'
import util from '@/util/common'
import siteUtil from '@/util/site'

//const getUserAuthInfo = async (user, tokenRes, idToken) => {
//  const tokenClaims = tokenRes != null && tokenRes.claims != null ? tokenRes.claims : null
//
//  return {
//    uid: user.uid,
//    name: user.displayName,
//    emailVerified: user.emailVerified,
//    email: user.email,
//    photoURL: user.photoURL,
//    isAdmin: 'type' in tokenClaims && tokenClaims.type === 'admin',
//    type: 'type' in tokenClaims && tokenClaims.type ? tokenClaims.type : 'normal',
//    isAnonymous: user.isAnonymous,
//    joinedGroupUid: joinedGroupUid,
//  }
//}
//
//const updateStateToAuth = async (user, commit, isUnsetLoading = false) => {
//  const idToken = await user.getIdToken(true)
//  const tokenRes = await user.getIdTokenResult()
//  const storeUser = await getUserAuthInfo(user, tokenRes, idToken)
//  commit(types.AUTH_SET_USER, storeUser)
//  commit(types.AUTH_SET_TOKEN, idToken)
//  commit(types.AUTH_UPDATE_STATE, true)
//  if (isUnsetLoading) commit(types.SET_COMMON_LOADING, false)
//}
//
//const updateStateToUnauth = (commit) => {
//  commit(types.AUTH_SET_USER, null)
//  commit(types.AUTH_SET_TOKEN, null)
//  commit(types.AUTH_UPDATE_STATE, false)
//}

export default {
  setHeaderMenuOpen: ({ commit }, isOpen) => {
    commit(types.SET_COMMON_HEADER_MENU_OPEN, isOpen)
  },

  setLoading: ({ commit }, isLoading) => {
    commit(types.SET_COMMON_LOADING, isLoading)
  },

  //authenticateWithEmailAndPassword: async ({ commit }, payload) => {
  //  commit(types.SET_COMMON_LOADING, true)
  //  try {
  //    const res = await firebase.auth().signInWithEmailAndPassword(
  //      payload.email,
  //      payload.password
  //    )
  //    await updateStateToAuth(res.user, commit)
  //    commit(types.SET_COMMON_LOADING, false)
  //  } catch (error) {
  //    updateStateToUnauth(commit)
  //    commit(types.SET_COMMON_LOADING, false)
  //    throw error
  //  }
  //},

  //setUser: async ({ commit }, user = null) => {
  //  const currentUser = user && firebase.auth().currentUser
  //  if (user) {
  //    await updateStateToAuth(user, commit)
  //  } else {
  //    updateStateToUnauth(commit)
  //  }
  //},

  //authenticateWithOAuth: async ({ commit }, providerName) => {
  //  commit(types.SET_COMMON_LOADING, true)
  //  try {
  //    let provider
  //    switch (providerName) {
  //      case 'google.com':
  //        provider = new firebase.auth.GoogleAuthProvider()
  //        break
  //      //case 'twitter.com':
  //      //  provider = new firebase.auth.TwitterAuthProvider()
  //      //  break
  //      //case 'facebook.com':
  //      //  provider = new firebase.auth.FacebookAuthProvider()
  //      //  break
  //    }

  //    const res = await firebase.auth().signInWithPopup(provider)
  //    await updateStateToAuth(res.user, commit)
  //    commit(types.SET_COMMON_LOADING, false)
  //  } catch (error) {
  //    updateStateToUnauth(commit)
  //    commit(types.SET_COMMON_LOADING, false)
  //    throw error
  //  }
  //},

  //authenticateAnonymously: async ({ commit }) => {
  //  commit(types.SET_COMMON_LOADING, true)
  //  try {
  //    const res = await firebase.auth().signInAnonymously()
  //    await updateStateToAuth(res.user, commit)
  //    commit(types.SET_COMMON_LOADING, false)
  //  } catch (error) {
  //    updateStateToUnauth(commit)
  //    commit(types.SET_COMMON_LOADING, false)
  //    throw error
  //  }
  //},

  //checkAuthenticate: async ({ commit, state }, forceSetAuthStore = false) => {
  //  await firebase.auth().onAuthStateChanged(async (user) => {
  //    if (!user) {
  //      updateStateToUnauth(commit)
  //      return
  //    }

  //    if (forceSetAuthStore || (!state.auth.state || !state.auth.user)) {
  //      await updateStateToAuth(user, commit)
  //    }
  //  })
  //},

  //editUserByAdmin: async ({ commit, state }, payload) => {
  //  commit(types.SET_COMMON_LOADING, true)
  //  try {
  //    let userVals = {}
  //    if (!util.isEmpty(payload.email)) userVals.email = payload.email
  //    if (!util.isEmpty(payload.password)) userVals.password = payload.password
  //    if (!util.isEmpty(payload.name)) userVals.name = payload.name
  //    if (!util.isEmpty(payload.type)) userVals.type = payload.type

  //    if (payload.uid == null) {
  //      await Admin.createUser('firebase', userVals, state.auth.token)
  //    } else {
  //      await Admin.editUser(payload.uid, 'firebase', userVals, state.auth.token)
  //    }
  //    commit(types.SET_COMMON_LOADING, false)
  //  } catch (err) {
  //    commit(types.SET_COMMON_LOADING, false)
  //    throw err
  //  }
  //},

  //editUserProfile: async ({ commit }, payload) => {
  //  commit(types.SET_COMMON_LOADING, true)
  //  try {
  //    if (payload.vals.name != null) {
  //      const user = firebase.auth().currentUser;
  //      await user.updateProfile({
  //        displayName: payload.vals.name,
  //      })
  //    }
  //    Object.keys(payload.vals).map(key => {
  //      commit(types.AUTH_UPDATE_USER_INFO, { key:key, value:payload.vals[key] })
  //    })
  //    commit(types.SET_COMMON_LOADING, false)
  //  } catch (err) {
  //    commit(types.SET_COMMON_LOADING, false)
  //    throw err
  //  }
  //},

  //createUserWithEmailSend: async ({ commit }, vals) => {
  //  commit(types.SET_COMMON_LOADING, true)
  //  try {
  //    const res = await firebase.auth().createUserWithEmailAndPassword(
  //      vals.email,
  //      vals.password
  //    )
  //    await res.user.updateProfile({displayName: vals.name})
  //    await res.user.reload()
  //    await updateStateToAuth(res.user, commit)
  //    await res.user.sendEmailVerification()
  //    commit(types.SET_COMMON_LOADING, false)
  //  } catch (err) {
  //    updateStateToUnauth(commit)
  //    commit(types.SET_COMMON_LOADING, false)
  //    throw err
  //  }
  //},

  //linkUserWithCredentialOnEmailAuth: async ({ commit }, vals) => {
  //  commit(types.SET_COMMON_LOADING, true)
  //  try {
  //    const credential = await firebase.auth.EmailAuthProvider.credential(
  //      vals.email,
  //      vals.password
  //    )
  //    const res = await firebase.auth().currentUser.linkWithCredential(credential)
  //    await res.user.updateProfile({displayName: vals.name})
  //    await updateStateToAuth(res.user, commit)
  //    await res.user.sendEmailVerification()
  //    //await res.user.sendEmailVerification({
  //    //  url: siteUtil.absUri('user/verify-email'),
  //    //  handleCodeInApp: true,
  //    //})
  //    commit(types.SET_COMMON_LOADING, false)
  //  } catch (err) {
  //    commit(types.SET_COMMON_LOADING, false)
  //    throw err
  //  }
  //},

  //linkUserWithCredentialOnOAuth: async ({ commit }, providerName) => {
  //  commit(types.SET_COMMON_LOADING, true)
  //  try {
  //    let provider
  //    switch (providerName) {
  //      case 'google.com':
  //        provider = new firebase.auth.GoogleAuthProvider()
  //        break
  //      //case 'twitter.com':
  //      //  provider = new firebase.auth.TwitterAuthProvider()
  //      //  break
  //      //case 'facebook.com':
  //      //  provider = new firebase.auth.FacebookAuthProvider()
  //      //  break
  //    }
  //    const res = await firebase.auth().currentUser.linkWithPopup(provider)
  //    await updateStateToAuth(res.user, commit)
  //    commit(types.SET_COMMON_LOADING, false)
  //  } catch (err) {
  //    commit(types.SET_COMMON_LOADING, false)
  //    throw err
  //  }
  //},

  //changeEmail: async ({ commit }, payload) => {
  //  commit(types.SET_COMMON_LOADING, true)
  //  try {
  //    const credential = firebase.auth.EmailAuthProvider.credential(payload.emailOld, payload.password)
  //    const { user } = await firebase.auth().currentUser.reauthenticateAndRetrieveDataWithCredential(credential)
  //    if (!user) throw new Error('require to auth')

  //    await firebase.auth().currentUser.updateEmail(payload.email)
  //    await firebase.auth().currentUser.getIdToken(true)
  //    await firebase.auth().currentUser.sendEmailVerification()
  //    await updateStateToAuth(firebase.auth().currentUser, commit)
  //    commit(types.SET_COMMON_LOADING, false)
  //  } catch (error) {
  //    commit(types.SET_COMMON_LOADING, false)
  //    throw error
  //  }
  //},

  //resendEmailVerification: async ({ commit }) => {
  //  commit(types.SET_COMMON_LOADING, true)
  //  try {
  //    const user = firebase.auth().currentUser
  //    if (!user) throw new Error('require to auth')

  //    await user.sendEmailVerification()
  //    commit(types.SET_COMMON_LOADING, false)
  //  } catch (error) {
  //    commit(types.SET_COMMON_LOADING, false)
  //    throw error
  //  }
  //},

  //authApplyActionCode: async ({ commit }, payload) => {
  //  commit(types.SET_COMMON_LOADING, true)
  //  try {
  //    await firebase.auth().applyActionCode(payload.actionCode)
  //    await firebase.auth().currentUser.getIdToken(true)
  //    await firebase.auth().currentUser.reload()
  //    const user = firebase.auth().currentUser
  //    await updateStateToAuth(user, commit)
  //    commit(types.SET_COMMON_LOADING, false)
  //  } catch (error) {
  //    commit(types.SET_COMMON_LOADING, false)
  //    throw error
  //  }
  //},

  //changePassword: async ({ commit, state }, vals) => {
  //  commit(types.SET_COMMON_LOADING, true)
  //  try {
  //    const user = await firebase.auth().currentUser
  //    if (!user) throw new Error('require to auth')

  //    if (!state.auth.user.isAnonymous) {
  //      const cred = await firebase.auth.EmailAuthProvider.credential(user.email, vals.passwordOld)
  //      await user.reauthenticateAndRetrieveDataWithCredential(cred);
  //    }
  //    await user.updatePassword(vals.passwordNew)
  //    await updateStateToAuth(user, commit)
  //    commit(types.SET_COMMON_LOADING, false)
  //  } catch (error) {
  //    commit(types.SET_COMMON_LOADING, false)
  //    throw error
  //  }
  //},

  //signInWithEmailLink: async ({ commit }, payload) => {
  //  commit(types.SET_COMMON_LOADING, true)
  //  try {
  //    const url = siteUtil.absUri(payload.path)
  //    const res = await firebase.auth().signInWithEmailLink(payload.email, url)
  //    await updateStateToAuth(res.user, commit)
  //    commit(types.SET_COMMON_LOADING, false)
  //  } catch (error) {
  //    updateStateToUnauth(commit)
  //    commit(types.SET_COMMON_LOADING, false)
  //    throw error
  //  }
  //},

  //signOut: async ({ commit }) => {
  //  commit(types.SET_COMMON_LOADING, true)
  //  try {
  //    await firebase.auth().signOut()
  //    updateStateToUnauth(commit)
  //    commit(types.SET_COMMON_LOADING, false)
  //  } catch (error) {
  //    commit(types.SET_COMMON_LOADING, false)
  //    throw error
  //  }
  //},

  //resetAuth: ({ commit }) => {
  //  updateStateToUnauth(commit)
  //},
}

