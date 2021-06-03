<template>
<div>
  <h1 class="title">{{ $t('page.adminTop') }}</h1>
  <p>{{ $t('msg.signInGreeting', { name: userName }) }}</p>
</div>
</template>

<script>

export default{
  data(){
    return {
    }
  },

  computed: {
    userName () {
      const defName = ''
      if (this.checkEmpty(this.$store.state.auth.user)) return defName
      if (this.checkEmpty(this.$store.state.auth.user.name)) return defName
      return this.$store.state.auth.user.name
    },
  },

  created() {
  },

  methods: {
  },
}
</script>
