<template>
  <b-notification
    type="is-warning is-light"
    v-if="isActive"
    aria-close-label="Close notification"
    :closable="false"
    role="alert">
    <p>{{ $t('msg["email is not verified"]') }}</p>
    <p><a click="u-clickable" @click="sendVerificationMail">{{ $t('msg["Resend verification email"]') }}</a></p>
  </b-notification>
</template>

<script>
import site from '@/util/site'

export default {
  nane: 'EbEmailVerifyNotification',

  props: {
  },

  data(){
    return {
    }
  },

  computed: {
    isActive() {
      if (this.$store.state.auth.state === false) return false
      if (this.checkEmpty(this.$store.state.auth.user)) return false
      if (this.isAnonymous) return false
      return this.$store.state.auth.user.emailVerified === false
    },
  },

  created() {
  },

  methods: {
    async sendVerificationMail() {
      try {
        await this.$store.dispatch('resendEmailVerification')
        this.showGlobalMessage(this.$t('msg["Sent verification email"]'), 'is-success')
      } catch (err) {
        console.log(err)// FOR DEBUG
        const i18nKey = site.convFirebaseErrorCodeToI18n(err.code)
        this.showGlobalMessage(this.$t(i18nKey, 'is-success'))
      }
    }
  },
}
</script>

