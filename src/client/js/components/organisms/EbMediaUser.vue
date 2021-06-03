<template>
<div class="media">
  <div class="media-left">
    
    <eb-user-prof-image :user="user"></eb-user-prof-image>
  </div>
  <div class="media-content">
    <p class="is-size-5 has-text-weight-semibold">{{ user.displayName }}</p>
  </div>
</div>
</template>

<script>
import EbUserProfImage from '@/components/organisms/EbUserProfImage'

export default {
  name: 'EbMediaUser',

  components: {
    EbUserProfImage,
  },

  props: {
    user: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped>
.media {
  align-items: center;
}
</style>

