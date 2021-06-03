<template>
<span>
  <!--
  <a v-if="isLink" class="image is-48x48">
    <eb-img :src="user.photoURL"></eb-img>
  </a>
  -->
  <eb-img :src="user.photoURL" size-class="is-48x48"></eb-img>
</span>
</template>

<script>
import EbImg from '@/components/molecules/EbImg.vue'

export default {
  name: 'EbUserProfImage',
   components: {
     EbImg,
   },

  props: {
    user: {
      type: Object,
      default: null,
    },

    isLink: {
      type: Boolean,
      default: true,
    },
  },

  data () {
    return {
    }
  },

  computed: {
  },

  watch: {
  },

  created: function() {
  },

  methods: {
  },
}
</script>

