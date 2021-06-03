<template>
<div class="field is-horizontal">
  <div class="field-label is-normal" v-if="dispLabel">
    <label class="label">{{ $t('common.profilePhoto') }}</label>
  </div>
  <div class="field-body">

    <div class="field is-grouped">
      <div class="control is-expanded">
        <span v-if="profilePhotoUrl">
          <eb-img
            :src="profilePhotoUrl"
            size="400x400xs"
            size-class="is-128x128"
          ></eb-img>
        </span>
        <span v-else>
          {{ $t('msg.Unregistered') }}
        </span>
      </div>

      <div class="control">
        <div v-if="isEdit">
          <eb-upload-btn
            btn-class="is-info"
            rel-name="user_prof"
            @uploaded="editComplete"
          >
            <span class="file-cta">
              <b-icon pack="fas" size="is-small" icon="camera"></b-icon>
              <span class="has-text-weight-medium">+</span>
            </span>
          </eb-upload-btn>
          <a class="button" @click="cancel">{{ $t('common.cancel') }}</a>
          <p class="help is-danger" v-if="errorMsg">{{ errorMsg }}</p>
        </div>

        <a v-else
          class="is-pulled-right u-clickable"
          @click="isEdit = true"
        >{{ $t('common.edit') }}</a>

      </div>
    </div>

  </div>
</div>
</template>

<script>
import EbUploadBtn from '@/components/molecules/EbUploadBtn'
import EbImg from '@/components/molecules/EbImg'
import str from '@/util/str'
import site from '@/util/site'

export default {
  nane: 'EbEditUserProfilePhotoUrl',

   components: {
     EbUploadBtn,
     EbImg,
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
      uploadedImageName: '',
      name: '',
      errorMsg: '',
    }
  },

  computed: {
    profilePhotoUrl() {
      if (this.uploadedImageName) {
        return site.mediaUri('image', this.uploadedImageName, '400x400xs')
      }
      return this.$store.getters.userInfo('photoURL')
    }
  },

  created() {
    this.name = this.$store.getters.userInfo('name')
  },

  methods: {
    editComplete: async function(media) {
      try {
        this.showGlobalMessage(this.$t('msg.Updated'), 'is-success')
        this.uploadedImageName = media[0].name
        this.isEdit = false
      } catch (err) {
        console.log(err)// FOR DEBUG
        this.errorMsg = this.$t('msg["Error occurred"]')
      }
    },

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

