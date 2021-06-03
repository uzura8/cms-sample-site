<template>
  <b-field class="file" :class="fieldClass">
    <b-upload
      v-model="file"
      class="file-label"
      :accept="accept"
      :disabled="isDisabled"
    >
      <slot></slot>
    </b-upload>
  </b-field>
</template>
<script>
import config from '@/config/config'
import { Media } from '@/api/'
import utilForm from '@/util/form'
import utilCommon from '@/util/common'

export default {
  name: 'EbUploadBtn',

  props: {
    btnClass: {
      type: String,
      default: '',
    },
    accept: {
      type: String,
      default: 'image/*',
    },
    relName: {
      type: String,
      default: '',
    },
    relUid: {
      type: String,
      default: '',
    },
    dsplayStyle: {
      type: String,
      default: 'inline',
    }
  },

  data() {
    return {
      file: null,
    }
  },

  computed: {
    isDisabled: function() {
      return this.$store.state.common.isLoading
    },

    fieldClass: function() {
      let items = ['is-inline']
      if (this.btnClass) items.push(this.btnClass)

      return items.join(' ')
    },
  },

  watch: {
    file: function(val) {
      this.upload()
    },
  },

  methods: {
    upload: async function() {
      if (this.validateFileObj() === false) return
      const upConf = config.media.upload.image
      const errorMsgKey = utilForm.validateFileObj(
        this.file,
        upConf.acceptTypes,
        upConf.sizeMax
      )
      this.$store.dispatch('setLoading', true)
      try {
        let params = { active: 1 }
        if (this.relName) params.rel_name = this.relName
        if (this.relUid) params.rel_uid = this.relUid
        const res = await Media.upload(this.file, this.authUserToken, params)
        this.$emit('uploaded', res)
        this.$store.dispatch('setLoading', false)
      } catch (err) {
        console.log(err); //!!!!!!
        this.$store.dispatch('setLoading', false)
        this.handleApiError(err, this.$t('msg["Upload failed"]'))
      }
    },

    validateFileObj: function() {
      const uploadConfig = config.media.upload.image
      const errorMsgKey = utilForm.validateFileObj(
        this.file,
        uploadConfig.acceptTypes,
        uploadConfig.sizeMax
      )
      if (!errorMsgKey) return true

      let vals = {}
      switch (errorMsgKey) {
        case 'notAcceptedTypeOnUpload':
          vals.types = config.media.upload.image.acceptTypes.join(', ')
          break
        case 'overMaxSizeOnUpload':
          vals.max = utilCommon.byteToUnit(config.media.upload.image.sizeMax)
          break
        case 'Input required':
        default:
          break
      }
      this.showGlobalMessage(this.$t(`msg["${errorMsgKey}"]`, vals))
      return false
    },
  }
}
</script>
<style scoped>
.field {
  margin-right: 0 !important;
}
</style>
