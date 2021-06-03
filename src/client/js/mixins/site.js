import store from '@/store'
import router from '@/router'
import listener from '@/listener'
import util from '@/util'
import config from '@/config/config'

export default {
  data(){
    return {
      globalError: '',
      errors: {},
    }
  },

  computed: {
    isFirebaseEnabled: function () {
      return config.firebase.isEnabled
    },

    isLoading: function () {
      return this.$store.state.common.isLoading
    },

    isAuth: function () {
      if (!this.$store.state.auth.state) return false
      if (!this.$store.state.auth.user) return false
      return true
    },

    isAnonymous: function () {
      return this.$store.state.auth.user.isAnonymous
    },

    isAdmin: function () {
      return this.$store.getters.isAdmin()
    },

    userType: function () {
      return this.$store.state.auth.user.type
    },

    joinedGroupUid: function () {
      if (!this.$store.state.auth.state) return false
      return this.$store.state.auth.user.joinedGroupUid
    },

    isAdminPath: function () {
      return this.$route.path.startsWith('/admin')
    },

    authUid: function () {
      return this.$store.state.auth.state ? this.$store.state.auth.user.uid : null
    },

    authUser: function () {
      return this.$store.state.auth.state ? this.$store.state.auth.user : null
    },

    authUserToken: function () {
      return config.firebase.isEnabled ? this.$store.state.auth.token : null
    },
  },

  methods: {
    siteUri: util.site.uri,
    checkEmpty: util.common.isEmpty,
    inArray: util.arr.inArray,
    listenComponent: listener.listen,
    destroyedComponent: listener.destroyed,
    imageUri: util.site.imageUri,
    checkResponseHasErrorMessage: util.site.checkResponseHasErrorMessage,

    showGlobalMessage: function(msg, type='is-danger', pos='is-bottom', duration=5000) {
      this.$buefy.toast.open({
        message: msg,
        type: type,
        duration: duration,
        position: pos,
      })
    },

    handleApiError: function(err, defaultMsg='', isRedirect = false) {
      if (isRedirect && err != null && err.response != null) {
        if (err.response.status == 401) {
          store.dispatch('resetAuth')
          this.$router.push({
            path: '/signin',
            query: { redirect: this.$route.fullPath }
          })
          return
        } else if (err.response.status == 403) {
          this.$router.push('/error/forbidden')
          return
        } else if (err.response.status == 404) {
          this.$router.push('/error/notfound')
          return
        }
      }
      if (typeof this.setErrors == 'function'
        && util.site.checkResponseHasErrorMessage(err, true)) {
        this.setErrors(err.response.data.errors)
      }
      if (util.site.checkResponseHasErrorMessage(err)) {
        const msg = err.response.data.message in this.$t('msg')
          ? this.$t(`msg["${err.response.data.message}"]`)
          : err.response.data.message
        this.showGlobalMessage(msg)
      } else if (defaultMsg) {
        this.showGlobalMessage(defaultMsg)
      } else {
        this.showGlobalMessage(this.$t('msg["Server error"]'))
      }
    },

    //signOut: function () {
    //  store.dispatch('signOut')
    //    .then(() => {
    //      router.push({ path: '/signin' })
    //    })
    //    .catch(err => {
    //      this.handleApiError(err, this.$t('msg["Sign Out failed"]'))
    //    })
    //},

    addUrisToMediaObj: function (mediaObj) {
      let copied = { ...mediaObj }
      copied.uris = {
        raw: util.site.mediaUri(mediaObj.type, mediaObj.name, 'raw')
      }
      return copied
    },

    usableTextSanitized: function (text) {
      let conved = util.str.nl2br(text)
      conved = util.str.url2link(conved)
      return this.$sanitize(conved)
    },

    usableTextEscaped: function (text) {
      let conved = util.str.escapeHtml(text)
      conved = util.str.nl2br(conved)
      return util.str.url2link(conved)
    },

    convUserTypeToi18n: function (user) {
      if (user.isAdmin) return this.$t('common.admin')
      if (user.isAnonymous) return this.$t('common.anonymous')

      return this.$t('common.normal')
    },

    setErrors: function(errors) {
      errors.map(err => {
        const field = util.str.convSnakeToCamel(err.field)
        this.initError(field)
        const msg = err.message in this.$t('msg')
          ? this.$t(`msg["${err.message}"]`)
          : err.message
        this.errors[field].push(msg)
      })
    },

    moveToErrorPage: function(code) {
      if (code == 404) {
        router.push({ path: '/notfound' })
      }
    },

    initError: function(field) {
      this.globalError = ''
      this.$set(this.errors, field, [])
    },

    initErrors: function() {
      this.globalError = ''
      Object.keys(this.errors).map(field => {
        this.initError(field)
      })
    },
  },
}
