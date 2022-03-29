<template>
<div>
  <div>
    <h1 class="title">お知らせ</h1>
  </div>
  <post-list class="mt-6"></post-list>
</div>
</template>
<script>
import PostList from '@/components/organisms/PostList'

export default{
  name: 'Informations',

  components: {
    PostList,
  },

  data() {
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

