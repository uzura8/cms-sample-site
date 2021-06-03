<template>
<div>
  <h1 class="title">{{ $t('page.EmailVerification') }}</h1>
  <p
    v-if="resTitle"
    class="is-size-5"
  >{{ resTitle }}</h3>
  <p
    v-if="resBody"
  >{{ resBody }}</p>
</div>
</template>

<script>
import utilUri from '@/util/uri'

export default {
  name: 'UserVerifyEmail',

  data () {
    return {
      resType: '',
      resTitle: '',
      resBody: '',
    }
  },

  computed: {
  },

  created: async function() {
    const mode = utilUri.getParameterByName('mode')
    const actionCode = utilUri.getParameterByName('oobCode')
    const continueUrl = utilUri.getParameterByName('continueUrl')
    const lang = utilUri.getParameterByName('lang') || 'en'
    switch (mode) {
      //case 'resetPassword':
      //  // Display reset password handler and UI.
      //  handleResetPassword(auth, actionCode, continueUrl, lang)
      //  break;
      //case 'recoverEmail':
      //  // Display email recovery handler and UI.
      //  handleRecoverEmail(auth, actionCode, lang)
      //  break;
     case 'verifyEmail':
        const res = await this.handleVerifyEmail(actionCode)
        this.resType = res.type
        this.resTitle = res.title
        this.resBody = res.body
        break;
      default:
        // Error: invalid mode.
        this.showGlobalMessage(this.$t('error.400'))
    }
  },

  methods: {
    async handleVerifyEmail(actionCode) {
      try {
        const payload = { mode: 'verifyEmail', actionCode: actionCode }
        await this.$store.dispatch('authApplyActionCode', payload)
        return {
          'title': this.$t('msg["Verify Email Completed"]'),
          'body': '',
          'type': 'success',
        }
      } catch (err) {
        console.log(err)
        return {
          'title': this.$t('msg["Verify Email Failed"]'),
          'body': this.$t('msg["Check verification email"]'),
          'type': 'error',
        }
      }
    },
  }
}
</script>

