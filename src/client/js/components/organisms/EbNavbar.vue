<template>
<nav class="navbar is-transparent">
  <div class="navbar-brand">
    <a class="navbar-item" href="">
    <router-link to="/" class="navbar-item">
      <img src="https://bulma.io/images/bulma-logo.png" alt="Sample Site" width="112" height="28">
    </router-link>
    </a>
    <div class="navbar-burger burger"
      v-bind:class="{'is-active': isHeaderMenuOpen}"
      @click="toggleHeaderMenuOpen()">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  <div  class="navbar-menu" v-bind:class="{'is-active': isHeaderMenuOpen}">
    <div class="navbar-start">
      <router-link to="/" class="navbar-item">{{ $t('common.top') }}</router-link>
      <router-link v-if="!isAuth" to="/signup" class="navbar-item">{{ $t('common.signUp') }}</router-link>
      <router-link v-if="!isAuth" to="/signin" class="navbar-item">{{ $t('common.signIn') }}</router-link>
      <router-link v-if="isAuth" to="/user" class="navbar-item">{{ $t('page.userTop') }}</router-link>
      <router-link v-if="isAuth" to="/settings" class="navbar-item">{{ $t('page.Settings') }}</router-link>
      <a v-if="isAuth" class="navbar-item u-clickable" @click="signOut">{{ $t('common.signOut') }}</a>
      <router-link to="/about" class="navbar-item">{{ $t('page.about') }}</router-link>
      <router-link v-if="isAdmin" to="/admin" class="navbar-item">{{ $t('page.adminTop') }}</router-link>
      <router-link to="/" class="navbar-item"></router-link>
    </div>
  </div>
</nav>
</template>

<script>

export default {
  name: 'EbNavbar',
  data () {
    return {
    }
  },

  computed: {
    isHeaderMenuOpen: function () {
      return this.$store.state.common.isHeaderMenuOpen
    },
  },

  created: function() {
    this.listenComponent(window, 'click', function(e){
      if (!this.$el.contains(e.target)) {
        this.$store.dispatch('setHeaderMenuOpen', false)
      }
    }.bind(this));
  },

  destroyed: function() {
    this.destroyedComponent()
  },

  methods: {
    toggleHeaderMenuOpen: function () {
      this.$store.dispatch('setHeaderMenuOpen', !this.isHeaderMenuOpen)
    },
  }
}
</script>

