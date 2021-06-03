<template>
<div class="signIn">
  <h1 class="title">{{ $t('common.signIn') }}</h1>

  <eb-sign-in-form></eb-sign-in-form>

  <p class="u-mt5">
    {{ $t(`msg["You don't have an account?"]`) }} 
    <router-link to="/signup">{{ $t('msg["create account now!!"]') }}</router-link>
  </p>
</div>
</template>

<script>
import EbSignInForm from '@/components/organisms/EbSignInForm'

export default {
  name: 'SignIn',

  components: {
    EbSignInForm,
  },

  data () {
    return {
    }
  },

  computed: {
  },

  created: function() {
  },

  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signIn {
}
</style>
