<template>
<div>
  <h1 class="title">{{ $t('page.userTop') }}</h1>
  <p v-if="isAuth">{{ $t('msg.signInGreeting', { name: userName }) }}</p>
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
      const defName = this.$t('term.guestUser')
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
