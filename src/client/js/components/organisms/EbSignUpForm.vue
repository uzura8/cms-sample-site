<template>
<div class="ebSignUpForm">
  <b-field :label="$t('common.email')"
    :type="checkEmpty(errors.email) ? '' : 'is-danger'"
    :message="checkEmpty(errors.email) ? $t(`form['Used for Sign In']`) : errors.email[0]">
    <b-input type="email"
      v-model="email"
      icon="envelope"
      icon-pack="fas"
      @blur="validate('email')"
      :placeholder="$t('common.email')">
    </b-input>
  </b-field>

  <b-field :label="$t('common.password')"
    :type="checkEmpty(errors.password) ? '' : 'is-danger'"
    :message="checkEmpty(errors.password) ? $t(`form['Used for Sign In']`) : errors.password[0]">
    <b-input type="password"
      v-model="password"
      :password-reveal="true"
      icon="lock"
      icon-pack="fas"
      @blur="validate('password')"
      :placeholder="$t('common.password')">
    </b-input>
  </b-field>

  <b-field :label="$t('common.userName')"
    :type="checkEmpty(errors.name) ? '' : 'is-danger'"
    :message="checkEmpty(errors.name) ? $t(`form['Used for display user name']`) : errors.name[0]">
    <b-input v-model="name"
      @blur="validate('name')"
      :placeholder="$t('common.userName')">
    </b-input>
  </b-field>

  <div class="field is-grouped">
    <div class="control">
      <button
        class="button is-link"
        :disabled="hasErrors"
        @click="signUp">{{ $t('common.register') }}</button>
    </div>
  </div>

  <div class="field is-grouped">
    <div class="control">
      <button
        class="button"
        @click="signInWithOAuth('google.com')"
      >
        <span class="icon">
          <i class="fab fa-google"></i>
        </span>
        <span>{{ $t('form["Sign In with Google"]') }}</span>
      </button>
    </div>
  </div>

</div>
</template>

<script>
import { User, Firebase } from '@/api'
import config from '@/config/config'
import str from '@/util/str'
import site from '@/util/site'

export default {
  name: 'EbSignUpForm',

  props: {
    isInclude: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      errors: {},
      name: '',
      email: '',
      password: '',
    }
  },

  computed: {
    hasErrors: function() {
      let hasError = false
      Object.keys(this.errors).map(field => {
        if (this.errors[field].length > 0) hasError = true
      })
      return hasError
    },
  },

  created: function() {
  },

  methods: {
    signUp: function() {
      this.validateAll()
      if (this.hasErrors) {
        this.showGlobalMessage(this.$t('msg["Correct inputs"]'))
      } else {
        const vals = {
          name: this.name,
          email: this.email,
          password: this.password,
        }
        const action = this.isInclude ? 'linkUserWithCredentialOnEmailAuth' : 'createUserWithEmailSend'
        this.$store.dispatch(action, vals)
          .then(() => {
            this.$emit('email-signup-complete')
            if (!this.isInclude) this.$router.push({ name: 'SentVerificationMail' })
          })
        .catch((err) => {
          console.log(err)// FOR DEBUG
          const i18nKey = site.convFirebaseErrorCodeToI18n(err.code)
          this.showGlobalMessage(this.$t(i18nKey))
        })
      }
    },

    signInWithOAuth: function(providerName) {
      this.$store.dispatch('linkUserWithCredentialOnOAuth', providerName)
        .then((res) => {
          if (this.isInclude) {
            this.$emit('oauth-signup-complete')
            return
          }

          if (!this.checkEmpty(this.$route.query.redirect)) {
            this.$router.push({ path:this.$route.query.redirect })
          } else {
            if (this.isUseAdmin && this.isAdmin) {
              this.$router.push({ name:'AdminTop' })
            } else {
              this.$router.push({ name:'UserTop' })
            }
          }
        })
        .catch(err => {
          console.log(err)// FOR DEBUG
          const i18nKey = site.convFirebaseErrorCodeToI18n(err.code)
          this.showGlobalMessage(this.$t(i18nKey))
        })
    },

    setErrors: function(errors) {
      const keys = Object.keys(this.errors)
      errors.map(err => {
        const field = err.param
        this.initErrors(field)
        this.errors[field].push(err.msg)
      })
    },

    validateAll: function() {
      ['email', 'password', 'name'].map(field => {
        this.validate(field)
      })
    },

    validate: function(field) {
      const key = 'validate' + str.capitalize(field)
      this[key]()
    },

    validateEmail: function() {
      this.initError('email')
      if (this.checkEmpty(this.email)) this.errors.email.push(this.$t('msg["Email is required"]'))
      if (!str.checkEmail(this.email)) this.errors.email.push(this.$t('msg["Email is not valid"]'))
    },

    validatePassword: function() {
      this.initError('password')
      if (this.checkEmpty(this.password)) {
        this.errors.password.push(this.$t('msg["Password is required"]'))
      }
      if (this.password.length < 6) {
        this.errors.password.push(this.$t('msg["Password must be at least 6 characters"]'))
      }
    },

    validateName: function() {
      this.initError('name')
      if (this.checkEmpty(this.name)) {
        this.errors.name.push(this.$t('msg["UserName is required"]'))
      }
    },

    initError: function(field) {
      this.$set(this.errors, field, [])
    },

    initErrors: function(field) {
      const keys = Object.keys(this.errors)
      if (!this.inArray(field, keys)) {
        this.initError(field)
      }
    },
  }
}
</script>

