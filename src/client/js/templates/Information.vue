<template>
<div v-if="post">
  <div class="block">
    <router-link to="/informations">
      <i class="fas fa-chevron-left"></i>
      <span>{{ $t('common.posts') }}</span>
    </router-link>
  </div>

  <h1 class="title">{{ post.title }}</h1>
  <div v-html="post.body"></div>

  <div class="mt-5">
    <time
      itemprop="datepublished"
      :datetime="post.publishAt | dateFormat('')"
    >{{ post.publishAt | dateFormat }}</time>
  </div>

  <nav
    v-if="post.category"
    class="breadcrumb"
    aria-label="breadcrumbs"
  >
    <ul>
      <li>
        <router-link :to="`/posts/${serviceId}/`">{{ $t('common.posts') }}</router-link>
      </li>
      <li
        v-for="parent in post.category.parents"
      >
        <router-link :to="`/posts/${serviceId}/categories/${parent.slug}`">{{ parent.label }}</router-link>
      </li>
      <li>
        <router-link :to="`/posts/${serviceId}/categories/${post.category.slug}`">{{ post.category.label }}</router-link>
      </li>
    </ul>
  </nav>
</div>
</template>
<script>
import { Post } from '@/api'

export default{
  name: 'Post',

  data(){
    return {
      serviceId: 'sample-site-info',
      post: null,
    }
  },

  computed: {
    slug() {
      return this.$route.params.slug
    },
  },

  created() {
    this.getPost()
  },

  methods: {
    async getPost() {
      this.post = await Post.get(this.serviceId, this.slug)
    },
  },
}
</script>

