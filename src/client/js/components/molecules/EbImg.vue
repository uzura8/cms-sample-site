<template>
  <figure class="image" :class="sizeClass">
    <img
      :src="imageUrl"
      :class="{ 'u-clickable': isClickable }"
      @error="noImage"
      @click="activate"
    >
  </figure>
</template>

<script>
import utilSite from '@/util/site'

export default {
  name: 'EbImg',
   components: {
   },

  props: {
    name: {
      type: String,
      default: '',
    },

    size: {
      type: String,
      default: 'raw',
    },

    src: {
      type: String,
      default: '',
    },

    sizeClass: {
      type: String,
      default: '',
    },

    isClickable: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    imageUrl: function() {
      if (this.src) return this.src
      if (this.name) return utilSite.imageUri(this.name, this.size)
      return utilSite.strageUri('assets/img/noimage.jpg')
    },
  },

  methods: {
    activate(){
      if (this.isClickable === false) return
      this.$emit('activate', this.name)
    },

    noImage(element){
      element.target.src = utilSite.strageUri('assets/img/noimage.jpg')
    }
  }
}
</script>

