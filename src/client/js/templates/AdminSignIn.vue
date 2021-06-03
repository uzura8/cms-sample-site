<template>
<div class="signIn">
  <h1 class="title">{{ $t('page.adminSignIn') }}</h1>

  <eb-sign-in-form :is-use-admin="true"></eb-sign-in-form>

</div>
</template>

<script>
import EbSignInForm from '@/components/organisms/EbSignInForm'

export default {
  name: 'AdminSignIn',

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
