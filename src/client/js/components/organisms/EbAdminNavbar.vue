<template>
<nav class="navbar is-dark">
  <div class="navbar-brand">
    <a class="navbar-item" href="">
    <router-link to="/admin" class="navbar-item">
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
      <router-link to="/admin" class="navbar-item">{{ $t('page.adminTop') }}</router-link>
      <router-link to="/admin/users" class="navbar-item">{{ $t('page.UserManagement') }}</router-link>
      <a v-if="isAuth" class="navbar-item u-clickable" @click="signOut">{{ $t('common.signOut') }}</a>
      <router-link to="/" class="navbar-item">{{ $t('page.siteTop') }}</router-link>
    </div>
  </div>
</nav>
</template>

<script>

export default {
  name: 'EbAdminNavbar',
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

