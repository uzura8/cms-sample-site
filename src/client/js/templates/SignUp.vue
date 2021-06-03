<template>
<div class="signup">
  <h1 class="title">{{ $t('common.signUp') }}</h1>

  <eb-sign-up-form></eb-sign-up-form>

  <p class="u-mt5">
    {{ $t('msg["Do you have an account?"]') }} 
    <router-link to="/signin">{{ $t('msg["sign in now!!"]' )}}</router-link>
  </p>
</div>
</template>

<script>
import EbSignUpForm from '@/components/organisms/EbSignUpForm'

export default {
  name: 'SignUp',

  components: {
    EbSignUpForm,
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

