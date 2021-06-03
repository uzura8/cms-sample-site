<template>
<div class="field is-horizontal">
  <div class="field-label is-normal" v-if="dispLabel">
    <label class="label">{{ $t('common.userName') }}</label>
  </div>
  <div class="field-body">
    <div v-if="isEdit">
      <div class="field is-grouped">
        <div class="control is-expanded">
          <input
            class="input"
            :class="{'is-danger': errorMsg}"
            type="text"
            :placeholder="$t('common.userName')"
            v-model="name"
            @blur="validate"
          >
        </div>
        <div class="control">
          <a class="button is-info" @click="edit">{{ $t('common.edit') }}</a>
          <a class="button" @click="cancel">{{ $t('common.cancel') }}</a>
        </div>
      </div>
      <p class="help is-danger" v-if="errorMsg">{{ errorMsg }}</p>
    </div>

    <div class="field" v-else>
      <div class="field-val">
        <span>{{ $store.getters.userInfo('name') }}</span>
        <a class="is-pulled-right u-clickable" @click="isEdit = true">{{ $t('common.edit') }}</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import str from '@/util/str'
import site from '@/util/site'

export default {
  nane: 'EbEditUserName',

  props: {
    dispLabel: {
      type: Boolean,
      default: true,
    },
  },

  data(){
    return {
      isEdit: false,
      name: '',
      errorMsg: '',
    }
  },

  computed: {
  },

  created() {
    this.name = this.$store.getters.userInfo('name')
  },

  methods: {
    edit: async function() {
      if (this.name == this.$store.getters.userInfo('name')) {
        this.isEdit = false
        return
      }

      this.validate()
      if (this.errorMsg) return

      try {
        const payload = { id: this.authUid, vals: { name: this.name } }
        await this.$store.dispatch('editUserProfile', payload)
        this.showGlobalMessage(this.$t('msg.Updated'), 'is-success')
        this.isEdit = false
      } catch (err) {
        console.log(err)// FOR DEBUG
        this.errorMsg = this.$t('msg["Error occurred"]')
      }
    },

    cancel: async function() {
      this.name = this.$store.getters.userInfo('name')
      this.errorMsg = ''
      this.isEdit = false
    },

    validate: function() {
      this.errorMsg = ''
      if (this.checkEmpty(this.name)) {
        this.errorMsg = this.$t('msg["UserName is required"]')
      }
    },
  },
}
</script>

<style scoped>
.field-val {
  line-height: 2.2;
}
</style>

