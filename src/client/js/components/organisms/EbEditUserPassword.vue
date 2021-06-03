<template>
<div>
  <div v-if="!isEdit">
    <div class="field is-horizontal">
      <div class="field-label is-normal" v-if="dispLabel">
        <label class="label">{{ $t('common.password') }}</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="field-val">
            <span class="is-italic is-size-6">{{ $t('form["Masked for security"]') }}</span>
            <a class="is-pulled-right u-clickable" @click="isEdit = true">{{ $t('common.edit') }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <field-input-password
      :label="$t('form.CurrentPassword')"
      :value.sync="passwordOld"
      :errorMsg="errors.passwordOld"
      @blur="validate('passwordOld')"
    ></field-input-password>

    <field-input-password
      :label="$t('form.NewPassword')"
      :value.sync="password"
      :errorMsg="errors.password"
      @blur="validate('password')"
    ></field-input-password>

    <field-input-password
      :label="$t('form.RetypeNewPassword')"
      :value.sync="passwordRetype"
      :errorMsg="errors.passwordRetype"
      @blur="validate('passwordRetype')"
    ></field-input-password>

    <p class="has-text-danger" v-if="errorGlobal">{{ errorGlobal }}</p>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <a
          class="button is-info"
          @click="edit"
          :disabled="hasErrors"
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
  nane: 'EbEditUserPassword',

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
      passwordOld: '',
      password: '',
      passwordRetype: '',
      fields: ['password', 'passwordRetype'],
      errors: {},
      errorGlobal: '',
    }
  },

  computed: {
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
    if (!this.isAnonymous) this.fields.push('passwordOld')
  },

  methods: {
    edit: async function() {
      this.validateAll()
      if (this.hasErrors) return

      try {
        const vals = { passwordNew:this.password }
        if (!this.isAnonymous) vals.passwordOld = this.passwordOld
        await this.$store.dispatch('changePassword', vals)
        this.showGlobalMessage(this.$t('msg["Password updated"]'), 'is-success')
        this.isEdit = false
      } catch (err) {
        console.log(err)// FOR DEBUG
        const i18nKey = site.convFirebaseErrorCodeToI18n(err.code)
        this.errorGlobal = this.$t(i18nKey)
      }
    },

    cancel: function() {
      this.passwordOld = ''
      this.password = ''
      this.passwordRetype = ''
      this.initErrors()
      this.isEdit = false
    },

    validate: function(field) {
      this.initError(field)
      const val = this[field] ? this[field].trim() : ''
      if (this.checkEmpty(val)) {
        this.errors[field] = this.$t('msg["Input required"]')
        return
      }
      if (val.length < 6) {
        this.errors[field] = this.$t('msg["Password must be at least 6 characters"]')
        return
      }

      if (field === 'passwordRetype') {
        if (this.password !== this.passwordRetype) {
          this.errors[field] = this.$t('msg["Passwords do not match"]')
          return
        }
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

