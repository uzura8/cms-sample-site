<template>
<aside class="menu">
  <p class="menu-label">
    General
  </p>
  <ul v-if="pages" class="menu-list">
    <li
      v-for="page in pages"
      v-if="page.slug != 'top'"
    ><router-link
      :to="`/${page.slug}`"
    >{{ page.title }}</router-link></li>
    <li><router-link
      to="/informations"
    >お知らせ</router-link></li>
    <li><router-link
      to="/"
    >トップ</router-link></li>
  </ul>
</aside>
</template>
<script>
import { Post, Category } from '@/api'
export default{
  name: 'EbSideNavMenu',

  data(){
    return {
      serviceIdForPage: 'sample-site-pages',
      serviceIdForInfo: 'sample-site-info',
      pages: [],
    }
  },

  computed: {
  },

  watch: {
  },

  created() {
    this.setPages()
  },

  methods: {
    async setPages() {
      this.$store.dispatch('setLoading', true)
      try {
        this.pages = await Post.get(this.serviceIdForPage)
        this.$store.dispatch('setLoading', false)
      } catch (err) {
        console.log(err)//!!!!!!
        this.$store.dispatch('setLoading', false)
        this.handleApiError(err, this.$t('msg["Failed to get data from server"]'))
      }
    },
  },
}
</script>
