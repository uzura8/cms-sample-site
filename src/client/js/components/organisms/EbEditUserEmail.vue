<template>
<div>
  <div v-if="!isEdit">
    <div class="field is-horizontal">
      <div class="field-label is-normal" v-if="dispLabel">
        <label class="label">{{ $t('common.email') }}</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="field-val">
            <span>{{ $store.getters.userInfo('email') }}</span>
            <a class="is-pulled-right u-clickable" @click="isEdit = true">{{ $t('common.edit') }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">{{ $t('common.email') }}</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <input
              class="input"
              :class="{'is-danger': errors.email}"
              type="email"
              :placeholder="$t('common.email')"
              v-model="email"
              @blur="validate('email')"
            >
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span
              v-if="errors.email"
              class="icon is-small is-right"
            >
              <i
                class="fas fa-exclamation-triangle"
                :class="{'has-text-danger': errors.email}"
              ></i>
            </span>
          </div>
          <p class="help is-danger" v-if="errors.email">{{ errors.email }}</p>
        </div>
      </div>
    </div>

    <field-input-password
      :label="$t('common.password')"
      :value.sync="password"
      :errorMsg="errors.password"
      @blur="validate('password')"
    ></field-input-password>

    <p class="has-text-danger" v-if="errorGlobal">{{ errorGlobal }}</p>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <a
          class="button is-info"
          @click="edit"
          :disabled="!isChanged || hasErrors"
        >{{ $t('common.edit') }}</a>
        <a class="button" @click="cancel">{{ $t('common.cancel') }}</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import FieldInputPassword from '@/components/molecules/FieldInputPassword'
import str from '@/util/str'
import site from '@/util/site'

export default {
  nane: 'EbEditUserEmail',

  components: {
    FieldInputPassword,
  },

  props: {
    dispLabel: {
      type: Boolean,
      default: true,
    },
  },

  data(){
    return {
      isEdit: false,
      email: '',
      password: '',
      fields: ['email', 'password'],
      errors: {},
      errorGlobal: '',
    }
  },

  computed: {
    isChanged: function() {
      return this.email !== this.$store.getters.userInfo('email')
    },

    hasErrors: function() {
      if (this.errorGlobal) return true

      let hasError = false
      this.fields.map(field => {
        if (this.checkHasError(field)) hasError = true
      })
      return hasError
    },
  },

  created() {
    this.email = this.$store.getters.userInfo('email')
  },

  methods: {
    edit: async function() {
      if (!this.isChanged) {
        this.isEdit = false
        return
      }
      this.validateAll()
      if (this.hasErrors) return

      try {
        const vals = {
          emailOld: this.$store.getters.userInfo('email'),
          email: this.email,
          password: this.password
        }
        await this.$store.dispatch('changeEmail', vals)
        this.showGlobalMessage(this.$t('msg["Sent verification email"]'), 'is-success')
        this.isEdit = false
      } catch (err) {
        console.log(err)// FOR DEBUG
        const i18nKey = site.convFirebaseErrorCodeToI18n(err.code)
        this.errorGlobal = this.$t(i18nKey)
      }
    },

    cancel: async function() {
      this.email = this.$store.getters.userInfo('email')
      this.password = ''
      this.initErrors()
      this.isEdit = false
    },

    validate: function(field) {
      this.initError(field)
      const val = this[field] ? this[field].trim() : ''
      if (this.checkEmpty(val)) {
        this.$set(this.errors, field, this.$t('msg["Input required"]'))
        return
      }

      switch (field) {
        case 'email':
          if (!str.checkEmail(val)) {
            this.$set(this.errors, field, this.$t('msg["Email is not valid"]'))
            return
          }
          break
        case 'password':
          if (val.length < 6) {
            this.$set(this.errors, field, this.$t('msg["Password must be at least 6 characters"]'))
            return
          }
          break
      }
    },

    validateAll: function() {
      this.initErrors()
      this.fields.map(field => {
        this.validate(field)
      })
    },

    checkHasError: function(field) {
      if (field in this.errors === false) return false
      return this.errors[field].length > 0
    },

    initErrors: function(field) {
      this.errorGlobal = ''
      this.fields.map(field => {
        this.initError(field)
      })
    },

    initError: function(field) {
      this.errorGlobal = ''
      this.$set(this.errors, field, '')
    },
  },
}
</script>

<style scoped>
.field-val {
  line-height: 2.2;
}
</style>

