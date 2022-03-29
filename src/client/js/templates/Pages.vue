<template>
  <div v-if="post">
    <h1 class="title">{{ post.title }}</h1>
    <div v-html="post.body"></div>
  </div>
</template>
<script>
import { Post } from '@/api'
export default{
  name: 'Pages',

  data(){
    return {
      serviceIdForPage: 'sample-site-pages',
      post: null,
    }
  },

  computed: {
    slug() {
      return this.$route.params.slug ? this.$route.params.slug : 'top'
    },
  },

  watch: {
    async slug(val) {
      await this.setPost()
    },
  },

  async created() {
    await this.setPost()
  },

  methods: {
    async setPost() {
      if (! this.slug) {
        this.$router.push('/error/notfound')
        return
      }
      this.$store.dispatch('setLoading', true)
      try {
        this.post = await Post.get(this.serviceIdForPage, this.slug)
        this.$store.dispatch('setLoading', false)
      } catch (err) {
        console.log(err)//!!!!!!
        this.$store.dispatch('setLoading', false)
        if (err.response.status == 404) {
          this.$router.push('/error/notfound')
          return
        }
        this.handleApiError(err, this.$t('msg["Failed to get data from server"]'))
      }
    },
  },
}
</script>
