<template>
<div>
  <eb-edit-user-email></eb-edit-user-email>
  <eb-edit-user-password class="u-mt2r"></eb-edit-user-password>
  <eb-edit-user-name class="u-mt2r"></eb-edit-user-name>
  <eb-edit-user-profile-photo-url class="u-mt2r"></eb-edit-user-profile-photo-url>
</div>
</template>

<script>
import EbEditUserEmail from '@/components/organisms/EbEditUserEmail'
import EbEditUserPassword from '@/components/organisms/EbEditUserPassword'
import EbEditUserName from '@/components/molecules/EbEditUserName'
import EbEditUserProfilePhotoUrl from '@/components/molecules/EbEditUserProfilePhotoUrl'

export default{
  name: 'EbSettingsContainer',

  components: {
    EbEditUserEmail,
    EbEditUserPassword,
    EbEditUserName,
    EbEditUserProfilePhotoUrl,
  },

  data(){
    return {
    }
  },

  computed: {
  },

  created() {
  },

  methods: {
  },
}
</script>
